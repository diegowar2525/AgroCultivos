export default function AuthLayout({
    children,
    subtitle
}) {
    return (
        <div className="auth-layout">

            <div className="auth-blob blob-top"></div>
            <div className="auth-blob blob-bottom"></div>

            <div className="auth-container">

                <div className="auth-header">

                    <div className="auth-logo">
                        🌱
                    </div>

                    <h1 className="auth-title">
                        Agro<span>Cultivos</span>
                    </h1>

                    <p className="auth-subtitle">
                        {subtitle}
                    </p>

                </div>

                {children}

            </div>

        </div>
    );
}