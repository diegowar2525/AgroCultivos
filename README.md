# AgroCultivos

Sistema web para la recomendación de cultivos basado en condiciones agroclimáticas y aprendizaje automático. El proyecto utiliza un backend desarrollado con Django REST Framework y un frontend desarrollado con React, obteniendo datos climáticos desde Open-Meteo y generando recomendaciones mediante un modelo de Machine Learning.

---

## Tecnologías utilizadas

### Backend
- Python 3.11
- Django 5
- Django REST Framework
- SQLite (desarrollo)
- Scikit-learn
- NumPy
- Requests

### Frontend
- React
- Vite
- Axios

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd AgroCultivos
```

---

## 2. Crear un entorno virtual (Python 3.11)

### Windows

```bash
py -3.11 -m venv venv
```

### Linux / macOS

```bash
python3.11 -m venv venv
```

---

## 3. Activar el entorno virtual

### Windows (PowerShell)

```powershell
.\venv\Scripts\Activate.ps1
```

### Windows (CMD)

```cmd
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 4. Instalar las dependencias

```bash
pip install -r requirements.txt
```

---

## 5. Aplicar las migraciones

```bash
py manage.py makemigrations
py manage.py migrate
```

---

## 6. Crear un superusuario

```bash
py manage.py createsuperuser
```

Sigue las instrucciones en pantalla para crear el usuario administrador.

---

## 7. Poblar la base de datos

Este comando crea automáticamente:

- Provincias
- Cantones
- Parroquias
- Ubicaciones
- Condiciones climáticas
- Categorías
- Cultivos
- Especificaciones agroclimáticas
- Amenazas
- Tipos de suelo
- Estados
- Datos iniciales necesarios para el funcionamiento del sistema

```bash
py manage.py poblar_bd
```

---

## 8. Iniciar el servidor backend

```bash
py manage.py runserver
```

El backend estará disponible en:

```
http://127.0.0.1:8000/
```

---

# Configuración del Frontend

Entrar a la carpeta del cliente:

```bash
cd client
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en:

```
http://localhost:5173/
```

---

# Acceso al administrador

Una vez iniciado el backend, acceder a:

```
http://127.0.0.1:8000/admin/
```

Ingresar con el superusuario creado anteriormente.

---

# Estructura del proyecto

```
AgroCultivos/
│
├── apps/
│   ├── agroclima/
│   ├── cultivos/
│   ├── recomendaciones/
│   └── usuarios/
│
├── client/
│
├── requirements.txt
├── manage.py
└── README.md
```

---

# Fuente de datos

Las recomendaciones utilizan:

- Open-Meteo para obtener información climática en tiempo real.
- Un modelo de Machine Learning basado en Random Forest entrenado con información agroclimática de cultivos ecuatorianos.

---

# Notas

- Se recomienda utilizar **Python 3.11** para asegurar compatibilidad con las dependencias del proyecto.
- La base de datos utilizada durante el desarrollo es **SQLite**.
- El comando `poblar_bd` debe ejecutarse únicamente después de aplicar las migraciones.
- El frontend asume que el backend se encuentra ejecutándose en `http://127.0.0.1:8000/`.