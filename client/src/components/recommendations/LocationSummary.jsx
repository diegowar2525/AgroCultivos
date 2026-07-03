import { MapPin } from 'lucide-react';

export default function LocationSummary({ zona }) {
    return (
        <div className={`recommendations-location ${zona ? 'recommendations-location--active' : ''}`}>
            <div className="recommendations-location__icon">
                <MapPin size={17} />
            </div>

            <div className="recommendations-location__content">
                <p className="recommendations-location__title">Ubicación automática</p>

                {zona ? (
                    <p className="recommendations-location__zone">
                        📍 {zona.parroquia}, {zona.canton}, {zona.provincia}
                    </p>
                ) : (
                    <p className="recommendations-location__help">
                        Se detecta al presionar el botón
                    </p>
                )}
            </div>
        </div>
    );
}
