export default function StatCard({

    icon,

    label,

    value,

    sub,

}) {

    return (

        <div className="stat-card">

            <div className="stat-card-header">

                <div className="stat-card-icon">

                    {icon}

                </div>

                <span className="stat-card-label">

                    {label}

                </span>

            </div>

            <h2 className="stat-card-value">

                {value}

            </h2>

            {sub && (

                <p className="stat-card-sub">

                    {sub}

                </p>

            )}

        </div>

    );

}