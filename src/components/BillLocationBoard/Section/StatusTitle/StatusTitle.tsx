import './StatusTitle.css'

interface StatusTitleProps {
    title: string,
}

const StatusTitle = ({title}: StatusTitleProps) => {
    return (
        <div className="status-title-container">
            <div className="status-title">{title}</div>
            <div className="status-divider" />
        </div>
    );
}

export default StatusTitle;