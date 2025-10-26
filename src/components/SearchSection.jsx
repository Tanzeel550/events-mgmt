import {useState} from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import {AccessTime, CalendarToday, Search} from '@mui/icons-material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const SearchSection = ({submitFilters}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [formData, setFormData] = useState({
		title: '',
		start_date: null,
		end_date: null,
		start_time: null,
		end_time: null,
	});

	const handleInputChange = (field) => (event) => {
		setFormData(prev => ({
			...prev,
			[field]: event.target.value
		}));
	};

	const handleDateChange = (field) => (newValue) => {
		setFormData(prev => ({
			...prev,
			[field]: newValue
		}));
	};

	const formatTime = (time) => {
		if (!time) return '';
		const t = time.toTimeString().split(' ')[0].split(':');
		const hour = t[0], minutes = t[1];
		return `${hour}:${minutes}`;
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			title: formData.title,
			description: formData.description,
			start_date: formData.start_date,
			end_date: formData.end_date,
			start_time: formatTime(formData.start_time),
			end_time: formatTime(formData.end_time)
		};
		submitFilters(data);
	};

	// Responsive background styles
	const backgroundStyle = {
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: isMobile ? 'scroll' : 'fixed',
		py: isMobile ? 4 : 8,
		px: isSmallMobile ? 1 : 2,
		minHeight: '85vh',
		display: 'flex',
		alignItems: 'center',
	};

	// Responsive container styles
	const containerStyle = {
		py: isMobile ? 2 : 4,
		px: isSmallMobile ? 1 : 2,
	};

	// Responsive paper styles
	const paperStyle = {
		p: isSmallMobile ? 2 : isMobile ? 3 : 4,
		borderRadius: 3,
		backgroundColor: 'white',
		mx: isSmallMobile ? 1 : 0,
	};

	// Responsive typography
	const titleVariant = isSmallMobile ? 'h5' : isMobile ? 'h4' : 'h3';

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Box sx={backgroundStyle}>
				<Container maxWidth="lg" sx={containerStyle}>
					<Paper elevation={8} sx={paperStyle}>
						<Typography
							variant={titleVariant}
							component="h1"
							align="center"
							gutterBottom
							sx={{
								fontWeight: 'bold',
								mb: isMobile ? 3 : 4,
								color: 'text.primary',
								fontSize: {
									xs: '1.5rem',
									sm: '2rem',
								}
							}}
						>
							Find What You're Looking For
						</Typography>

						<Box>
							<Stack spacing={isMobile ? 3 : 4}>
								{/* Title Input */}
								<TextField
									label="Title"
									value={formData.title}
									onChange={handleInputChange('title')}
									placeholder="Enter title..."
									fullWidth
									variant="outlined"
									// size={isSmallMobile ? "small" : "medium"}
								/>
								<Box>
									<Typography
										variant={isSmallMobile ? "subtitle1" : "h6"}
										gutterBottom
										sx={{mb: 2, fontWeight: isSmallMobile ? '600' : 'bold'}}
									>
										Date (Range)
									</Typography>
									<Grid container spacing={isSmallMobile ? 1 : 2}>
										<Grid item xs={12} md={6}>
											<DatePicker
												label="Date Begin"
												value={formData.start_date}
												onChange={handleDateChange('start_date')}
												slotProps={{
													textField: {
														fullWidth: true,
														size: isSmallMobile ? "small" : "medium",
														InputProps: {
															startAdornment: (
																<InputAdornment position="start">
																	<CalendarToday
																		sx={{
																			mr: 1,
																			color: 'text.secondary',
																			fontSize: isSmallMobile ? '1rem' : '1.25rem'
																		}}
																	/>
																</InputAdornment>
															)
														}
													},
													popper: {
														placement: isMobile ? 'bottom' : 'bottom-start'
													}
												}}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<DatePicker
												label="Date End"
												value={formData.end_date}
												onChange={handleDateChange('end_date')}
												slotProps={{
													textField: {
														fullWidth: true,
														size: isSmallMobile ? "small" : "medium",
														InputProps: {
															startAdornment: (
																<InputAdornment position="start">
																	<CalendarToday
																		sx={{
																			mr: 1,
																			color: 'text.secondary',
																			fontSize: isSmallMobile ? '1rem' : '1.25rem'
																		}}
																	/>
																</InputAdornment>
															)
														}
													},
													popper: {
														placement: isMobile ? 'bottom' : 'bottom-start'
													}
												}}
											/>
										</Grid>
									</Grid>
								</Box>

								{/* Time Inputs */}
								<Grid container spacing={isSmallMobile ? 1 : 3}>
									<Grid item xs={12} md={6}>
										<TimePicker
											label="Start Time"
											value={formData.start_time}
											onChange={handleDateChange('start_time')}
											ampm={false}
											slotProps={{
												textField: {
													fullWidth: true,
													size: isSmallMobile ? "small" : "medium",
													InputProps: {
														startAdornment: (
															<InputAdornment position="start">
																<AccessTime
																	sx={{
																		mr: 1,
																		color: 'text.secondary',
																		fontSize: isSmallMobile ? '1rem' : '1.25rem'
																	}}
																/>
															</InputAdornment>
														)
													}
												},
												popper: {
													placement: isMobile ? 'bottom' : 'bottom-start'
												}
											}}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TimePicker
											label="End Time"
											value={formData.end_time}
											onChange={handleDateChange('end_time')}
											ampm={false}
											slotProps={{
												textField: {
													fullWidth: true,
													size: isSmallMobile ? "small" : "medium",
													InputProps: {
														startAdornment: (
															<InputAdornment position="start">
																<AccessTime
																	sx={{
																		mr: 1,
																		color: 'text.secondary',
																		fontSize: isSmallMobile ? '1rem' : '1.25rem'
																	}}
																/>
															</InputAdornment>
														)
													}
												},
												popper: {
													placement: isMobile ? 'bottom' : 'bottom-start'
												}
											}}
										/>
									</Grid>
								</Grid>

								{/* Submit Button */}
								<Button
									type="submit"
									variant="contained"
									size={isSmallMobile ? "medium" : "large"}
									fullWidth
									sx={{
										py: isSmallMobile ? 1 : 1.5,
										fontSize: isSmallMobile ? '0.9rem' : '1.1rem',
										backgroundColor: 'primary.main',
										'&:hover': {
											backgroundColor: 'primary.dark'
										}
									}}
									startIcon={<Search sx={{fontSize: isSmallMobile ? '1rem' : '1.25rem'}}/>}
									onClick={handleSubmit}
								>
									Search
								</Button>
							</Stack>
						</Box>
					</Paper>

				</Container>
			</Box>
		</LocalizationProvider>
	);
};

export default SearchSection;