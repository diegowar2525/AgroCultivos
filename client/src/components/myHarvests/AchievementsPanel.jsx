import { Lock } from 'lucide-react';

import { calculateBadges, getLevel, getNextLevel, LEVELS } from '../../data/gamification';

export default function AchievementsPanel({ harvests }) {
    const completed = harvests.filter(harvest => harvest.estado_nombre === 'Completado').length;
    const currentLevel = getLevel(completed);
    const nextLevel = getNextLevel(completed);
    const badges = calculateBadges(harvests);
    const LevelIcon = currentLevel.icon;
    const levelProgress = nextLevel
        ? Math.round(((completed - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
        : 100;

    return (
        <div className="my-harvests-achievements">
            <section
                className="my-harvests-side-card my-harvests-level-card"
                style={{ '--achievement-color': currentLevel.color, '--level-progress': `${levelProgress}%` }}
            >
                <p className="my-harvests-side-card__eyebrow">Tu nivel</p>

                <div className="my-harvests-level-card__summary">
                    <div className="my-harvests-level-card__icon">
                        <LevelIcon size={24} />
                    </div>

                    <div>
                        <h2>{currentLevel.nombre}</h2>
                        <p>{currentLevel.desc}</p>
                    </div>
                </div>

                {nextLevel ? (
                    <>
                        <div className="my-harvests-level-card__progress-meta">
                            <span>Próximo: {nextLevel.nombre}</span>
                            <strong>{completed}/{nextLevel.min}</strong>
                        </div>

                        <div className="my-harvests-level-progress">
                            <div className="my-harvests-level-progress__fill" />
                        </div>
                    </>
                ) : (
                    <div className="my-harvests-level-max">
                        <p>¡Nivel máximo alcanzado!</p>
                    </div>
                )}

                <div className="my-harvests-level-list">
                    {LEVELS.map(level => {
                        const Icon = level.icon;
                        const isActive = level.nivel === currentLevel.nivel;
                        const isPast = level.nivel < currentLevel.nivel;

                        return (
                            <div
                                key={level.nivel}
                                title={level.nombre}
                                className={`my-harvests-level-item ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                                style={{ '--achievement-color': level.color }}
                            >
                                <div className="my-harvests-level-item__icon">
                                    <Icon size={13} />
                                </div>
                                <span>{level.nombre}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="my-harvests-side-card my-harvests-badges-card">
                <div className="my-harvests-badges-card__header">
                    <p className="my-harvests-side-card__eyebrow">Insignias</p>
                    <span>{badges.filter(badge => badge.desbloqueada).length}/{badges.length}</span>
                </div>

                <div className="my-harvests-badge-list">
                    {badges.map(badge => {
                        const BadgeIcon = badge.icon;
                        const progress = Math.round((badge.progreso / badge.meta) * 100);

                        return (
                            <article
                                key={badge.id}
                                className={`my-harvests-badge ${badge.desbloqueada ? 'is-unlocked' : ''}`}
                                style={{ '--achievement-color': badge.color, '--badge-progress': `${progress}%` }}
                            >
                                <div className="my-harvests-badge__icon">
                                    <BadgeIcon size={16} />
                                </div>

                                <div className="my-harvests-badge__content">
                                    <div className="my-harvests-badge__title-row">
                                        <h3>{badge.nombre}</h3>
                                        {badge.desbloqueada ? (
                                            <span>¡Obtenida!</span>
                                        ) : (
                                            <small>{badge.progreso}/{badge.meta}</small>
                                        )}
                                    </div>

                                    <p>{badge.desc}</p>

                                    {!badge.desbloqueada && (
                                        <div className="my-harvests-badge-progress">
                                            <div className="my-harvests-badge-progress__fill" />
                                        </div>
                                    )}
                                </div>

                                {!badge.desbloqueada && <Lock size={12} className="my-harvests-badge__lock" />}
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
