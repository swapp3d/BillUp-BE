'use client';

import React, { useState } from 'react';
import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormInputs } from './types';
import { validationSchema } from './validation';
import {
    MainBoxStyles,
    ButtonStyles,
    ErrorFieldStyles,
    ContainerStyles,
} from './styles';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import LoadingProgress from '@/components/LoadingProgress/LoadingProgress';
import { BackgroundBox } from '@/components/BackgroundBox/BackgroundBox';
import { HOME_PATH, REGISTER_PATH } from '@/utils/routes';
import Link from 'next/link';

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuthentication();
    const { error, handleError, clearError } = useErrorHandler();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const handleLogin = async (data: LoginFormInputs) => {
        setLoading(true);
        try {
            const success = await login(data);
            if (success) router.push(HOME_PATH);
        } catch (err: unknown) {
            handleError(err);
            setTimeout(() => {
                clearError();
            }, 4000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={ContainerStyles}>
            <CssBaseline />
            <Box sx={MainBoxStyles}>
                <Typography variant="h4" textAlign="center" fontSize="40px">
                    Welcome to BillUp
                </Typography>
                <Typography variant="body2" textAlign="center" sx={{ mb: 2}}>
                    A simplified central bill paying applications, no need to go thru different applications
                </Typography>
                <Typography component="p" textAlign="center" sx={{ mb: 2 }}>
                    Sign in with your email address
                </Typography>

                <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        placeholder="e.g., name@marsterpiece.com"
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {error && <Typography sx={ErrorFieldStyles}>{error}</Typography>}

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="body2">Dont have an account?</Typography>
                        <Link href={REGISTER_PATH} style={{ color: 'gray', textDecoration: 'underline' }}>
                            Register
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        sx={ButtonStyles}
                    >
                        {loading ? (
                            <LoadingProgress
                                text="Signing In..."
                                spinnerColor="#A8A8A8"
                                size="20px"
                                fontSize="14px"
                            />
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </Box>
            </Box>
            <BackgroundBox />
        </Container>
    );
};

export default LoginPage;