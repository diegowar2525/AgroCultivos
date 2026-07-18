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

        const estaEditando = Boolean(formData.id);
        const payload = new FormData();

        config.fields?.forEach(field => {
            const valor = formData[field.name];

            if (field.type === 'file') {
                // Solo enviar el campo si el usuario seleccionó un archivo nuevo.
                // La URL de una imagen existente no se vuelve a enviar.
                if (valor instanceof File) {
                    payload.append(field.name, valor);
                }

                return;
            }

            if (field.type === 'checkbox') {
                payload.append(
                    field.name,
                    String(Boolean(valor))
                );

                return;
            }

            if (
                valor !== null &&
                valor !== undefined &&
                valor !== ''
            ) {
                payload.append(field.name, valor);
            }
        });

        try {
            if (estaEditando) {
                await api.patch(
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

            toast.success(
                estaEditando
                    ? 'Registro actualizado correctamente'
                    : 'Registro creado correctamente',
                {
                    autoClose: 3000,
                    theme: 'dark'
                }
            );
        } catch (error) {
            console.error(
                'Error al guardar:',
                error.response?.data || error
            );

            const erroresBackend = error.response?.data;

            let mensaje =
                estaEditando
                    ? 'No se pudo actualizar el registro.'
                    : 'No se pudo crear el registro.';

            if (
                erroresBackend &&
                typeof erroresBackend === 'object'
            ) {
                const primerError = Object.values(
                    erroresBackend
                )
                    .flat()
                    .find(Boolean);

                if (primerError) {
                    mensaje = String(primerError);
                }
            }

            toast.error(mensaje, {
                theme: 'dark'
            });
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
