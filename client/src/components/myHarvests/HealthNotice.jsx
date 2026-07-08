import { AlertTriangle, CircleCheck, Eye } from 'lucide-react';
import { HEALTH_NOTICE } from '../../constants/healthStatus';

const NOTICE_ICONS = {
    bien: CircleCheck,
    observacion: Eye,
    amenaza: AlertTriangle,
};

export default function HealthNotice({ type }) {
    const notice = HEALTH_NOTICE[type];
    const Icon = NOTICE_ICONS[type] || CircleCheck;

    if (!notice) return null;

    return (
        <div className={`my-harvests-health-notice my-harvests-health-notice--${type}`}>
            <p>
                <Icon size={13} />
                {notice.title}
            </p>

            <span>
                {notice.lines.map(line => (
                    <span key={line}>• {line}<br /></span>
                ))}
            </span>
        </div>
    );
}