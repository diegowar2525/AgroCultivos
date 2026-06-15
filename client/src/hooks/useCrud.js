import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const useCrud = (modelName, config) => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectOptions, setSelectOptions] = useState({});

    const cargarSelects = async () => {
        try {
            const camposSelect =
                config.fields?.filter(
                    field => field.type === 'select'
                ) || [];

            const opciones = {};

            for (const campo of camposSelect) {
                const response = await api.get(campo.endpoint);
                opciones[campo.name] = response.data;
            }

            setSelectOptions(opciones);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarDatos = async () => {
        try {
            const response = await api.get(config.endpoint);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarDatos();
        cargarSelects();

        setFormData({});
        setIsEditing(false);

    }, [modelName]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (formData.id) {

                await api.put(
                    `${config.endpoint}${formData.id}/`,
                    formData
                );

            } else {

                await api.post(
                    config.endpoint,
                    formData
                );
            }

            await cargarDatos();

            setFormData({});
            setIsEditing(false);

        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
    };

    const executeDelete = async (id) => {
        try {

            await api.delete(
                `${config.endpoint}${id}/`
            );

            toast.success(
                'Registro eliminado correctamente',
                {
                    autoClose: 3000,
                    theme: 'dark'
                }
            );

            await cargarDatos();

        } catch (error) {
            console.error(error);

            toast.error(
                'Hubo un error al eliminar el registro.',
                {
                    theme: 'dark'
                }
            );
        }
    };

    return {
        data,
        isEditing,
        formData,
        selectOptions,
        setFormData,
        setIsEditing,
        handleInputChange,
        handleSubmit,
        handleEdit,
        executeDelete
    };
};