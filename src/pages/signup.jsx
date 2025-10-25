import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {Alert, Box, Button, CircularProgress, Container, Paper, Stack, TextField, Typography,} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {login} from '../store/userSlice';
import {useSignup} from "@/hooks/authservices";
import {toast} from "react-toastify";

const Signup = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const {signup, response, error, loading} = useSignup();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		dob: null,
		password: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		if (response?.status === 'success') {
			toast.success(response.message || 'Account created successfully!');
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
			...prev,
			[field]: event.target.value
		}));
		// Clear field error when user starts typing
		if (formErrors[field]) {
			setFormErrors(prev => ({
				...prev,
				[field]: ''
			}));
		}
	};

	const handleDateChange = (newValue) => {
		setFormData(prev => ({
			...prev,
			dob: newValue
		}));
	};

	const validateForm = () => {
		const errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		}

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Email is invalid';
		}

		if (!formData.dob) {
			errors.dob = 'Date of birth is required';
		}

		if (!formData.password) {
			errors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}

		if (!formData.confirmPassword) {
			errors.confirmPassword = 'Please confirm your password';
		} else if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateForm()) {
			toast.error('Please fix the form errors');
			return;
		}

		try {
			await signup(formData);
		} catch (err) {
			// Error toast is handled by the useEffect above
			// console.error('Signup error:', err);
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Box
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
								fontWeight: '600',
								color: 'primary.main',
								mb: 3,
							}}
						>
							Create Account
						</Typography>

						{error && (
							<Alert severity="error" sx={{mb: 3, borderRadius: 2}}>
								{error}
							</Alert>
						)}

						<Box component="form" onSubmit={handleSubmit}>
							<Stack spacing={3}>
								<TextField
									label="Full Name"
									value={formData.name}
									onChange={handleChange('name')}
									error={!!formErrors.name}
									helperText={formErrors.name}
									fullWidth
								/>

								<TextField
									label="Email Address"
									type="email"
									value={formData.email}
									onChange={handleChange('email')}
									error={!!formErrors.email}
									helperText={formErrors.email}
									fullWidth
								/>

								<DatePicker
									label="Date of Birth"
									value={formData.dateOfBirth}
									onChange={handleDateChange}
									slotProps={{
										textField: {
											fullWidth: true,
											error: !!formErrors.dateOfBirth,
											helperText: formErrors.dateOfBirth,
										},
									}}
								/>

								<TextField
									label="Password"
									type="password"
									value={formData.password}
									onChange={handleChange('password')}
									error={!!formErrors.password}
									helperText={formErrors.password}
									fullWidth
								/>

								<TextField
									label="Confirm Password"
									type="password"
									value={formData.confirmPassword}
									onChange={handleChange('confirmPassword')}
									error={!!formErrors.confirmPassword}
									helperText={formErrors.confirmPassword}
									fullWidth
								/>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									size="large"
									disabled={loading}
									sx={{
										py: 1.5,
										fontSize: '1rem',
										fontWeight: '600',
									}}
								>
									{loading ? <CircularProgress size={24}/> : 'Create Account'}
								</Button>

								<Box textAlign="center">
									<Typography variant="body2" color="secondary.main">
										Already have an account?{' '}
										<Button
											onClick={() => router.push('/login')}
											sx={{
												textTransform: 'none',
												fontWeight: '600',
												color: 'primary.main',
											}}
										>
											Sign In
										</Button>
									</Typography>
								</Box>
							</Stack>
						</Box>
					</Paper>
				</Container>
			</Box>
		</LocalizationProvider>
	);
};

export default Signup;