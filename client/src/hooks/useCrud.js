import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const useCrud = (modelName, config) => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectOptions, setSelectOptions] = useState({});

    // Nombres de los campos configurados como 'file' (ej. imagen del cultivo).
    const camposArchivo = config.fields
        ?.filter(field => field.type === 'file')
        .map(field => field.name) || [];

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

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Si se eligió un archivo nuevo (un objeto File real, no la URL
            // de texto de una imagen ya existente), hay que mandar el
            // formulario como multipart/form-data en vez de JSON.
            const hayArchivoNuevo = camposArchivo.some(
                nombre => formData[nombre] instanceof File
            );

            let payload = formData;

            if (hayArchivoNuevo) {
                const datosFormulario = new FormData();

                Object.entries(formData).forEach(([campo, valor]) => {
                    if (camposArchivo.includes(campo)) {
                        // Solo se reenvía si es un archivo NUEVO. Si sigue
                        // siendo la URL de la imagen existente (string), se
                        // omite para no romper el campo en el backend.
                        if (valor instanceof File) {
                            datosFormulario.append(campo, valor);
                        }
                    } else if (valor !== null && valor !== undefined) {
                        datosFormulario.append(campo, valor);
                    }
                });

                payload = datosFormulario;
            }

            if (formData.id) {

                await api.put(
                    `${config.endpoint}${formData.id}/`,
                    payload
                );

            } else {

                await api.post(
                    config.endpoint,
                    payload
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
        handleFileChange,
        handleSubmit,
        handleEdit,
        executeDelete
    };
};
