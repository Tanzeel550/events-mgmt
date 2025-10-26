import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
	IconButton
} from '@mui/material';
import {useLogin} from "@/hooks/authservices";
import {login} from '../store/userSlice';
import {toast} from "react-toastify";
import {Lock, Visibility, VisibilityOff} from '@mui/icons-material';

const Login = () => {
	const router = useRouter();
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

	useEffect(() => {
		if (isLoggedIn) router.push('/');
	}, [])

	const dispatch = useDispatch();
	const {sendReq, response, error, loading} = useLogin();

	const [formData, setFormData] = useState({
		email: '', password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		if (response?.status === 'success') {
			toast.success(response.message || 'Login successful!');
			dispatch(login(response.data.user));
			router.push('/');
		}
	}, [response, dispatch, router]);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const handleChange = (field) => (event) => {
		setFormData(prev => ({
			...prev, [field]: event.target.value
		}));
		// Clear field error when user starts typing
		if (formErrors[field]) {
			setFormErrors(prev => ({
				...prev, [field]: ''
			}));
		}
	};

	const validateForm = () => {
		const errors = {};

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Email is invalid';
		}

		if (!formData.password) {
			errors.password = 'Password is required';
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateForm()) return;

		try {
			await sendReq(formData);
		} catch (err) {
			// Error is handled by the hook
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (<Box
			sx={{
				minHeight: '100vh',
				backgroundColor: '#f8fafc',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				py: 4,
				px: 2,
			}}
		>
			<Container component="main" maxWidth="sm">
				<Paper
					elevation={0}
					sx={{
						p: 4,
						borderRadius: 2,
						backgroundColor: '#ffffff',
						boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
						border: '1px solid #e5e7eb',
					}}
				>
					<Typography
						component="h1"
						variant="h4"
						align="center"
						gutterBottom
						sx={{
							fontWeight: '600', color: 'primary.main', mb: 3,
						}}
					>
						Welcome Back
					</Typography>

					<Box>
						<Stack spacing={3}>
							<TextField
								label="Email Address"
								type="email"
								value={formData.email}
								onChange={handleChange('email')}
								error={!!formErrors.email}
								helperText={formErrors.email}
								fullWidth
							/>

							<TextField
								label="Password"
								type={showPassword ? 'text' : 'password'}
								value={formData.password}
								onChange={handleChange('password')}
								error={!!formErrors.password}
								helperText={formErrors.password}
								fullWidth
								InputProps={{
									startAdornment: (<InputAdornment position="start">
											<Lock sx={{color: 'text.secondary'}}/>
										</InputAdornment>), endAdornment: (<InputAdornment position="end">
											<IconButton onClick={handleClickShowPassword} edge="end">
												{showPassword ? <VisibilityOff/> : <Visibility/>}
											</IconButton>
										</InputAdornment>),
								}}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								size="large"
								onClick={handleSubmit}
								disabled={loading}
								sx={{
									py: 1.5, fontSize: '1rem', fontWeight: '600',
								}}
							>
								{loading ? <CircularProgress size={24}/> : 'Log In'}
							</Button>

							<Box textAlign="center">
								<Typography variant="body2" color="secondary.main">
									Don't have an account?{' '}
									<Button
										onClick={() => router.push('/signup')}
										sx={{
											textTransform: 'none', fontWeight: '600', color: 'primary.main',
										}}
									>
										Create Account
									</Button>
								</Typography>
							</Box>
						</Stack>
					</Box>
				</Paper>
			</Container>
		</Box>);
};

export default Login;