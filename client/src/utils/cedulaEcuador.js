/**
 * Validación de cédula ecuatoriana (Módulo 10 del Registro Civil).
 * Replica EXACTAMENTE el algoritmo del backend
 * (apps/usuarios/utils.py -> validar_cedula_ec) para dar feedback
 * inmediato en el formulario sin esperar la respuesta del servidor.
 */
export function validarCedulaEC(cedula) {
    if (!cedula || cedula.trim() === '') {
        return { valida: false, mensaje: 'El campo de cédula no puede estar vacío.' };
    }
    if (!/^\d+$/.test(cedula)) {
        return { valida: false, mensaje: 'La cédula solo debe contener números.' };
    }
    if (cedula.length !== 10) {
        return { valida: false, mensaje: 'La cédula debe tener exactamente 10 dígitos.' };
    }

    const provincia = parseInt(cedula.slice(0, 2), 10);
    if (provincia < 1 || (provincia > 24 && provincia !== 30)) {
        return { valida: false, mensaje: 'El código de provincia (los dos primeros dígitos) es inválido.' };
    }

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let total = 0;
    for (let i = 0; i < coeficientes.length; i++) {
        let valor = parseInt(cedula[i], 10) * coeficientes[i];
        if (valor >= 10) valor -= 9;
        total += valor;
    }
    const verificador = (10 - (total % 10)) % 10;

    if (verificador !== parseInt(cedula[9], 10)) {
        return { valida: false, mensaje: 'El dígito verificador es incorrecto. Cédula no válida.' };
    }

    return { valida: true, mensaje: '' };
}
