import './SectionHeader.css'

interface SectionHeaderProps {
    title: string,
    billCount: number,
}

const SectionHeader = ({title, billCount}: SectionHeaderProps) => {
    return (
        <div className="section-header-container">
            <div className="section-header-title">{title}</div>
            <div className="section-header-count">{billCount}</div>
        </div>
    );
}

export default SectionHeader;