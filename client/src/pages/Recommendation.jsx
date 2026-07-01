import { useState, useEffect } from 'react';
import { Search, RotateCcw, Sprout, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import api from '../services/api';

const BG = '#0b1f0e';
const CARD = '#132a17';
const CARD2 = '#1a3820';
const GREEN = '#6fc844';
const GREEN_DIM = 'rgba(111,200,68,0.15)';
const BORDER = 'rgba(111,200,68,0.2)';
const BORDER_SM = 'rgba(111,200,68,0.1)';
const TEXT = '#f0f5ee';
const MUTED = '#8aad7a';
const FONT = "'DM Sans', sans-serif";

const nivelColor = {
    Excelente: { text: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.3)' },
    Buena: { text: '#86efac', bg: 'rgba(134,239,172,0.08)', border: 'rgba(134,239,172,0.2)' },
    Compatible: { text: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)' },
    Baja: { text: '#f87171', bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.2)' },
};

function CompatBar({ value, nivel }) {
    const col = nivelColor[nivel]?.text || GREEN;
    return (
        <div style={{ backgroundColor: GREEN_DIM, borderRadius: 4, height: 6, overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, backgroundColor: col, height: '100%', borderRadius: 4, transition: 'width .6s' }} />
        </div>
    );
}

function EstadoVacio() {
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', maxWidth: 320 }}>
                <div style={{ backgroundColor: GREEN, borderRadius: 20, width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sprout size={34} color="#0b1f0e" strokeWidth={2} />
                </div>
                <div>
                    <h3 style={{ color: TEXT, fontSize: '1.2rem', fontWeight: 600, margin: '0 0 8px' }}>Configura tu búsqueda</h3>
                    <p style={{ color: MUTED, lineHeight: 1.7, fontSize: '0.875rem', margin: 0 }}>
                        Selecciona el tipo de espacio y el ciclo del cultivo que prefieres, luego presiona el botón para ver los mejores cultivos para tu zona.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {[
                        { icon: <MapPin size={15} />, label: 'Tu ubicación' },
                        { icon: <Sprout size={15} />, label: 'Espacio' },
                        { icon: <Clock size={15} />, label: 'Ciclo' },
                        { icon: <Search size={15} />, label: 'Resultados' },
                    ].map(({ icon, label }, i, arr) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <div style={{ backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: '50%', width: 40, height: 40, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {icon}
                                </div>
                                <span style={{ color: MUTED, fontSize: '0.68rem' }}>{label}</span>
                            </div>
                            {i < arr.length - 1 && <span style={{ color: BORDER, marginBottom: 14, fontSize: '1rem' }}>→</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Resultados({ resultados, total, onNueva, onAgregar, agregarLoading, agregarExito, agregarError, setAgregarError }) {
    return (
        <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                    <h2 style={{ color: TEXT, fontSize: '1.15rem', fontWeight: 600, margin: '0 0 2px' }}>Cultivos recomendados</h2>
                    <p style={{ color: MUTED, fontSize: '0.8rem', margin: 0 }}>
                        {resultados.length} cultivos recomendados para tu zona
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <p style={{ color: MUTED, fontSize: '0.75rem', margin: 0 }}>
                        Agregados se guardan en{' '}
                        <span style={{ color: GREEN }}>Mis cultivos</span>
                    </p>
                    <button onClick={onNueva}
                        style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}>
                        <RotateCcw size={14} /> Nueva consulta
                    </button>
                </div>
            </div>

            {agregarError && (
                <div style={{ backgroundColor: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: '0.8rem', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>⚠ {agregarError}</span>
                    <button onClick={() => setAgregarError('')} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: 16 }}>✕</button>
                </div>
            )}

            {resultados.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: MUTED }}>
                    No se encontraron cultivos compatibles con tu ubicación actual.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {resultados.map((c, i) => {
                        const col = nivelColor[c.nivel] || nivelColor.Compatible;
                        const loading = agregarLoading === c.cultivo;
                        const exito = agregarExito?.includes(c.cultivo);

                        return (
                            <div key={i}
                                style={{ backgroundColor: CARD, border: `1px solid ${BORDER_SM}`, borderRadius: 12, padding: 16 }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = BORDER}
                                onMouseLeave={e => e.currentTarget.style.borderColor = BORDER_SM}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                                    <div style={{ flex: 1, paddingRight: 8 }}>
                                        <p style={{ color: TEXT, fontWeight: 600, fontSize: '0.95rem', margin: '0 0 2px' }}>
                                            {c.cultivo}
                                        </p>
                                        <p style={{ color: MUTED, fontSize: '0.7rem', margin: 0 }}>{c.ciclo} · {c.tipo_siembra}</p>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{ color: col.text, fontWeight: 700, fontSize: '1rem', margin: '0 0 3px' }}>{c.score}%</p>
                                        <span style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}`, borderRadius: 20, padding: '1px 8px', fontSize: '0.65rem', fontWeight: 500 }}>{c.nivel}</span>
                                    </div>
                                </div>

                                <CompatBar value={c.score} nivel={c.nivel} />
                                <p style={{ color: MUTED, fontSize: '0.7rem', margin: '7px 0 8px', lineHeight: 1.5 }}>{c.justificacion}</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px', marginBottom: 10 }}>
                                    {[['🌡', c.rango_temp], ['💧', c.rango_humedad], ['🏔', c.rango_altitud], ['🌧', c.rango_precip]].map(([ic, val]) => (
                                        <p key={val} style={{ color: MUTED, fontSize: '0.65rem', margin: 0 }}>{ic} {val}</p>
                                    ))}
                                </div>

                                {exito ? (
                                    <div style={{ width: '100%', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80', borderRadius: 8, backgroundColor: 'rgba(34,197,94,0.1)', padding: '7px 0', fontSize: '0.8rem', textAlign: 'center' }}>
                                        ✓ Agregado a Mis cultivos
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onAgregar(c.cultivo, c.ciclo)}
                                        disabled={loading}
                                        style={{ width: '100%', border: `1px solid ${BORDER}`, color: loading ? MUTED : TEXT, borderRadius: 8, backgroundColor: 'transparent', padding: '7px 0', fontSize: '0.8rem', cursor: loading ? 'wait' : 'pointer', transition: 'all .2s', fontFamily: FONT }}
                                        onMouseEnter={e => { if (!loading) { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.color = GREEN; } }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = loading ? MUTED : TEXT; }}>
                                        {loading ? 'Guardando...' : 'Agregar cultivo'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════
   PÁGINA PRINCIPAL
════════════════════════════════════════════════════════════ */
function getSessionKey() {
    try {
        const token = localStorage.getItem('token');
        return token ? `sigra_recomendaciones_${btoa(token).slice(0, 12)}` : 'sigra_recomendaciones';
    } catch {
        return 'sigra_recomendaciones';
    }
}
const SESSION_KEY = getSessionKey();

export default function Recomendaciones() {
    const navigate = useNavigate();

    const [espacio, setEspacio] = useState('Maceta');
    const [ciclo, setCiclo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [resultado, setResultado] = useState(() => {
        try {
            const saved = sessionStorage.getItem(SESSION_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [agregarExito, setAgregarExitoState] = useState(() => {
        try {
            const saved = sessionStorage.getItem(SESSION_KEY + '_agregados');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [agregarLoading, setAgregarLoading] = useState(null);
    const [agregarError, setAgregarError] = useState('');

    useEffect(() => {
        if (resultado) {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(resultado));
        } else {
            sessionStorage.removeItem(SESSION_KEY);
            sessionStorage.removeItem(SESSION_KEY + '_agregados');
        }
    }, [resultado]);

    function setAgregarExito(lista) {
        setAgregarExitoState(lista);
        sessionStorage.setItem(SESSION_KEY + '_agregados', JSON.stringify(lista));
    }

    const ESPACIOS = ['Maceta', 'Tierra', 'Ambos'];
    const CICLOS = [
        { label: '2 – 3 meses', tipo: 'corto' },
        { label: '3 – 4 meses', tipo: 'medio' },
        { label: 'Más de 4 meses', tipo: 'largo' },
    ];

    async function buscar() {
        setError('');
        setLoading(true);

        try {
            const coords = await new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Tu navegador no soporta geolocalización.'));
                    return;
                }
                navigator.geolocation.getCurrentPosition(
                    pos => resolve(pos.coords),
                    err => {
                        if (err.code === 1) reject(new Error('Permiso de ubicación denegado. Permite el acceso en tu navegador.'));
                        else reject(new Error('No se pudo obtener tu ubicación. Intenta de nuevo.'));
                    },
                    { timeout: 10000, maximumAge: 60000 }
                );
            });

            const res = await api.post('/api/recomendaciones/recomendar-geo/', {
                latitud: parseFloat(coords.latitude.toFixed(6)),
                longitud: parseFloat(coords.longitude.toFixed(6)),
                top_n: 10,
                espacio: espacio,   // 'Maceta', 'Tierra', 'Ambos'
                ciclo: ciclo,     // 'corto', 'medio', 'largo', null
            });

            // ── Guardar zona junto con el resultado ──
            const nuevoResultado = {
                clima: res.data.clima,
                resultados: res.data.resultados,
                predicho: res.data.cultivo_predicho_arbol,
                total: res.data.total_evaluados,
                zona: res.data.zona || null,
            };

            setResultado(nuevoResultado);
            setAgregarExito([]);

        } catch (err) {
            const msg = err.message || err.response?.data?.error || 'Error al obtener recomendaciones.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    async function agregarCultivo(nombreCultivo, cicloCultivo) {
        setAgregarLoading(nombreCultivo);
        setAgregarError('');
        try {
            const res = await api.get(`/api/cultivos/cultivos/?search=${encodeURIComponent(nombreCultivo)}`);
            const lista = res.data.results || res.data;
            const cultivo = lista.find(c => c.nombre === nombreCultivo) || lista[0];
            if (!cultivo) { setAgregarError('Cultivo no encontrado en la base de datos.'); return; }

            const hoy = new Date();
            const dias = cicloCultivo?.includes('corto') ? 75 : cicloCultivo?.includes('medio') ? 105 : 150;
            const cosecha = new Date(hoy.getTime() + dias * 86400000);

            await api.post('/api/cultivos/cultivo-usuario/', {
                cultivo: cultivo.id,
                fecha_siembra: hoy.toISOString().split('T')[0],
                fecha_cosecha_estimada: cosecha.toISOString().split('T')[0],
            });

            setAgregarExito([...agregarExito, nombreCultivo]);

        } catch (err) {
            const detail = err.response?.data;
            const msg = typeof detail === 'object'
                ? Object.entries(detail).map(([k, v]) => `${k}: ${Array.isArray(v) ? v[0] : v}`).join(', ')
                : 'Error al guardar el cultivo.';
            setAgregarError(msg);
        } finally {
            setAgregarLoading(null);
        }
    }

    function nuevaConsulta() {
        setResultado(null);
        setAgregarExitoState([]);
        setAgregarError('');
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY + '_agregados');
    }

    return (
        <div style={{ backgroundColor: BG, fontFamily: FONT, minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', minHeight: 'calc(100vh - 56px)' }}>

                {/* ════ PANEL IZQUIERDO ════ */}
                <div style={{ width: 340, flexShrink: 0, borderRight: `1px solid ${BORDER_SM}`, padding: '28px 22px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h2 style={{ color: TEXT, fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Buscar cultivos</h2>

                    {/* ── Ubicación: muestra zona detectada si existe ── */}
                    <div style={{ backgroundColor: CARD, border: `1px solid ${resultado?.zona ? 'rgba(111,200,68,0.4)' : BORDER}`, borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, transition: 'border-color .3s' }}>
                        <div style={{ backgroundColor: GREEN_DIM, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <MapPin size={17} color={GREEN} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <p style={{ color: TEXT, fontSize: '0.875rem', fontWeight: 500, margin: '0 0 2px' }}>Ubicación automática</p>
                            {resultado?.zona ? (
                                <p style={{ color: GREEN, fontSize: '0.75rem', margin: 0, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    📍 {resultado.zona.parroquia}, {resultado.zona.canton}, {resultado.zona.provincia}
                                </p>
                            ) : (
                                <p style={{ color: MUTED, fontSize: '0.75rem', margin: 0 }}>Se detecta al presionar el botón</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div style={{ backgroundColor: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: '0.8rem', lineHeight: 1.5 }}>
                            ⚠ {error}
                        </div>
                    )}

                    <div>
                        <label style={{ color: TEXT, fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Tipo de espacio</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                            {ESPACIOS.map(e => (
                                <button key={e} onClick={() => setEspacio(e)}
                                    style={{ backgroundColor: espacio === e ? GREEN_DIM : CARD, border: `1px solid ${espacio === e ? GREEN : BORDER}`, color: espacio === e ? GREEN : MUTED, borderRadius: 10, padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s', fontFamily: FONT }}>
                                    <Sprout size={18} color={espacio === e ? GREEN : MUTED} />
                                    {e}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ color: TEXT, fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Ciclo del cultivo</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                            {CICLOS.map(({ label, tipo }) => (
                                <button key={tipo} onClick={() => setCiclo(tipo)}
                                    style={{ backgroundColor: ciclo === tipo ? GREEN_DIM : CARD, border: `1px solid ${ciclo === tipo ? GREEN : BORDER}`, color: ciclo === tipo ? GREEN : MUTED, borderRadius: 10, padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s', fontFamily: FONT }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={14} /> {label}</span>
                                    <span style={{ fontSize: '0.7rem', color: ciclo === tipo ? GREEN : '#6a9460' }}>{tipo}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={buscar} disabled={loading}
                        style={{ backgroundColor: loading ? 'rgba(111,200,68,0.4)' : GREEN, color: '#0b1f0e', borderRadius: 10, width: '100%', padding: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, fontFamily: FONT, transition: 'background .2s' }}>
                        {loading
                            ? <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#0b1f0e', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />Buscando...</>
                            : <><Search size={16} /> Obtener recomendaciones</>
                        }
                    </button>

                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>

                {/* ════ PANEL DERECHO ════ */}
                {resultado ? (
                    <Resultados
                        resultados={resultado.resultados}
                        total={resultado.total}
                        onNueva={nuevaConsulta}
                        onAgregar={agregarCultivo}
                        agregarLoading={agregarLoading}
                        agregarExito={agregarExito}
                        agregarError={agregarError}
                        setAgregarError={setAgregarError}
                    />
                ) : (
                    <EstadoVacio />
                )}
            </div>
        </div>
    );
}