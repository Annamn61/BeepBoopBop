import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

interface MeasurePillProps {
    title: string,
}

const MeasurePill = ({title} : MeasurePillProps) => {
    // const measureColor = getMeasureColor()

    return (
        <Box sx={{ backgroundColor: 'salmon', padding: '0px 16px', borderRadius: '16px', width: '70px', textAlign: 'center'}}>   
            <Typography sx={{color: 'white'}}>{title}</Typography>
        </Box>
    )
}

export default MeasurePill;