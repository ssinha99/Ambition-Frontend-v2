import { Button, styled } from "@mui/material";

const PrimaryButton = styled(Button)(() => ({
    background: '#6B9080',
    borderRadius: '8px',
    textTransform: 'none',  
    margin: '5px',
    '&:hover': {
        background: '#6B9080'
    }
}))

export default PrimaryButton