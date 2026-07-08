/**
 * Base de datos de plagas y problemas comunes por cultivo.
 * Antes vivia embebida dentro de MisCosechas.jsx (~360 lineas mezcladas
 * con la logica de la pagina). Se extrajo aqui para que la pagina quede
 * enfocada en UI/estado, y esta data se pueda reutilizar o mover a una
 * fuente externa (API/JSON) mas adelante sin tocar componentes.
 */
export const AMENAZAS_POR_CULTIVO = {
    'Tomate riñón': [
        { nombre: 'Tizón tardío', pasos: ['Aplicar mancozeb o clorotalonil preventivamente.', 'Evitar riego nocturno y exceso de humedad foliar.', 'Retirar hojas muy afectadas y quemar fuera del cultivo.'] },
        { nombre: 'Mosca blanca', pasos: ['Colocar trampas amarillas adhesivas cerca del cultivo.', 'Aplicar imidacloprid al suelo o jabón potásico en hojas.', 'Repetir cada 5 días hasta eliminar la colonia.'] },
        { nombre: 'Fusarium', pasos: ['Rotar cultivos por al menos 3 años.', 'Desinfectar el suelo con cal agrícola antes de sembrar.', 'Eliminar plantas enfermas inmediatamente.'] },
        { nombre: 'Alternaria', pasos: ['Retirar hojas basales afectadas.', 'Aplicar fungicida cúprico preventivo.', 'Mejorar ventilación entre plantas.'] },
    ],
    'Lechuga': [
        { nombre: 'Mildiu velloso', pasos: ['Aplicar fosetil-aluminio al detectar síntomas.', 'Mejorar ventilación reduciendo densidad de siembra.', 'Evitar riego por aspersión en la tarde.'] },
        { nombre: 'Afidos', pasos: ['Aplicar jabón potásico o aceite de neem en el envés.', 'Colocar trampas amarillas adhesivas.', 'Repetir cada 3 días hasta eliminar colonias.'] },
        { nombre: 'Podredumbre gris', pasos: ['Retirar hojas y plantas afectadas inmediatamente.', 'Aplicar iprodiona o pyrimethanil.', 'Reducir humedad foliar cambiando a riego por goteo.'] },
    ],
    'Maíz suave': [
        { nombre: 'Roya común', pasos: ['Aplicar fungicida cúprico preventivo cada 10 días.', 'Evitar exceso de humedad foliar al regar.', 'Usar variedades tolerantes en la siguiente siembra.'] },
        { nombre: 'Gusano cogollero', pasos: ['Aplicar Bt (Bacillus thuringiensis) o cipermetrina al cogollo.', 'Revisar manualmente y retirar larvas visibles.', 'Repetir cada 7 días mientras persista la plaga.'] },
        { nombre: 'Carbón del maíz', pasos: ['Retirar y quemar las plantas con agallas negras.', 'Usar semilla certificada en la próxima siembra.', 'Rotar cultivos para reducir la carga del hongo en el suelo.'] },
    ],
    'Maíz duro': [
        { nombre: 'Gusano cogollero', pasos: ['Aplicar Spodoptera NPV o clorpirifós al cogollo.', 'Revisar el cultivo dos veces por semana.', 'Usar trampas con feromonas para monitoreo.'] },
        { nombre: 'Tizón de la hoja', pasos: ['Aplicar fungicida preventivo a los 40 días.', 'Usar variedad resistente en la próxima siembra.', 'Retirar hojas muy afectadas para reducir inóculo.'] },
        { nombre: 'Pudrición del tallo', pasos: ['Garantizar buen drenaje en el lote.', 'No sembrar a densidades mayores a las recomendadas.', 'Eliminar rastrojos al finalizar la cosecha.'] },
    ],
    'Papa': [
        { nombre: 'Lancha / Tizón tardío', pasos: ['Aplicar mancozeb preventivo cada 8 días en época lluviosa.', 'No regar de noche; preferir riego en la mañana.', 'Eliminar plantas enfermas y no dejar tubérculos en el suelo.'] },
        { nombre: 'Rhizoctonia', pasos: ['Tratar los tubérculos semilla con thiram antes de sembrar.', 'Usar semilla certificada libre de la enfermedad.', 'Rotar con cereales al menos 2 temporadas.'] },
        { nombre: 'Gusano blanco', pasos: ['Instalar trampas con feromonas para capturar adultos.', 'Rotar cultivos para romper el ciclo de la plaga.', 'Aplicar insecticida granulado al suelo antes de sembrar.'] },
        { nombre: 'Nematodos', pasos: ['Incorporar brasicas al suelo como biofumigación.', 'Rotar con gramíneas (maíz, trigo) por 2 años.', 'Usar variedades resistentes donde estén disponibles.'] },
    ],
    'Brócoli': [
        { nombre: 'Mildiu', pasos: ['Aplicar metalaxil + mancozeb preventivamente.', 'Evitar riego nocturno y reducir densidad de siembra.', 'Rotar con no-crucíferas por al menos 2 años.'] },
        { nombre: 'Hernia de las crucíferas', pasos: ['Encalar el suelo para elevar el pH por encima de 7.', 'No sembrar crucíferas en ese lote por 4 años mínimo.', 'Desinfectar herramientas al pasar de un lote a otro.'] },
        { nombre: 'Gusano de la col', pasos: ['Aplicar Bt (Bacillus thuringiensis) cada 7 días.', 'Revisar el envés de las hojas para detectar huevos.', 'Usar red antimosca como barrera preventiva.'] },
    ],
    'Zanahoria': [
        { nombre: 'Alternaria', pasos: ['Aplicar mancozeb preventivo desde el inicio.', 'Eliminar restos de cosecha que pueden albergar el hongo.', 'Rotar cultivos y usar semilla tratada.'] },
        { nombre: 'Nematodos', pasos: ['Rotar con cebolla o maíz por 2 temporadas.', 'Incorporar brasicas como biofumigante al suelo.', 'Evitar introducir suelo de lotes infestados.'] },
        { nombre: 'Tizón de la hoja', pasos: ['Reducir densidad de siembra para mejorar aireación.', 'Aplicar iprodiona al detectar manchas en hojas.', 'No regar de noche.'] },
    ],
    'Cebolla de bulbo': [
        { nombre: 'Mildiu de la cebolla', pasos: ['Aplicar clorotalonil preventivo cada 10 días.', 'Eliminar plantas voluntarias alrededor del lote.', 'Evitar exceso de nitrógeno que favorece la enfermedad.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o imidacloprid al detectar daño en hojas.', 'Colocar trampas azules adhesivas para monitoreo.', 'Mantener el cultivo libre de malezas hospederas.'] },
        { nombre: 'Fusarium basal', pasos: ['Usar semilla tratada con fungicida.', 'Rotar cultivos por al menos 3 años con gramíneas.', 'Eliminar y quemar plantas con pudrición basal.'] },
    ],
    'Cebolla paiteña': [
        { nombre: 'Botrytis', pasos: ['Aplicar iprodiona o tiram preventivamente.', 'Mejorar la ventilación entre plantas.', 'Retirar hojas y bulbos afectados del lote.'] },
        { nombre: 'Trips', pasos: ['Aplicar aceite de neem o spinosad semanalmente.', 'Usar trampas azules adhesivas para monitoreo.', 'Evitar siembras cercanas a cultivos infestados.'] },
        { nombre: 'Podredumbre blanda', pasos: ['Evitar daños mecánicos durante las labores de cultivo.', 'No excederse en el riego; dejar secar la superficie.', 'Cosechar a tiempo sin dejar bulbos maduros en el suelo.'] },
    ],
    'Pimiento': [
        { nombre: 'Antracnosis', pasos: ['Aplicar fungicida cúprico preventivamente.', 'Evitar que la lluvia directa golpee los frutos.', 'Retirar y destruir frutos infectados inmediatamente.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o jabón potásico al detectar adultos.', 'Colocar trampas azules adhesivas.', 'Repetir el tratamiento cada 5 días.'] },
        { nombre: 'Botrytis', pasos: ['Mejorar la ventilación podando hojas internas.', 'Aplicar pyrimethanil o iprodiona en condiciones húmedas.', 'Retirar flores y partes afectadas del cultivo.'] },
    ],
    'Pepino': [
        { nombre: 'Oídio', pasos: ['Aplicar azufre mojable o bicarbonato de potasio al 0.5%.', 'Mejorar ventilación reduciendo densidad.', 'Repetir cada 7 días en época seca.'] },
        { nombre: 'Ácaros', pasos: ['Aplicar acaricida específico (abamectina) al detectarlos.', 'Aumentar la humedad ambiental rociando agua en el follaje.', 'Retirar las hojas más infestadas.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar mancozeb preventivo en época lluviosa.', 'Retirar frutos dañados inmediatamente.', 'Evitar riego por aspersión en la tarde.'] },
    ],
    'Zapallo': [
        { nombre: 'Oídio', pasos: ['Aplicar azufre mojable cada 10 días en época seca.', 'Eliminar hojas muy afectadas para reducir inóculo.', 'Mejorar la aireación entre plantas.'] },
        { nombre: 'Mosca de la fruta', pasos: ['Colocar trampas con proteína hidrolizada + malatión.', 'Cosechar frutos maduros a tiempo.', 'Enterrar o quemar frutos caídos para romper el ciclo.'] },
        { nombre: 'Mildiu', pasos: ['Aplicar metalaxil + mancozeb preventivamente.', 'Cambiar a riego por goteo para evitar mojar el follaje.', 'Rotar cultivos la siguiente temporada.'] },
    ],
    'Sandía': [
        { nombre: 'Antracnosis', pasos: ['Aplicar mancozeb o clorotalonil preventivamente.', 'Evitar riego nocturno.', 'Eliminar plantas enfermas y no dejar rastrojos.'] },
        { nombre: 'Fusarium', pasos: ['Usar injerto sobre portainjerto resistente.', 'Rotar con gramíneas por 3 años mínimo.', 'No usar agua de riego de fuentes contaminadas.'] },
        { nombre: 'Mosca de la fruta', pasos: ['Instalar trampas con cebo de malatión.', 'Cosechar a tiempo sin dejar frutos sobremaduros.', 'Enterrar o quemar frutos caídos.'] },
    ],
    'Melón': [
        { nombre: 'Oídio', pasos: ['Aplicar azufre coloidal o triadimenol.', 'Garantizar buena ventilación en el cultivo.', 'Repetir cada 10 días en condiciones secas y calurosas.'] },
        { nombre: 'Virus del mosaico', pasos: ['Controlar los pulgones vectores con imidacloprid.', 'Eliminar plantas enfermas inmediatamente.', 'Usar semilla certificada libre de virus.'] },
        { nombre: 'Mosca de la fruta', pasos: ['Trampas con feromonas específicas.', 'Cosechar a tiempo sin dejar frutos maduros en planta.', 'Enterrar frutos caídos a 30 cm de profundidad.'] },
    ],
    'Maracuyá': [
        { nombre: 'Fusarium', pasos: ['Garantizar excelente drenaje en el suelo.', 'Aplicar metalaxil preventivo al suelo.', 'Eliminar y quemar plantas con síntomas de marchitez.'] },
        { nombre: 'Virus de la vena amarilla', pasos: ['Controlar los áfidos vectores con imidacloprid.', 'Eliminar plantas enfermas tan pronto se detecten.', 'Usar material de siembra certificado.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar cobre oxicloruro cada 15 días en época lluviosa.', 'Podar para mejorar la ventilación del dosel.', 'Retirar frutos y hojas infectados.'] },
    ],
    'Fresa': [
        { nombre: 'Botrytis', pasos: ['Retirar frutos dañados del cultivo inmediatamente.', 'Aplicar iprodiona o pyrimethanil preventivamente.', 'Mejorar la aireación y evitar exceso de humedad.'] },
        { nombre: 'Araña roja', pasos: ['Aplicar acaricida específico (abamectina o hexitiazox).', 'Mantener la humedad adecuada para desfavorecer la plaga.', 'Retirar hojas con colonias visibles.'] },
        { nombre: 'Phytophthora', pasos: ['Garantizar excelente drenaje en el suelo.', 'Aplicar metalaxil preventivo al suelo.', 'Usar plántulas certificadas libres de la enfermedad.'] },
    ],
    'Tomate de árbol': [
        { nombre: 'Antracnosis', pasos: ['Aplicar fungicida cúprico preventivo cada 15 días.', 'Evitar heridas en la corteza durante las labores.', 'Retirar frutos enfermos del árbol y del suelo.'] },
        { nombre: 'Mosca de la fruta', pasos: ['Instalar trampas McPhail con proteína hidrolizada.', 'Cosechar frutos en punto óptimo, no sobremaduros.', 'Enterrar o destruir frutos caídos.'] },
        { nombre: 'Oídio', pasos: ['Aplicar azufre mojable en condiciones secas.', 'Podar ramas internas para mejorar la aireación.', 'Repetir cada 10 días mientras persistan los síntomas.'] },
    ],
    'Babaco': [
        { nombre: 'Phytophthora', pasos: ['Garantizar drenaje perfecto; evitar zonas con encharcamiento.', 'Aplicar metalaxil preventivo al suelo cada 30 días.', 'No regar en exceso; preferir goteo.'] },
        { nombre: 'Virus mancha anular', pasos: ['Controlar áfidos con imidacloprid.', 'Eliminar y quemar plantas enfermas.', 'Usar material de propagación de origen sano.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar cobre oxicloruro cada 15 días en época lluviosa.', 'Retirar frutos y hojas con síntomas.', 'Mejorar la ventilación podando el exceso de follaje.'] },
    ],
    'Uvilla': [
        { nombre: 'Botrytis', pasos: ['Aplicar pyrimethanil o iprodiona en condiciones húmedas.', 'Mejorar aireación entre plantas con poda.', 'Retirar frutos dañados del cultivo.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o aceite de neem al detectar daño.', 'Colocar trampas azules adhesivas.', 'Repetir el tratamiento cada 5 días.'] },
        { nombre: 'Fusarium', pasos: ['Rotar cultivos; no sembrar uvilla en el mismo lote por 3 años.', 'Usar material de siembra de origen sano.', 'Eliminar plantas marchitas inmediatamente.'] },
    ],
    'Mora de castilla': [
        { nombre: 'Botrytis', pasos: ['Retirar frutos dañados del cultivo.', 'Aplicar iprodiona preventivo antes de la temporada lluviosa.', 'Mejorar la ventilación con poda sanitaria.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar cobre oxicloruro cada 10 días en época húmeda.', 'Retirar cañas enfermas y quemarlas fuera del cultivo.', 'No regar de noche.'] },
        { nombre: 'Mildiu velloso', pasos: ['Aplicar metalaxil + mancozeb preventivamente.', 'Realizar poda sanitaria para mejorar la ventilación.', 'Evitar riegos por aspersión en la tarde-noche.'] },
    ],
    'Limón': [
        { nombre: 'Gomosis por Phytophthora', pasos: ['Aplicar metalaxil al suelo en la zona de raíces.', 'Evitar encharcamiento; mejorar el drenaje del lote.', 'No acumular tierra o materia orgánica contra el tronco.'] },
        { nombre: 'Minador de la hoja', pasos: ['Aplicar imidacloprid o spinosad en brotes nuevos.', 'Retirar y destruir hojas muy enrolladas con larvas.', 'Monitorear cada 7 días durante el brotamiento.'] },
        { nombre: 'Trips de los cítricos', pasos: ['Aplicar aceite mineral + insecticida en floración.', 'Colocar trampas azules adhesivas para monitoreo.', 'Repetir el tratamiento a los 10 días.'] },
    ],
    'Pepino dulce': [
        { nombre: 'Araña roja', pasos: ['Aplicar abamectina al detectar telarañas finas.', 'Mantener humedad foliar adecuada.', 'Retirar hojas con colonias visibles.'] },
        { nombre: 'Virus del mosaico', pasos: ['Controlar pulgones vectores con jabón potásico.', 'Eliminar plantas con síntomas de mosaico.', 'Usar material de propagación sano.'] },
        { nombre: 'Oídio', pasos: ['Aplicar azufre coloidal o bicarbonato de potasio.', 'Mejorar la ventilación entre plantas.', 'Repetir cada 7 días en época seca.'] },
    ],
    'Naranjilla': [
        { nombre: 'Nematodos', pasos: ['Incorporar brasicas como biofumigante antes de sembrar.', 'Rotar con gramíneas por 2 temporadas.', 'Usar variedades tolerantes donde estén disponibles.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar fungicida cúprico preventivo.', 'Retirar frutos enfermos del cultivo y del suelo.', 'Mejorar la ventilación con poda.'] },
        { nombre: 'Fusarium', pasos: ['Desinfectar el suelo con cal agrícola.', 'Usar variedades resistentes disponibles en el mercado.', 'Eliminar plantas marchitas inmediatamente.'] },
    ],
    'Fréjol': [
        { nombre: 'Antracnosis', pasos: ['Usar semilla certificada tratada con fungicida.', 'Aplicar mancozeb preventivo en época lluviosa.', 'Eliminar rastrojos al finalizar la cosecha.'] },
        { nombre: 'Roya', pasos: ['Aplicar triadimenol o tebuconazol al detectar pústulas.', 'Usar variedad tolerante en la siguiente siembra.', 'No mojar el follaje al regar.'] },
        { nombre: 'Mosca de la semilla', pasos: ['Tratar la semilla con insecticida sistémico antes de sembrar.', 'Sembrar en suelo bien preparado y aireado.', 'Evitar incorporar abonos orgánicos frescos al sembrar.'] },
    ],
    'Arveja': [
        { nombre: 'Oídio', pasos: ['Aplicar azufre mojable preventivo desde inicio de floración.', 'Mejorar la ventilación reduciendo densidad de siembra.', 'Repetir cada 10 días en condiciones secas.'] },
        { nombre: 'Tizón de la arveja', pasos: ['Aplicar cúprico preventivo en época lluviosa.', 'Usar semilla certificada de origen sano.', 'Rotar cultivos con gramíneas.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o pirimicarb al detectar colonias.', 'Eliminar plantas voluntarias que sirven de hospedero.', 'Repetir el tratamiento cada 5 días.'] },
    ],
    'Haba': [
        { nombre: 'Roya del haba', pasos: ['Aplicar tebuconazol al detectar pústulas naranjas.', 'Retirar hojas muy afectadas del cultivo.', 'Usar variedad tolerante en la próxima siembra.'] },
        { nombre: 'Botrytis', pasos: ['Mejorar la ventilación entre plantas.', 'Aplicar iprodiona preventivo antes de la temporada lluviosa.', 'Retirar flores y tejido necrótico.'] },
        { nombre: 'Pulgón negro', pasos: ['Aplicar jabón potásico o aceite de neem semanalmente.', 'Revisar ápices y envés de hojas jóvenes.', 'Repetir el tratamiento cada 4 días.'] },
    ],
    'Soya': [
        { nombre: 'Roya asiática', pasos: ['Aplicar triazoles (tebuconazol) preventivo desde floración.', 'Monitorear el cultivo semanalmente en época lluviosa.', 'Usar variedad con resistencia parcial si está disponible.'] },
        { nombre: 'Antracnosis', pasos: ['Usar semilla certificada tratada con carbendazim.', 'Eliminar rastrojos al finalizar la cosecha.', 'Rotar cultivos con gramíneas.'] },
        { nombre: 'Gusano de la soya', pasos: ['Aplicar Bt o insecticida específico al detectar larvas.', 'Monitorear dos veces por semana durante el llenado de vainas.', 'Usar trampas de luz para capturar adultos.'] },
    ],
    'Maní': [
        { nombre: 'Cercospora', pasos: ['Aplicar clorotalonil cada 15 días desde floración.', 'Eliminar hojas afectadas y reducir densidad de siembra.', 'Usar variedad resistente en la próxima siembra.'] },
        { nombre: 'Aflatoxinas', pasos: ['Cosechar a tiempo sin dejar el cultivo pasar.', 'Secar rápidamente el grano hasta 9% de humedad.', 'Almacenar en condiciones secas y ventiladas.'] },
        { nombre: 'Gusano de tierra', pasos: ['Aplicar clorpirifós granulado al suelo antes de sembrar.', 'Rotar cultivos para romper el ciclo de la plaga.', 'Preparar bien el suelo para exponer las larvas.'] },
    ],
    'Lenteja': [
        { nombre: 'Antracnosis', pasos: ['Usar semilla sana y tratada.', 'Aplicar mancozeb preventivo en época lluviosa.', 'Eliminar rastrojos al terminar la cosecha.'] },
        { nombre: 'Fusarium', pasos: ['Rotar cultivos por 2 años mínimo.', 'Garantizar buen drenaje en el lote.', 'No sembrar en suelos que han tenido fusariosis.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o pirimicarb al detectar colonias.', 'Eliminar malezas hospederas alrededor del cultivo.', 'Repetir cada 5 días.'] },
    ],
    'Arroz': [
        { nombre: 'Piricularia', pasos: ['Aplicar tricyclazol o isoprothiolane preventivo en época húmeda.', 'Usar variedad resistente y semilla certificada.', 'Evitar exceso de nitrógeno que favorece la enfermedad.'] },
        { nombre: 'Añublo de la vaina', pasos: ['Aplicar propiconazol al detectar lesiones en vainas.', 'Mantener distancia adecuada entre plantas.', 'Eliminar rastrojos al finalizar la cosecha.'] },
        { nombre: 'Sogata', pasos: ['Aplicar insecticida sistémico (imidacloprid) al detectarla.', 'Usar variedad resistente al virus que transmite.', 'Monitorear el cultivo semanalmente.'] },
    ],
    'Cebada': [
        { nombre: 'Roya de la hoja', pasos: ['Aplicar tebuconazol o triadimefón preventivo desde macollamiento.', 'Usar variedad resistente disponible en la zona.', 'Cosechar a tiempo para evitar pérdidas.'] },
        { nombre: 'Oídio', pasos: ['Aplicar azufre mojable al detectar síntomas.', 'Mejorar la ventilación entre plantas.', 'Usar variedades resistentes en la próxima siembra.'] },
        { nombre: 'Fusarium de la espiga', pasos: ['Cosechar con baja humedad del grano.', 'Rotar cultivos con leguminosas o papa.', 'No sembrar en lotes con historial de la enfermedad.'] },
    ],
    'Trigo': [
        { nombre: 'Roya amarilla', pasos: ['Aplicar tebuconazol preventivo desde macollamiento.', 'Usar variedad resistente recomendada para la zona.', 'Monitorear el cultivo semanalmente desde el macollamiento.'] },
        { nombre: 'Septoria', pasos: ['Aplicar propiconazol al detectar manchas en hojas.', 'Usar semilla tratada con fungicida.', 'Rotar cultivos con leguminosas.'] },
        { nombre: 'Fusarium', pasos: ['Usar semilla tratada con carbendazim.', 'Cosechar con humedad del grano por debajo del 14%.', 'Secar y almacenar adecuadamente el grano.'] },
    ],
    'Quinua': [
        { nombre: 'Mildiu', pasos: ['Aplicar metalaxil + mancozeb preventivo.', 'Mejorar la aireación reduciendo densidad de siembra.', 'Evitar exceso de nitrógeno en la fertilización.'] },
        { nombre: 'Kcona kcona', pasos: ['Aplicar Bt o spinosad al detectar larvas en hojas apicales.', 'Revisar el cultivo dos veces por semana.', 'Usar trampas de luz para adultos.'] },
        { nombre: 'Afidos', pasos: ['Aplicar jabón potásico semanalmente.', 'Evitar exceso de nitrógeno que atrae la plaga.', 'Eliminar plantas voluntarias hospederas.'] },
    ],
    'Chocho (Tarwi)': [
        { nombre: 'Antracnosis', pasos: ['Usar semilla certificada y tratada.', 'Aplicar mancozeb preventivo en época lluviosa.', 'Eliminar rastrojos al finalizar el ciclo.'] },
        { nombre: 'Fusarium', pasos: ['Rotar con gramíneas por 3 años mínimo.', 'Usar semilla de origen sano.', 'No sembrar en suelos con historial de la enfermedad.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar aceite de neem o jabón potásico.', 'Monitorear semanalmente desde el inicio del cultivo.', 'Liberar depredadores naturales si es posible.'] },
    ],
    'Acelga': [
        { nombre: 'Cercospora', pasos: ['Aplicar mancozeb preventivo.', 'Eliminar hojas viejas y afectadas.', 'No regar de noche; reducir la humedad foliar.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o pirimicarb semanalmente.', 'Revisar el envés de las hojas.', 'Repetir el tratamiento cada 4 días hasta controlar.'] },
        { nombre: 'Caracoles', pasos: ['Colocar cebos con metaldehído alrededor del cultivo.', 'Retirar manualmente los caracoles en la mañana.', 'Eliminar residuos vegetales donde se esconden.'] },
    ],
    'Espinaca': [
        { nombre: 'Mildiu velloso', pasos: ['Aplicar metalaxil preventivo desde el trasplante.', 'Mejorar la ventilación entre plantas.', 'Evitar riego nocturno.'] },
        { nombre: 'Fusarium', pasos: ['Rotar con gramíneas por al menos 2 temporadas.', 'Usar semilla sana y tratada.', 'No sembrar en suelos con encharcamiento.'] },
        { nombre: 'Minador de la hoja', pasos: ['Aplicar abamectina al detectar galerías en hojas.', 'Retirar y destruir hojas muy afectadas.', 'Repetir el tratamiento a los 7 días.'] },
    ],
    'Col / Repollo': [
        { nombre: 'Gusano de la col', pasos: ['Aplicar Bt (Bacillus thuringiensis) cada 7 días.', 'Revisar el envés de las hojas para detectar huevos.', 'Usar red antimosca como barrera preventiva.'] },
        { nombre: 'Hernia de las crucíferas', pasos: ['Encalar el suelo para elevar el pH a 7.', 'No sembrar crucíferas en el lote por 4 años.', 'Desinfectar herramientas al cambiar de lote.'] },
        { nombre: 'Pulgón ceroso', pasos: ['Aplicar pirimicarb o jabón potásico al detectar colonias.', 'Revisar el ápice y hojas internas.', 'Repetir cada 4 días.'] },
    ],
    'Coliflor': [
        { nombre: 'Alternaria', pasos: ['Aplicar iprodiona o mancozeb preventivo.', 'Eliminar hojas infectadas del cultivo.', 'Usar semilla tratada con fungicida.'] },
        { nombre: 'Mildiu', pasos: ['Aplicar metalaxil + mancozeb preventivamente.', 'No regar de noche; reducir humedad foliar.', 'Rotar cultivos con no-crucíferas.'] },
        { nombre: 'Gusano de la col', pasos: ['Aplicar Bt cada 7 días durante el crecimiento.', 'Revisar la pella en formación para detectar larvas.', 'Usar red antimosca para prevención.'] },
    ],
    'Remolacha': [
        { nombre: 'Cercospora', pasos: ['Aplicar mancozeb preventivo; eliminar hojas afectadas.', 'Rotar cultivos con gramíneas.', 'No regar de noche.'] },
        { nombre: 'Nematodos', pasos: ['Rotar con gramíneas o cereales por 2 años.', 'Incorporar brasicas como biofumigante.', 'Usar material de siembra certificado.'] },
        { nombre: 'Damping-off', pasos: ['Desinfectar la semilla antes de sembrar.', 'Garantizar buen drenaje en el almácigo.', 'No sembrar muy denso para mejorar la aireación.'] },
    ],
    'Rábano': [
        { nombre: 'Hernia de las crucíferas', pasos: ['Encalar el suelo para subir el pH.', 'Rotar con no-crucíferas por al menos 3 años.', 'Eliminar plantas enfermas y el suelo adherido a sus raíces.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o pirimicarb.', 'Eliminar plantas voluntarias de la zona.', 'Repetir el tratamiento cada 5 días.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o aceite de neem al detectar daño.', 'Colocar trampas azules adhesivas.', 'Cosechar a tiempo sin dejar raíces sobremadurar.'] },
    ],
    'Nabo': [
        { nombre: 'Hernia de las crucíferas', pasos: ['Aplicar cal agrícola para elevar el pH del suelo.', 'Rotar con gramíneas por 3 años mínimo.', 'Eliminar plantas enfermas y sus raíces del lote.'] },
        { nombre: 'Pulgón', pasos: ['Aplicar pirimicarb o aceite de neem semanalmente.', 'Revisar plantas jóvenes que son más susceptibles.', 'Eliminar malezas hospederas.'] },
        { nombre: 'Mildiu', pasos: ['Aplicar metalaxil preventivo en época lluviosa.', 'No regar de noche.', 'Usar densidad de siembra adecuada para la aireación.'] },
    ],
    'Cilantro': [
        { nombre: 'Oídio', pasos: ['Aplicar azufre coloidal o bicarbonato de potasio.', 'Mejorar la ventilación con menor densidad de siembra.', 'Cosechar antes de que avance la enfermedad.'] },
        { nombre: 'Damping-off', pasos: ['Usar semilla tratada con fungicida.', 'Garantizar buen drenaje en la cama de siembra.', 'No sembrar muy denso.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o agua con ajo.', 'Revisar el envés de las hojas jóvenes.', 'Repetir cada 4 días.'] },
    ],
    'Perejil': [
        { nombre: 'Septoria', pasos: ['Aplicar mancozeb preventivo.', 'Eliminar hojas viejas con manchas.', 'No regar de noche.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o pirimicarb.', 'Revisar ápices y hojas jóvenes.', 'Repetir cada 5 días.'] },
        { nombre: 'Damping-off', pasos: ['Garantizar buen drenaje en el almácigo.', 'No sembrar muy denso.', 'Usar semilla tratada con fungicida.'] },
    ],
    'Albahaca': [
        { nombre: 'Fusarium', pasos: ['Garantizar buen drenaje en el suelo.', 'Rotar cultivos; no sembrar en el mismo lote más de 2 años.', 'Eliminar plantas marchitas inmediatamente.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar aceite de neem o jabón potásico.', 'Revisar el envés de las hojas nuevas.', 'Repetir el tratamiento cada 4 días.'] },
        { nombre: 'Botrytis', pasos: ['Mejorar la ventilación podando hojas internas.', 'Evitar mojar el follaje al regar.', 'Retirar hojas y tallos afectados.'] },
    ],
    'Apio': [
        { nombre: 'Septoria', pasos: ['Aplicar mancozeb preventivo desde el trasplante.', 'Evitar riego nocturno.', 'Retirar hojas con manchas del cultivo.'] },
        { nombre: 'Tizón tardío', pasos: ['Aplicar cúprico preventivo en época lluviosa.', 'Mejorar la ventilación entre plantas.', 'No mojar el follaje al regar.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar pirimicarb o jabón potásico.', 'Revisar los pecíolos y hojas jóvenes.', 'Repetir cada 5 días.'] },
    ],
    'Puerro': [
        { nombre: 'Trips', pasos: ['Aplicar spinosad o imidacloprid; monitorear semanalmente.', 'Colocar trampas azules adhesivas.', 'Repetir el tratamiento cada 7 días.'] },
        { nombre: 'Mildiu', pasos: ['Aplicar clorotalonil preventivo.', 'Eliminar hojas viejas del cultivo.', 'No regar de noche.'] },
        { nombre: 'Roya del puerro', pasos: ['Aplicar tebuconazol al detectar pústulas naranjas.', 'Retirar hojas muy afectadas.', 'Rotar cultivos con no-aliáceas.'] },
    ],
    'Cebollín': [
        { nombre: 'Trips', pasos: ['Aplicar aceite de neem o spinosad semanalmente.', 'Colocar trampas azules adhesivas.', 'Repetir el tratamiento cada 5 días.'] },
        { nombre: 'Mildiu', pasos: ['Aplicar clorotalonil preventivo en época lluviosa.', 'Mejorar la aireación entre plantas.', 'No mojar el follaje en la tarde-noche.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o pirimicarb.', 'Revisar hojas y vainas regularmente.', 'Eliminar plantas voluntarias alrededor.'] },
    ],
    'Garbanzo': [
        { nombre: 'Fusarium', pasos: ['Usar semilla sana y tratada con fungicida.', 'Rotar cultivos por 3 años con gramíneas.', 'Eliminar plantas con síntomas de marchitez.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar mancozeb preventivo en época lluviosa.', 'Eliminar rastrojos al finalizar la cosecha.', 'Usar semilla certificada en la próxima siembra.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o imidacloprid en floración.', 'Colocar trampas adhesivas para monitoreo.', 'Repetir el tratamiento cada 7 días.'] },
    ],
    'Yuca': [
        { nombre: 'Bacteriosis', pasos: ['Usar material de siembra de origen sano.', 'Eliminar plantas con síntomas de bacteriosis del lote.', 'Desinfectar las estacas antes de plantar.'] },
        { nombre: 'Mosca del cogollo', pasos: ['Aplicar insecticida sistémico al detectar brotes dañados.', 'Eliminar y destruir brotes con larvas.', 'Monitorear semanalmente el cogollo.'] },
        { nombre: 'Ácaros', pasos: ['Aplicar acaricida específico (abamectina).', 'Regar para aumentar la humedad y desfavorecer la plaga.', 'Retirar hojas con colonias visibles.'] },
    ],
    'Camote': [
        { nombre: 'Gusano del camote', pasos: ['Instalar trampas con feromonas para capturar adultos.', 'Aplicar insecticida granulado al suelo antes de sembrar.', 'Cosechar a tiempo sin dejar tubérculos en el suelo.'] },
        { nombre: 'Alternaria', pasos: ['Usar estacas de siembra sanas.', 'Aplicar mancozeb preventivo.', 'Eliminar rastrojos al finalizar.'] },
        { nombre: 'Nematodos', pasos: ['Rotar con maíz o gramíneas por 2 años.', 'Usar material de siembra certificado.', 'Incorporar brasicas como biofumigante.'] },
    ],
    'Oca': [
        { nombre: 'Pudrición del tubérculo', pasos: ['Garantizar buen drenaje; no plantar en suelos arcillosos.', 'Cosechar en tiempo seco y dejar orear los tubérculos.', 'No regar en exceso especialmente cerca de la cosecha.'] },
        { nombre: 'Fusarium', pasos: ['Usar material de siembra sano y de origen conocido.', 'Rotar cultivos con gramíneas.', 'Eliminar tubérculos enfermos del lote.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o aceite de neem.', 'Revisar el envés de las hojas jóvenes.', 'Repetir el tratamiento cada 5 días.'] },
    ],
    'Mashua': [
        { nombre: 'Gorgojo de los Andes', pasos: ['Aplicar insecticida al suelo antes de la siembra.', 'Rotar cultivos con cereales por 2 años.', 'Cosechar en época seca para reducir daño.'] },
        { nombre: 'Pudrición blanda', pasos: ['Garantizar buen drenaje en el lote.', 'Evitar daños mecánicos en los tubérculos.', 'Cosechar en condiciones secas.'] },
        { nombre: 'Mosca de la mashua', pasos: ['Instalar trampas para capturar adultos.', 'Rotar cultivos para romper el ciclo.', 'Revisar los brotes semanalmente.'] },
    ],
    'Melloco': [
        { nombre: 'Pudrición del tubérculo', pasos: ['Mejorar el drenaje del suelo.', 'Usar material de siembra sano.', 'No sembrar en lotes con encharcamiento.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico semanalmente.', 'Revisar ápices y hojas jóvenes.', 'Eliminar plantas voluntarias hospederas.'] },
        { nombre: 'Virus del melloco', pasos: ['Eliminar plantas con síntomas de mosaico.', 'Controlar los insectos vectores con jabón potásico.', 'Usar material de propagación de origen sano.'] },
    ],
    'Achira': [
        { nombre: 'Pudrición del rizoma', pasos: ['Garantizar buen drenaje; evitar encharcamiento.', 'No acumular agua alrededor de los rizomas.', 'Cosechar en época seca.'] },
        { nombre: 'Caracoles y babosas', pasos: ['Colocar cebos con metaldehído alrededor del cultivo.', 'Retirar manualmente en las mañanas.', 'Eliminar residuos vegetales donde se refugian.'] },
        { nombre: 'Roya', pasos: ['Retirar hojas afectadas del cultivo.', 'Aplicar fungicida cúprico preventivo.', 'Mejorar la aireación del cultivo.'] },
    ],
    'Jícama': [
        { nombre: 'Pudrición radicular', pasos: ['Garantizar excelente drenaje en el suelo.', 'Rotar cultivos la siguiente temporada.', 'No sembrar en lotes con historial de la enfermedad.'] },
        { nombre: 'Mosca blanca', pasos: ['Instalar trampas amarillas adhesivas.', 'Aplicar imidacloprid al suelo.', 'Repetir el tratamiento cada 10 días.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o aceite de neem.', 'Colocar trampas azules adhesivas.', 'Repetir el tratamiento cada 7 días.'] },
    ],
    'Zambo': [
        { nombre: 'Oídio', pasos: ['Aplicar azufre mojable cada 10 días en época seca.', 'Mejorar la ventilación entre plantas.', 'Eliminar hojas muy afectadas.'] },
        { nombre: 'Mosca de la fruta', pasos: ['Colocar trampas con cebo proteico.', 'Cosechar frutos a tiempo sin dejarlos sobremadurar.', 'Enterrar o quemar frutos caídos.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar cúprico preventivo en época lluviosa.', 'Retirar frutos dañados del cultivo.', 'No regar de noche.'] },
    ],
    'Choclo': [
        { nombre: 'Gusano cogollero', pasos: ['Aplicar Bt o spinosad al detectar larvas en el cogollo.', 'Revisar el cultivo dos veces por semana.', 'Repetir el tratamiento cada 7 días.'] },
        { nombre: 'Roya del maíz', pasos: ['Aplicar fungicida preventivo desde los 40 días.', 'Usar variedad tolerante.', 'Eliminar hojas muy afectadas.'] },
        { nombre: 'Pudrición de la mazorca', pasos: ['Garantizar buena ventilación en el lote.', 'Cosechar a tiempo en el punto de choclo.', 'No dañar la mazorca durante las labores culturales.'] },
    ],
    'Berenjena': [
        { nombre: 'Verticilium', pasos: ['Rotar cultivos con gramíneas por 3 años.', 'Usar variedades resistentes disponibles.', 'Eliminar plantas enfermas y sus raíces del lote.'] },
        { nombre: 'Araña roja', pasos: ['Aplicar abamectina al detectar telarañas finas.', 'Aumentar la humedad foliar rociando agua.', 'Retirar hojas con colonias visibles.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o imidacloprid semanalmente.', 'Colocar trampas azules adhesivas.', 'Repetir el tratamiento cada 5 días.'] },
    ],
    'Vainita': [
        { nombre: 'Antracnosis', pasos: ['Usar semilla certificada tratada.', 'Aplicar mancozeb preventivo en época lluviosa.', 'Eliminar rastrojos al finalizar.'] },
        { nombre: 'Mosca de la semilla', pasos: ['Tratar la semilla con insecticida sistémico.', 'Sembrar en suelo bien aireado.', 'No incorporar estiércol fresco al sembrar.'] },
        { nombre: 'Roya', pasos: ['Aplicar tebuconazol al detectar pústulas.', 'Usar variedad tolerante en la siguiente siembra.', 'No mojar el follaje al regar.'] },
    ],
    'Pepino cohombro': [
        { nombre: 'Oídio', pasos: ['Aplicar azufre mojable o bicarbonato de potasio.', 'Mejorar la ventilación entre plantas.', 'Repetir cada 7 días en condiciones secas.'] },
        { nombre: 'Antracnosis', pasos: ['Aplicar mancozeb preventivo.', 'Retirar frutos dañados inmediatamente.', 'No regar de noche.'] },
        { nombre: 'Araña roja', pasos: ['Aplicar acaricida específico.', 'Aumentar la humedad ambiental.', 'Retirar hojas con colonias visibles.'] },
    ],
    'Girasol': [
        { nombre: 'Mildiu del girasol', pasos: ['Aplicar metalaxil preventivo; usar semilla tratada.', 'Rotar cultivos con gramíneas.', 'Eliminar plantas enfermas del lote.'] },
        { nombre: 'Esclerotinia', pasos: ['Aplicar iprodiona en floración.', 'Rotar cultivos por al menos 3 años.', 'No sembrar en lotes con historial de la enfermedad.'] },
        { nombre: 'Roya', pasos: ['Aplicar tebuconazol al detectar pústulas en hojas.', 'Usar variedad tolerante.', 'Eliminar hojas muy afectadas.'] },
    ],
    'Sorgo': [
        { nombre: 'Ergot del sorgo', pasos: ['Usar variedad resistente al ergot.', 'Rotar cultivos con leguminosas.', 'Eliminar rastrojos al finalizar.'] },
        { nombre: 'Antracnosis', pasos: ['Tratar la semilla con fungicida.', 'Aplicar mancozeb preventivo.', 'Eliminar plantas enfermas.'] },
        { nombre: 'Pulgón amarillo', pasos: ['Aplicar imidacloprid sistémico al detectar colonias.', 'Monitorear semanalmente el cultivo.', 'Usar variedades tolerantes donde estén disponibles.'] },
    ],
    'Rúcula': [
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o aceite de neem semanalmente.', 'Revisar el envés de las hojas.', 'Repetir cada 4 días.'] },
        { nombre: 'Hernia de las crucíferas', pasos: ['Encalar el suelo para elevar el pH.', 'Rotar con no-crucíferas por 3 años.', 'Cosechar a tiempo antes de que la planta madure.'] },
        { nombre: 'Trips', pasos: ['Aplicar spinosad o aceite de neem.', 'Colocar trampas azules adhesivas.', 'Repetir el tratamiento cada 5 días.'] },
    ],
    'Kale': [
        { nombre: 'Gusano de la col', pasos: ['Aplicar Bt cada 7 días.', 'Usar red antimosca como barrera preventiva.', 'Revisar el envés de las hojas para detectar huevos.'] },
        { nombre: 'Pulgón ceroso', pasos: ['Aplicar jabón potásico o pirimicarb.', 'Revisar hojas internas y ápices.', 'Repetir cada 4 días.'] },
        { nombre: 'Hernia de las crucíferas', pasos: ['Encalar el suelo; rotar cultivos por 4 años.', 'No sembrar crucíferas en lotes con historial.', 'Eliminar plantas enfermas con su sistema radicular.'] },
    ],
    'Orégano': [
        { nombre: 'Botrytis', pasos: ['Mejorar la ventilación podando ramas internas.', 'Aplicar iprodiona en condiciones de alta humedad.', 'Retirar hojas y ramas afectadas.'] },
        { nombre: 'Araña roja', pasos: ['Aplicar aceite de neem o acaricida natural.', 'Aumentar la humedad ambiental en época seca.', 'Retirar hojas con colonias.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o aceite de neem.', 'Revisar los ápices regularmente.', 'Repetir cada 5 días.'] },
    ],
    'Tomillo': [
        { nombre: 'Botrytis', pasos: ['Podar para mejorar la aireación entre ramas.', 'Aplicar iprodiona si la infección es grave.', 'Retirar ramas y hojas afectadas.'] },
        { nombre: 'Araña roja', pasos: ['Aplicar aceite de neem en época seca.', 'Aumentar la humedad ambiental.', 'Retirar hojas con telarañas visibles.'] },
        { nombre: 'Alternaria', pasos: ['Retirar partes afectadas inmediatamente.', 'Aplicar fungicida cúprico preventivo.', 'Mejorar la ventilación del cultivo.'] },
    ],
    'Menta': [
        { nombre: 'Roya de la menta', pasos: ['Aplicar tebuconazol al detectar pústulas.', 'Eliminar y destruir partes afectadas.', 'Usar material de propagación de origen sano.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico o aceite de neem.', 'Revisar los ápices y hojas jóvenes.', 'Repetir el tratamiento cada 4 días.'] },
        { nombre: 'Verticilium', pasos: ['Rotar cultivos; no replantar menta en el mismo lugar.', 'Usar material de propagación sano.', 'Eliminar plantas marchitas y el suelo circundante.'] },
    ],
    'Hierba luisa': [
        { nombre: 'Araña roja', pasos: ['Aplicar aceite de neem o acaricida específico en época seca.', 'Aumentar la humedad ambiental rociando agua.', 'Retirar hojas con colonias de ácaros.'] },
        { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico semanalmente.', 'Revisar los brotes jóvenes regularmente.', 'Repetir el tratamiento cada 4 días.'] },
        { nombre: 'Botrytis', pasos: ['Podar ramas internas para mejorar la ventilación.', 'No regar de noche.', 'Retirar hojas y ramas afectadas.'] },
    ],
};

export const AMENAZAS_DEFAULT = [
    { nombre: 'Hongos foliares', pasos: ['Aplicar fungicida preventivo a base de cobre o azufre.', 'Mejorar la ventilación entre plantas.', 'Eliminar las partes afectadas para evitar propagación.'] },
    { nombre: 'Pulgones', pasos: ['Aplicar jabón potásico diluido al 2% en el envés.', 'Colocar trampas amarillas adhesivas.', 'Repetir el tratamiento cada 3 días.'] },
    { nombre: 'Araña roja', pasos: ['Aumentar la humedad ambiental rociando agua en hojas.', 'Aplicar aceite de neem diluido en agua.', 'Retirar hojas muy afectadas.'] },
];
export const PROBLEMAS_COMUNES = [
    { nombre: 'Hojas amarillas',      pasos: ['Verificar si hay exceso de riego o falta de drenaje.', 'Aplicar fertilizante con nitrógeno si el suelo está pobre.', 'Revisar si hay plagas como pulgones en el envés de las hojas.'] },
    { nombre: 'Hojas secas/quemadas', pasos: ['Aumentar la frecuencia de riego especialmente en época seca.', 'Proteger el cultivo del sol directo con malla sombra si es necesario.', 'Verificar que el sustrato retenga humedad adecuadamente.'] },
    { nombre: 'Cultivo marchito',     pasos: ['Regar inmediatamente si el suelo está muy seco.', 'Si el suelo está húmedo, revisar las raíces por pudrición.', 'Mejorar el drenaje del suelo para evitar encharcamiento.'] },
    { nombre: 'Exceso de agua',       pasos: ['Suspender el riego por 3 a 5 días.', 'Mejorar el drenaje haciendo surcos o levantando el cultivo.', 'Revisar las raíces — si están marrones y blandas hay pudrición.'] },
    { nombre: 'Crecimiento lento',    pasos: ['Aplicar fertilizante balanceado con nitrógeno, fósforo y potasio.', 'Verificar que el pH del suelo esté entre 6 y 7.', 'Asegurarse de que el cultivo reciba suficiente luz solar.'] },
    { nombre: 'Hojas pálidas',        pasos: ['Aplicar fertilizante foliar con hierro y magnesio.', 'Verificar el pH del suelo — si es muy alto bloquea nutrientes.', 'Aumentar la exposición a la luz solar si el cultivo está a la sombra.'] },
    { nombre: 'Tallo débil/caído',    pasos: ['Instalar tutores o estacas para dar soporte al tallo.', 'Reducir el riego y el nitrógeno que favorecen tallos débiles.', 'Aumentar la ventilación y la luz solar alrededor del cultivo.'] },
    { nombre: 'Frutos pequeños',      pasos: ['Aplicar fertilizante con potasio y calcio en la etapa de fructificación.', 'Verificar que el cultivo esté recibiendo suficiente agua.', 'Reducir el número de frutos por planta para concentrar nutrientes.'] },
    { nombre: 'Raíz podrida',         pasos: ['Retirar la planta y revisar las raíces afectadas.', 'Mejorar el drenaje del suelo inmediatamente.', 'Aplicar fungicida a base de cobre al suelo antes de resembrar.'] },
    { nombre: 'Suelo compactado',     pasos: ['Aflojar el suelo con una herramienta alrededor de la planta sin dañar raíces.', 'Incorporar materia orgánica o compost para mejorar la estructura.', 'Reducir el tráfico y la compresión sobre el área de cultivo.'] },
];

/** Devuelve las amenazas conocidas de un cultivo, o una lista generica si no hay match. */
export function getAmenazas(nombreCultivo) {
    return AMENAZAS_POR_CULTIVO[nombreCultivo] || AMENAZAS_DEFAULT;
}
