export default function SolutionSteps({ title, steps, variant = 'warning', icon = null }) {
    return (
        <div className={`my-harvests-solution my-harvests-solution--${variant}`}>
            <p>
                {icon}
                {title}
            </p>

            {steps.map((step, index) => (
                <div key={`${step}-${index}`} className="my-harvests-solution-step">
                    <span>{index + 1}.</span>
                    <span>{step}</span>
                </div>
            ))}
        </div>
    );
}
