export const styles = {
    container: (isCircleBadge: boolean, backgroundColor: string | undefined) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: isCircleBadge ? '20px' : '26px',
        height: isCircleBadge ? '20px' : 'auto',
        minHeight: isCircleBadge ? '20px' : 'auto',
        borderRadius: isCircleBadge ? '50%' : 0,
        backgroundColor: backgroundColor || 'transparent',
        textDecoration: 'none',
        textUnderline: 'none'
    }),
    letter: (isCircleBadge: boolean, partyColor: string) => ({
        color: isCircleBadge ? '#fff' : partyColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isCircleBadge ? '100%' : 'auto',
        height: isCircleBadge ? '100%' : 'auto',
        lineHeight: 1,
    }),
};