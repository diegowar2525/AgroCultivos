const modelsConfig = {
    Cultivo: {
        title: 'Cultivos',
        endpoint: '/api/cultivos/cultivos/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' },
            { key: 'tiempo_cosecha', label: 'Tiempo de cosecha' },
            { key: 'activo', label: 'Activo' }
        ],

        fields: [
            {
                name: 'categoria',
                label: 'Categoría',
                type: 'select',
                endpoint: '/api/cultivos/categorias/'
            },
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text'
            },
            {
                name: 'descripcion',
                label: 'Descripción',
                type: 'textarea'
            },
            {
                name: 'tiempo_cosecha',
                label: 'Tiempo de cosecha',
                type: 'number'
            },
            {
                name: 'activo',
                label: 'Activo',
                type: 'checkbox'
            },
            {
                name: 'imagen',
                label: 'Imagen del cultivo',
                type: 'file'
            }
        ]
    },

    Especificacion: {
        title: 'Especificaciones',
        endpoint: '/api/cultivos/especificaciones/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'cultivo', label: 'Cultivo' },
            { key: 'altitud_min', label: 'Altitud mínima (msnm)' },
            { key: 'altitud_max', label: 'Altitud máxima (msnm)' },
            { key: 'horas_sol', label: 'Horas de sol' }
        ],

        fields: [
            {
                name: 'cultivo',
                label: 'Cultivo',
                type: 'select',
                endpoint: '/api/cultivos/cultivos/'
            },

            {
                name: 'altitud_min',
                label: 'Altitud mínima (msnm)',
                type: 'number'
            },
            {
                name: 'altitud_max',
                label: 'Altitud máxima (msnm)',
                type: 'number'
            },
            {
                name: 'horas_sol',
                label: 'Horas de sol',
                type: 'number'
            },

            {
                name: 'humedad_min',
                label: 'Humedad mínima (%)',
                type: 'number'
            },
            {
                name: 'humedad_max',
                label: 'Humedad máxima (%)',
                type: 'number'
            },

            {
                name: 'precipitacion_min',
                label: 'Precipitación mínima (mm/año)',
                type: 'number'
            },
            {
                name: 'precipitacion_max',
                label: 'Precipitación máxima (mm/año)',
                type: 'number'
            },

            {
                name: 'temperatura_min',
                label: 'Temperatura mínima (°C)',
                type: 'number'
            },
            {
                name: 'temperatura_max',
                label: 'Temperatura máxima (°C)',
                type: 'number'
            },

            {
                name: 'radiacion_min',
                label: 'Radiación mínima (MJ/m²/día)',
                type: 'number'
            },
            {
                name: 'radiacion_max',
                label: 'Radiación máxima (MJ/m²/día)',
                type: 'number'
            }
        ]
    },

    Categoria: {
        title: 'Categorías',
        endpoint: '/api/cultivos/categorias/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' },
            { key: 'descripcion', label: 'Descripción' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            },
            {
                name: 'descripcion',
                label: 'Descripción',
                type: 'textarea',
                required: false
            }
        ]
    },

    TipoSuelo: {
        title: 'Tipos de Suelo',
        endpoint: '/api/cultivos/tipo-suelo/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' },
            { key: 'descripcion', label: 'Descripción' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            },
            {
                name: 'descripcion',
                label: 'Descripción',
                type: 'textarea',
                required: false
            }
        ]
    },

    TipoAmenaza: {
        title: 'Tipos de Amenaza',
        endpoint: '/api/cultivos/tipo-amenazas/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            }
        ]
    },

    Amenaza: {
        title: 'Amenazas',
        endpoint: '/api/cultivos/amenazas/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' },
            { key: 'descripcion', label: 'Descripción' },
            { key: 'tipo_amenaza', label: 'Tipo de amenaza' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            },
            {
                name: 'descripcion',
                label: 'Descripción',
                type: 'textarea',
                required: true
            },
            {
                name: 'tipo_amenaza',
                label: 'Tipo de amenaza',
                type: 'select',
                endpoint: '/api/cultivos/tipo-amenazas/'
            }
        ]
    },

    Estado: {
        title: 'Estados',
        endpoint: '/api/cultivos/estados/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            }
        ]
    },

    Provincia: {
        title: 'Provincias',
        endpoint: '/api/agroclima/provincias/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            }
        ]
    },

    Canton: {
        title: 'Cantones',
        endpoint: '/api/agroclima/cantones/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'provincia', label: 'Provincia' },
            { key: 'nombre', label: 'Nombre' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            },
            {
                name: 'provincia',
                label: 'Provincia',
                type: 'select',
                endpoint: '/api/agroclima/provincias/'
            }
        ]
    },

    Parroquia: {
        title: 'Parroquias',
        endpoint: '/api/agroclima/parroquias/',

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'canton', label: 'Cantón' },
            { key: 'nombre', label: 'Nombre' }
        ],

        fields: [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true
            },
            {
                name: 'canton',
                label: 'Cantón',
                type: 'select',
                endpoint: '/api/agroclima/cantones/'
            }
        ]
    },

    Usuario: {
        title: 'Usuarios',
        endpoint: '/api/usuarios/admin/usuarios/',
        allowCreate: false,

        columns: [
            { key: 'id', label: 'ID' },
            { key: 'username', label: 'Usuario' },
            { key: 'first_name', label: 'Nombre' },
            { key: 'last_name', label: 'Apellido' },
            { key: 'email', label: 'Correo' },
            { key: 'is_staff', label: 'Administrador' },
            { key: 'is_active', label: 'Activo' }
        ],

        fields: [
            {
                name: 'username',
                label: 'Usuario',
                type: 'text'
            },
            {
                name: 'first_name',
                label: 'Nombre',
                type: 'text'
            },
            {
                name: 'last_name',
                label: 'Apellido',
                type: 'text'
            },
            {
                name: 'email',
                label: 'Correo',
                type: 'email'
            },
            {
                name: 'cedula',
                label: 'Cédula',
                type: 'text'
            },
            {
                name: 'profesion',
                label: 'Profesión',
                type: 'text'
            },
            {
                name: 'is_staff',
                label: 'Administrador',
                type: 'checkbox'
            },
            {
                name: 'is_active',
                label: 'Activo',
                type: 'checkbox'
            }
        ]
    }
};

export default modelsConfig;