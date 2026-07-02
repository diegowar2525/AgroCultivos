/** Círculo con la inicial del nombre/usuario, usado en la barra lateral del perfil. */
export default function Avatar({ user, size = 72 }) {
    const inicial = (user.first_name?.charAt(0) || user.username?.charAt(0) || 'U').toUpperCase();

    return (
        <div className="profile-avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>
            {inicial}
        </div>
    );
}
