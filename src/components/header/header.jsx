import React from 'react';
import { Typography, AppBar, CssBaseline, Toolbar } from '@mui/material';
import Logo from '../../assets/images/logo.png'

const header = () => {

    return (
        <div>
            <CssBaseline />
            <AppBar position='relative' color=''>
                <Toolbar>
                    <img src={Logo} alt="Logo Image" />
                    <Typography variant='h6' sx={{fontWeight:'Bold', color:'#82A70C', fontFamily: '"Montserrat", sans-serif', lineHeight: '1' }} >
                        EMPLOYEE <br />
                        <span style={{color:'#42515F'}}>PAYROLL</span>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default header