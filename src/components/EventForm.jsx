import React, {useState} from 'react';
import {useRouter} from 'next/router';
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
} from '@mui/material';
import {AccessTime, Add, CalendarToday} from '@mui/icons-material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {toast} from 'react-toastify';

const EventForm = ({
										 initialData = null,
										 onSubmit,
										 loading = false,
										 submitButtonText = 'Create Event'
									 }) => {
	const router = useRouter();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		date: null,
		startTime: null,
		endTime: null,
		...initialData
	});
	const [formErrors, setFormErrors] = useState({});

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

	const handleDateChange = (field) => (newValue) => {
		setFormData(prev => ({
			...prev,
			[field]: newValue
		}));
	};

	const validateForm = () => {
		const errors = {};

		if (!formData.title.trim()) {
			errors.title = 'Title is required';
		} else if (formData.title.length < 3) {
			errors.title = 'Title must be at least 3 characters';
		}

		if (!formData.description.trim()) {
			errors.description = 'Description is required';
		} else if (formData.description.length < 10) {
			errors.description = 'Description must be at least 10 characters';
		}

		if (!formData.date) {
			errors.date = 'Date is required';
		} else if (formData.date < new Date().setHours(0, 0, 0, 0)) {
			errors.date = 'Date cannot be in the past';
		}

		if (!formData.startTime) {
			errors.startTime = 'Start time is required';
		}

		if (!formData.endTime) {
			errors.endTime = 'End time is required';
		} else if (formData.startTime && formData.endTime && formData.endTime <= formData.startTime) {
			errors.endTime = 'End time must be after start time';
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

		const formatTime = time => {
			const hours = time.getHours().toString().padStart(2, '0');
			const minutes = time.getMinutes().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		}

		try {
			const startTime = formatTime(formData.startTime);
			const endTime = formatTime(formData.endTime);

			// await createEvent({...formData, startTime, endTime});
			await onSubmit({...formData, startTime, endTime});

			// Redirect to events page or clear form
			// setTimeout(() => {
			// 	router.push('my-events');
			// }, 1500);

		} catch (err) {
			// console.error('Event creation error:', err);
		}
	};

	const backgroundStyle = {
		minHeight: '100vh',
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		py: 4,
		px: 2,
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Box sx={backgroundStyle}>
				<Container component="main" maxWidth="md">
					<Paper
						elevation={8}
						sx={{
							p: {xs: 3, md: 4},
							borderRadius: 3,
							backgroundColor: 'white',
						}}
					>
						<Typography
							component="h1"
							variant="h4"
							align="center"
							gutterBottom
							sx={{
								fontWeight: 'bold',
								color: 'text.primary',
								mb: 3,
								background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								backgroundClip: 'text',
								WebkitBackgroundClip: 'text',
								// color: 'transparent',
							}}
						>
							{submitButtonText}
						</Typography>

						<Box component="form" onSubmit={handleSubmit}>
							<Stack spacing={3}>
								{/* Title Field */}
								<TextField
									label="Event Title"
									value={formData.title}
									onChange={handleChange('title')}
									error={!!formErrors.title}
									helperText={formErrors.title}
									fullWidth
									variant="outlined"
									placeholder="Enter event title..."
								/>

								{/* Description Field */}
								<TextField
									label="Event Description"
									value={formData.description}
									onChange={handleChange('description')}
									error={!!formErrors.description}
									helperText={formErrors.description}
									multiline
									rows={4}
									fullWidth
									variant="outlined"
									placeholder="Describe your event..."
								/>

								{/* Date Field */}
								<DatePicker
									label="Event Date"
									value={formData.date}
									onChange={handleDateChange('date')}
									minDate={new Date()}
									InputLabelProps={{
										shrink: true,
									}}
									slotProps={{
										textField: {
											fullWidth: true,
											error: !!formErrors.date,
											helperText: formErrors.date,
											InputProps: {
												startAdornment: (
													<InputAdornment position="start">
														<CalendarToday sx={{color: 'text.secondary'}}/>
													</InputAdornment>
												),
											},
										},
									}}
								/>

								{/* Time Fields */}
								<Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
									<Box sx={{flex: 1}}>
										<TimePicker
											label="Start Time"
											value={formData.startTime}
											onChange={handleDateChange('startTime')}
											ampm={false} // 24-hour format
											slotProps={{
												textField: {
													fullWidth: true,
													error: !!formErrors.startTime,
													helperText: formErrors.startTime,
													InputProps: {
														startAdornment: (
															<InputAdornment position="start">
																<AccessTime sx={{color: 'text.secondary'}}/>
															</InputAdornment>
														),
													},
												},
											}}
										/>
									</Box>
									<Box sx={{flex: 1}}>
										<TimePicker
											label="End Time"
											value={formData.endTime}
											onChange={handleDateChange('endTime')}
											ampm={false} // 24-hour format
											slotProps={{
												textField: {
													fullWidth: true,
													error: !!formErrors.endTime,
													helperText: formErrors.endTime,
													InputProps: {
														startAdornment: (
															<InputAdornment position="start">
																<AccessTime sx={{color: 'text.secondary'}}/>
															</InputAdornment>
														),
													},
												},
											}}
										/>
									</Box>
								</Stack>

								{/* Submit Button */}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									size="large"
									disabled={loading}
									sx={{
										py: 1.5,
										fontSize: '1.1rem',
										background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
										'&:hover': {
											background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
											transform: 'translateY(-1px)',
											boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
										},
										'&:disabled': {
											background: 'grey.300',
										},
										transition: 'all 0.3s ease',
									}}
									startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <Add/>}
								>
									{submitButtonText}
								</Button>

								{/* Back to Events Link */}
								<Box textAlign="center">
									<Typography variant="body2" color="text.secondary">
										<Button
											onClick={() => router.push('/events')}
											sx={{
												textTransform: 'none',
												fontWeight: 'bold',
												color: 'primary.main',
												'&:hover': {
													color: 'primary.dark',
													backgroundColor: 'transparent',
												}
											}}
										>
											← Back to Events
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

export default EventForm;