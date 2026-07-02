export default function BarraTop({ pct, index }) {

    return (

        <div className="barra-container">

            <div

                className={`barra-fill top-${index + 1}`}

                style={{

                    width: `${pct}%`

                }}

            />

        </div>

    );

}