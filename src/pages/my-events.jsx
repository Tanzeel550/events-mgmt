import React from 'react';
import {useRouter} from 'next/router';
import {Box, Button, Card, CardContent, CircularProgress, Container, Grid, Stack, Typography,} from '@mui/material';
import {AccessTime, Add, CalendarToday, Edit} from '@mui/icons-material';
import {useGetMyEvents} from '../hooks/eventService';

const MyEvents = () => {
	const router = useRouter();
	const {events, loading, error} = useGetMyEvents();

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


	if (loading) {
		return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<CircularProgress/>
		</Box>
	}


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
						Failed to load events
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
						Events
					</Typography>
					<Typography
						variant="h6"
						color="secondary.main"
						sx={{mb: 3}}
					>
						Discover and manage your events
					</Typography>
				</Box>

				{/* Events Grid */}
				{events.length === 0 ? (
					<Box
						sx={{
							textAlign: 'center',
							py: 8,
							backgroundColor: 'white',
							borderRadius: 2,
							boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
							border: '1px solid #e5e7eb',
						}}
					>
						<Typography variant="h6" color="secondary.main" sx={{mb: 2}}>
							No events found
						</Typography>
						<Typography variant="body2" color="secondary.main" sx={{mb: 3}}>
							Create your first event to get started
						</Typography>
						<Button
							variant="contained"
							startIcon={<Add/>}
							onClick={() => router.push('/events/create')}
						>
							Create Event
						</Button>
					</Box>
				) : (
					<Grid container spacing={3}>
						{events.map((event) => (
							<Grid item xs={12} sm={6} md={4} key={event._id}>
								<Card
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										borderRadius: 2,
										boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
										border: '1px solid #e5e7eb',
										transition: 'transform 0.2s, box-shadow 0.2s',
										'&:hover': {
											transform: 'translateY(-2px)',
											boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
										},
									}}
								>
									<CardContent sx={{p: 3, flexGrow: 1}}>
										{/* Event Title */}
										<Typography
											variant="h6"
											component="h2"
											sx={{
												fontWeight: '600',
												color: 'primary.main',
												mb: 2,
												lineHeight: 1.3,
											}}
										>
											{event.title}
										</Typography>

										{/* Event Description */}
										<Typography
											variant="body2"
											color="secondary.main"
											sx={{
												mb: 3,
												lineHeight: 1.5,
												display: '-webkit-box',
												WebkitLineClamp: 3,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
											}}
										>
											{event.description}
										</Typography>

										{/* Date and Time */}
										<Stack spacing={1.5} sx={{mb: 3}}>
											<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
												<CalendarToday sx={{fontSize: 18, color: 'primary.main'}}/>
												<Typography variant="body2" fontWeight="500">
													{formatDate(event.date)}
												</Typography>
											</Box>
											<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
												<AccessTime sx={{fontSize: 18, color: 'primary.main'}}/>
												<Typography variant="body2" fontWeight="500">
													{formatTime(event.startTime)} - {formatTime(event.endTime)}
												</Typography>
											</Box>
										</Stack>

										{/* Action Buttons */}
										<Stack direction="row" spacing={1}>
											<Button
												variant="outlined"
												size="small"
												startIcon={<Edit/>}
												onClick={() => router.push(`/edit-event/${event._id}`)}
												sx={{
													textTransform: 'none',
													fontWeight: '600',
													borderRadius: 2,
													flex: 1,
												}}
											>
												Edit
											</Button>
										</Stack>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				)}
			</Container>
		</Box>
	);
};

export default MyEvents;