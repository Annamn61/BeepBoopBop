import './GroupTitle.css'

interface GroupTitleProps {
    group: any, //TODO: Fix any
}

const GroupTitle = ({group}: GroupTitleProps) => {
    return (
        <div className="group-title-container">
        <div className="group-title">{group.group}</div>
        <div className="group-name-divider"/>
    </div>
    );
}

export default GroupTitle;