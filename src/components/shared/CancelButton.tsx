import { Button, styled } from '@mui/material'

const CancelButton= styled(Button)(() => ({
    color: '#6B9080', 
    borderColor: '#6B9080',
    borderRadius: '8px', 
    textTransform: 'none', 
    margin: '5px',
    '&:hover': {
        borderColor: '#6B9080'
    }
}))

export default CancelButton