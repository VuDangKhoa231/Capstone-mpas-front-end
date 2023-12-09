import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { loginUser } from '../../api/login';
import ToastMessage from '../../Layout/ToastMessage';
import { Scale } from '@mui/icons-material';
const schema = yup.object().shape({
    username: yup.string().required('username là bắt buộc'),
    password: yup.string().required('Mật khẩu là bắt buộc'),
});

export default function LoginComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (e) => {
        const data = {
            id: getValues('username'),
            password: getValues('password'),
        }
        loginUser(data, dispatch, navigate)
    };

    return (
        <Box sx={{ backgroundColor: "#6EC2F7", width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

            <Grid container width={'100%'} height={'100%'} alignContent={'center'} textAlign={'center'} display={'flex'} >
                <Grid item xs={6} color='white'>
                    <Typography variant='h3'> Chào Mừng Đến</Typography>
                    <Box>
                        <img src='../image/Parking-rafiki.png' width={'75%'} style={{transform: 'scale(1.3)'}}/>
                    </Box>

                    <Typography variant='h3'> PARCO</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5} display={'flex'} justifyContent={'center'} margin={'auto'}>
                    <Paper elevation={8} sx={{ p: '20px', height: '600px', borderRadius: '10px', width: '60%', }}>
                        <Box sx={{ height: '200px' }} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                            <img src='../image/logo.png' width={'20%'} />
                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                sx={{ mt: '20px' }}
                                variant="outlined"
                                label="Tên đăng nhập"

                                {...register('username')}
                                error={!!errors.username}
                                helperText={errors.username ? errors.username.message : ''}
                            />

                            <TextField
                                fullWidth
                                sx={{ mt: '20px' }}
                                variant="outlined"
                                label="Mật khẩu"
                                type="password"
                                {...register('password')}
                                error={!!errors.password}

                                helperText={errors.password ? errors.password.message : ''}
                            />
                            {user.login.isFetching ? (
                                <Button fullWidth sx={{ mt: '50px' }} variant="contained" color="primary" disabled>
                                    <CircularProgress size={'25px'} />
                                </Button>
                            ) : (
                                <Button fullWidth sx={{ mt: '50px' }} type="submit" variant="contained" color="primary">
                                    Đăng nhập
                                </Button>
                            )}

                        </form>
                             
                        <Box mt={'30px'}>
                            {user?.login.error && user?.login.error === 1 ?
                                <Alert severity="error">Đây không phải là tài khoản Admin</Alert>
                                :
                                user?.login.error === 2 ?
                                    <Alert severity="error">Sai tài khoản hoặc mật khẩu</Alert>
                                    : <div style={{ height: '49px' }}></div>
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
