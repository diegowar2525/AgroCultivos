def construir_texto_prediccion(resultado_prediccion):
    return (
        "--- Diagnóstico automático por imagen ---\n"
        f"Cultivo detectado: {resultado_prediccion.get('cultivo')}\n"
        f"Amenaza detectada: {resultado_prediccion.get('amenaza')}\n"
        f"Tipo de amenaza: {resultado_prediccion.get('tipo_amenaza')}\n"
        f"Estado: {resultado_prediccion.get('estado')}\n"
        f"Confianza: {resultado_prediccion.get('confianza')}%\n"
        f"Clase del modelo: {resultado_prediccion.get('clase_modelo')}"
    )