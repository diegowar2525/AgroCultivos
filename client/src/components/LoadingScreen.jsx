import React from 'react';

export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-plant">
                    🌱
                </div>

                <span>
                    Cargando . . .
                </span>
            </div>
        </div>
    );
}