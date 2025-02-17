import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react';

export const AddTrackedBill = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();

    return(
        <>
            
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <AddRoundedIcon />
            </IconButton>
            <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            >
                <Box             sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
        <Typography>Add Bill to Track</Typography>
        <Box>
        <TextField variant='filled' />
        </Box>
        <TextField variant='filled'/>
        <Button variant='contained'>Add</Button>

        </Box>

        </Popover>

</>
    )
}