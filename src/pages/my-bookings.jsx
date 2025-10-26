import React, {useEffect} from 'react';
import {Box, Button, Card, CardContent, Chip, Container, IconButton, Skeleton, Stack, Typography,} from '@mui/material';
import {AccessTime, CalendarToday, Delete, Event, Person} from '@mui/icons-material';
import Loader from "@/components/utils/Loader";
import {useDeleteMyBooking, useGetMyBookings} from "@/hooks/bookingService";

const MyBookings = () => {
	const router = useRouter();
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

	useEffect(() => {
		if (!isLoggedIn) router.push('/login');
	}, [])

	const {bookings, loading, error} = useGetMyBookings();

/*
	useEffect(() => {
		console.log(bookings);
	}, [bookings]);
*/

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const formatTime = (timeString) => {
		return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	};

	const handleDeleteBooking = async (bookingId) => {
		if (window.confirm('Are you sure you want to cancel this booking?')) {
			try {
				const res = await useDeleteMyBooking(bookingId);
				if (res) {
					const elem = document.getElementById(`booking-${bookingId}`);
					elem.classList.add('hide');
					setTimeout(() => elem.remove(), 500);
				}
			} catch (error) {
			}
		}
	};

	if (loading) return <Loader/>

	if (error) {
		return (
			<Box
				sx={{
					minHeight: '100vh',
					backgroundColor: '#f8fafc',
					py: 4,
					px: 2,
				}}
			>
				<Container>
					<Typography color="error" align="center">
						Failed to load bookings
					</Typography>
				</Container>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				backgroundColor: '#f8fafc',
				py: 4,
				px: 2,
			}}
		>
			<Container maxWidth="lg">
				{/* Header */}
				<Box sx={{mb: 4, textAlign: 'center'}}>
					<Typography
						variant="h3"
						component="h1"
						sx={{
							fontWeight: '600',
							color: 'primary.main',
							mb: 2,
						}}
					>
						My Bookings
					</Typography>
					<Typography
						variant="h6"
						color="secondary.main"
						sx={{mb: 3}}
					>
						Manage your event bookings
					</Typography>
				</Box>

				{/* Bookings List */}
				{bookings.length === 0 ? (
					<Card
						sx={{
							textAlign: 'center',
							py: 8,
							borderRadius: 2,
							backgroundColor: 'white',
							boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
							border: '1px solid #e5e7eb',
						}}
					>
						<CardContent>
							<Event sx={{fontSize: 64, color: 'secondary.main', mb: 2}}/>
							<Typography variant="h6" color="secondary.main" sx={{mb: 2}}>
								No bookings found
							</Typography>
							<Typography variant="body2" color="secondary.main">
								You haven't booked any events yet
							</Typography>
						</CardContent>
					</Card>
				) : (
					<Stack spacing={3}>
						{bookings.map((booking) => (
							<Card
								key={booking._id}
								sx={{
									borderRadius: 2,
									boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
									border: '1px solid #e5e7eb',
									transition: 'transform 0.2s, box-shadow 0.2s',
									'&:hover': {
										transform: 'translateY(-2px)',
										boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
									},
								}}
								id={`booking-${booking._id}`}
							>
								<CardContent sx={{p: 3}}>
									<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2}}>
										<Typography
											variant="h5"
											component="h2"
											sx={{
												fontWeight: '600',
												color: 'primary.main',
											}}
										>
											{booking.eventId?.title}
										</Typography>
										<IconButton
											onClick={() => handleDeleteBooking(booking._id)}
											sx={{
												color: 'error.main',
												'&:hover': {
													backgroundColor: 'error.light',
													color: 'error.dark',
												},
											}}
										>
											<Delete/>
										</IconButton>
									</Box>

									{/* Event Description */}
									<Typography
										variant="body2"
										color="secondary.main"
										sx={{
											mb: 3,
											lineHeight: 1.5,
										}}
									>
										{booking.eventId?.description}
									</Typography>

									{/* Booking Details */}
									<Stack spacing={2}>
										{/* Event Date & Time */}
										<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
											<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
												<CalendarToday sx={{fontSize: 18, color: 'primary.main'}}/>
												<Typography variant="body2" fontWeight="500">
													{formatDate(booking.eventId?.date)}
												</Typography>
											</Box>
											<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
												<AccessTime sx={{fontSize: 18, color: 'primary.main'}}/>
												<Typography variant="body2" fontWeight="500">
													{formatTime(booking.eventId?.startTime)} - {formatTime(booking.eventId?.endTime)}
												</Typography>
											</Box>
										</Box>

										{/* User Info */}
										<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
											<Person sx={{fontSize: 18, color: 'primary.main'}}/>
											<Typography variant="body2" fontWeight="500">
												Created by: {booking.eventId.creator?.name} ({booking.eventId.creator?.email})
											</Typography>
										</Box>

										{/* Booking Date */}
										<Chip
											label={`Booked on: ${formatDate(booking.createdAt)}`}
											variant="outlined"
											size="small"
											sx={{alignSelf: 'flex-start'}}
										/>
									</Stack>

									{/* Delete Button - Mobile */}
									<Box sx={{display: {xs: 'block', sm: 'none'}, mt: 2}}>
										<Button
											variant="contained"
											color="error"
											startIcon={<Delete/>}
											onClick={() => handleDeleteBooking(booking._id)}
											fullWidth
											sx={{
												textTransform: 'none',
												fontWeight: '600',
											}}
										>
											Cancel Booking
										</Button>
									</Box>
								</CardContent>
							</Card>
						))}
					</Stack>
				)}
			</Container>
		</Box>
	);
};

export default MyBookings;