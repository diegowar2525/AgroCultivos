export default function TagEnfermedad({ nombre, activa, onClick }) {
    return (
        <button
            type="button"
            className={`tag-enfermedad ${activa ? 'tag-enfermedad--activa' : ''}`}
            onClick={onClick}
        >
            {nombre}
        </button>
    );
}