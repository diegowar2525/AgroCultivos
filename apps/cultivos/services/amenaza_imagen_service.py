import json
import os
from functools import lru_cache

import numpy as np
import tensorflow as tf
from tensorflow.keras.utils import load_img, img_to_array


IMG_SIZE = (224, 224)

APP_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_DIR = os.path.join(APP_DIR, "ml")

MODEL_PATH = os.path.join(ML_DIR, "modelo_amenazas_cultivos_efficientnet.keras")
CLASS_NAMES_PATH = os.path.join(ML_DIR, "class_names.json")
CLASS_METADATA_PATH = os.path.join(ML_DIR, "class_metadata.json")


@lru_cache(maxsize=1)
def cargar_modelo():
    return tf.keras.models.load_model(MODEL_PATH)


@lru_cache(maxsize=1)
def cargar_class_names():
    with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as archivo:
        return json.load(archivo)


@lru_cache(maxsize=1)
def cargar_metadata():
    with open(CLASS_METADATA_PATH, "r", encoding="utf-8") as archivo:
        return json.load(archivo)


def preparar_imagen(ruta_imagen):
    imagen = load_img(ruta_imagen, target_size=IMG_SIZE)
    imagen_array = img_to_array(imagen)
    imagen_array = np.expand_dims(imagen_array, axis=0)
    return imagen_array


def predecir_amenaza_desde_ruta(ruta_imagen, top_n=5):
    if not os.path.exists(ruta_imagen):
        raise FileNotFoundError(f"No se encontró la imagen: {ruta_imagen}")

    modelo = cargar_modelo()
    class_names = cargar_class_names()
    metadata = cargar_metadata()

    imagen_array = preparar_imagen(ruta_imagen)

    predicciones = modelo.predict(imagen_array, verbose=0)[0]

    indice_predicho = int(np.argmax(predicciones))
    confianza = float(predicciones[indice_predicho]) * 100

    clase_predicha = class_names[indice_predicho]
    datos_clase = metadata.get(clase_predicha, {})

    indices_top = np.argsort(predicciones)[::-1][:top_n]

    top_predicciones = []

    for indice in indices_top:
        indice = int(indice)
        clase_top = class_names[indice]
        datos_top = metadata.get(clase_top, {})

        top_predicciones.append(
            {
                "clase_modelo": clase_top,
                "confianza": round(float(predicciones[indice]) * 100, 2),
                "cultivo": datos_top.get("cultivo", ""),
                "amenaza": datos_top.get("amenaza", ""),
                "tipo_amenaza": datos_top.get("tipo_amenaza", ""),
                "estado": datos_top.get("estado", ""),
            }
        )

    return {
        "clase_modelo": clase_predicha,
        "confianza": round(confianza, 2),
        "cultivo": datos_clase.get("cultivo", ""),
        "amenaza": datos_clase.get("amenaza", ""),
        "tipo_amenaza": datos_clase.get("tipo_amenaza", ""),
        "estado": datos_clase.get("estado", ""),
        "top_predicciones": top_predicciones,
    }
