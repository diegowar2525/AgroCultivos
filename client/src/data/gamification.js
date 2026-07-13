import {
    Sprout, Leaf, TrendingUp, Award, Trophy,
    CheckCircle, Zap, Star, Target, Medal,
} from 'lucide-react';

/**
 * Sistema de niveles e insignias de la gamificacion 'Mis Cosechas'.
 * Extraido de MisCosechas.jsx: es configuracion/reglas de negocio del
 * juego, no logica de la pagina en si, asi que vive aparte.
 */
export const LEVELS = [
    { nivel: 1, nombre: 'Aprendiz', min: 0, max: 0, icon: Sprout, color: '#8aad7a', desc: 'Estás comenzando tu camino agrícola.' },
    { nivel: 2, nombre: 'Agricultor', min: 1, max: 2, icon: Leaf, color: '#d9c66b', desc: 'Ya tienes tu primera cosecha completada.' },
    { nivel: 3, nombre: 'Cultivador', min: 3, max: 5, icon: TrendingUp, color: '#34d399', desc: 'Dominas el ciclo básico de cultivo.' },
    { nivel: 4, nombre: 'Experto', min: 6, max: 9, icon: Award, color: '#60a5fa', desc: 'Tu experiencia en el campo es notable.' },
    { nivel: 5, nombre: 'Maestro Agrícola', min: 10, max: 999, icon: Trophy, color: '#fbbf24', desc: '¡Eres un referente en agricultura inteligente!' },
];

export function getLevel(completados) {
    return LEVELS.find(n => completados >= n.min && completados <= n.max) || LEVELS[0];
}
export function getNextLevel(completados) {
    const idx = LEVELS.findIndex(n => completados >= n.min && completados <= n.max);
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}
export function calculateBadges(cultivos) {
    const completados = cultivos.filter(c => c.estado_nombre === 'Completado').length;
    const nombres = [...new Set(cultivos.map(c => c.cultivo_nombre))];
    const activos = cultivos.filter(c => c.estado_nombre === 'Activo').length;
    return [
        { id: 'primera', nombre: 'Primera Cosecha', desc: 'Completa tu primer cultivo', icon: CheckCircle, color: '#d9c66b', desbloqueada: completados >= 1, progreso: Math.min(completados, 1), meta: 1 },
        { id: 'activo3', nombre: 'Agricultor Activo', desc: 'Ten 3 cultivos simultáneos', icon: Zap, color: '#fbbf24', desbloqueada: activos >= 3, progreso: Math.min(activos, 3), meta: 3 },
        { id: 'experto5', nombre: 'Cosechador Experto', desc: 'Completa 5 cultivos', icon: Star, color: '#34d399', desbloqueada: completados >= 5, progreso: Math.min(completados, 5), meta: 5 },
        { id: 'variedad', nombre: 'Diversidad', desc: 'Cultiva 3 tipos distintos', icon: Target, color: '#a78bfa', desbloqueada: nombres.length >= 3, progreso: Math.min(nombres.length, 3), meta: 3 },
        { id: 'maestro10', nombre: 'Maestro Agrícola', desc: 'Completa 10 cultivos', icon: Trophy, color: '#fbbf24', desbloqueada: completados >= 10, progreso: Math.min(completados, 10), meta: 10 },
        { id: 'productor5', nombre: 'Gran Productor', desc: 'Ten 5 cultivos simultáneos', icon: Medal, color: '#f97316', desbloqueada: activos >= 5, progreso: Math.min(activos, 5), meta: 5 },
    ];
}
