import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Sprout, Thermometer, Droplets,
    Mountain, Sun, Clock, Leaf, Bug, Flame,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { useCropInfo } from '../hooks/useCropInfo';
import SectionTitle from '../components/cropInfo/SectionTitle';
import RowInfo from '../components/cropInfo/RowInfo';
import DiseaseTag from '../components/cropInfo/DeseaseTag';

const CUIDADOS_GENERALES = [
    'Revisar semanalmente por señales de plagas o enfermedades.',
    'Rotar cultivos cada temporada para mantener la salud del suelo.',
    'Cosechar en la mañana para mejor calidad y sabor del producto.',
    'Mantener el riego constante sin encharcar el suelo.',
    'Registrar el crecimiento del cultivo en Mis Cosechas para un mejor seguimiento.',
];

export default function CropInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cultivo, especificacion, extra, imagenUrl, loading, error } = useCropInfo(id);
    const [enfActiva, setEnfActiva] = useState(null);

    if (loading) {
        return (
            <div className="info-cultivo-page">
                <Navbar />
                <p className="info-cultivo-loading">Cargando información del cultivo...</p>
            </div>
        );
    }

    if (error || !cultivo) {
        return (
            <div className="info-cultivo-page">
                <Navbar />
                <p className="info-cultivo-error">{error || 'Cultivo no encontrado.'}</p>
            </div>
        );
    }

    const enfermedades = extra?.enfermedades || [];
    const enfSeleccionada = enfActiva !== null ? enfermedades[enfActiva] : null;

    const filasClima = especificacion ? [
        { icon: Thermometer, label: 'Temperatura', val: `${especificacion.temperatura_min}°C – ${especificacion.temperatura_max}°C` },
        { icon: Droplets, label: 'Humedad', val: `${especificacion.humedad_min}% – ${especificacion.humedad_max}%` },
        { icon: Mountain, label: 'Altitud', val: `${especificacion.altitud_min} – ${especificacion.altitud_max} msnm` },
        { icon: Sun, label: 'Radiación solar', val: `${especificacion.radiacion_min} – ${especificacion.radiacion_max} MJ/m²` },
        { icon: Droplets, label: 'Precipitación', val: `${especificacion.precipitacion_min} – ${especificacion.precipitacion_max} mm/año` },
        { icon: Sun, label: 'Horas de sol', val: `${especificacion.horas_sol} h/día` },
    ] : [];

    return (
        <div className="info-cultivo-page">
            <Navbar />
            <div className="info-cultivo-container">
                <button className="info-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Volver
                </button>

                <div className="info-cultivo-layout">
                    {/* Columna izquierda */}
                    <div className="info-cultivo-col">
                        <div className="info-card info-cultivo-imagen">
                            {imagenUrl ? (
                                <img
                                    src={imagenUrl}
                                    alt={cultivo.nombre}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            ) : (
                                <>
                                    <Sprout size={44} color="rgba(111,200,68,0.25)" />
                                    <span className="info-cultivo-imagen-placeholder">Imagen del cultivo</span>
                                </>
                            )}
                        </div>

                        <div className="info-card">
                            <h1 className="info-cultivo-nombre">{cultivo.nombre}</h1>
                            {extra?.cientifico && <p className="info-cultivo-cientifico">{extra.cientifico}</p>}
                            {cultivo.categoria_nombre && (
                                <span className="info-cultivo-categoria">{cultivo.categoria_nombre}</span>
                            )}
                        </div>

                        <div className="info-card">
                            <SectionTitle icon={Sprout} titulo="Información general" />
                            <div className="info-fila-lista">
                                <RowInfo icon={Clock} label="Tiempo de cosecha" valor={`${cultivo.tiempo_cosecha} días`} />
                                <RowInfo icon={Droplets} label="Frecuencia de riego" valor={extra?.riego?.frecuencia} detalle={extra?.riego?.detalle} />
                                <RowInfo icon={Leaf} label="Abono recomendado" valor={extra?.abono?.tipo} detalle={extra?.abono?.detalle} />
                                <RowInfo icon={Thermometer} label="Temperatura ideal" valor={extra?.temp} />
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="info-cultivo-col">
                        <div className="info-card">
                            <SectionTitle icon={Sprout} titulo="Descripción" />
                            <p className="info-cultivo-descripcion">
                                {cultivo.descripcion || 'Sin descripción disponible.'}
                            </p>
                        </div>

                        {especificacion && (
                            <div className="info-card">
                                <SectionTitle icon={Thermometer} titulo="Requerimientos climáticos" />
                                <div className="clima-grid">
                                    {filasClima.map(({ icon: Icon, label, val }) => (
                                        <div className="clima-fila" key={label}>
                                            <span className="clima-fila-label"><Icon size={13} /> {label}</span>
                                            <span className="clima-fila-valor">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="info-card">
                            <SectionTitle icon={Bug} titulo="Enfermedades frecuentes" />
                            <div className="tags-enfermedades">
                                {enfermedades.map((enf, i) => (
                                    <DiseaseTag
                                        key={enf.nombre}
                                        nombre={enf.nombre}
                                        activa={enfActiva === i}
                                        onClick={() => setEnfActiva(enfActiva === i ? null : i)}
                                    />
                                ))}
                            </div>

                            {enfSeleccionada && (
                                <div className="enfermedad-detalle">
                                    <p className="enfermedad-detalle-titulo">
                                        <Flame size={13} /> Cómo tratarla: {enfSeleccionada.nombre}
                                    </p>
                                    <p className="enfermedad-detalle-texto">{enfSeleccionada.cuidado}</p>
                                </div>
                            )}
                        </div>

                        <div className="info-card">
                            <SectionTitle icon={Leaf} titulo="Cuidados generales" />
                            <div className="cuidados-lista">
                                {CUIDADOS_GENERALES.map((texto) => (
                                    <div className="cuidado-item" key={texto}>
                                        <span className="cuidado-check">✓</span>
                                        <span>{texto}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}