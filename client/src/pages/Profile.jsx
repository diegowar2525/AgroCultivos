import Navbar from '../components/layout/Navbar';
import { useProfile } from '../hooks/useProfile';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileDetails from '../components/profile/ProfileDetails';
import ProfileEditForm from '../components/profile/ProfileEditForm';

export default function Profile() {
    const {
        user,
        editando,
        setEditando,
        actividades,
        eliminando,
        handleEliminarCuenta,
    } = useProfile();

    if (!user) return null;

    return (
        <div className="profile-page">
            <Navbar />

            {editando ? (
                <ProfileEditForm user={user} onCancel={() => setEditando(false)} />
            ) : (
                <div className="profile-layout">
                    <ProfileSidebar user={user} actividades={actividades} />
                    <ProfileDetails
                        user={user}
                        onEdit={() => setEditando(true)}
                        onEliminarCuenta={handleEliminarCuenta}
                        eliminando={eliminando}
                    />
                </div>
            )}
        </div>
    );
}
