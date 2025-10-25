import {Box, Button, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import {AccessTime, Bookmark, CalendarToday, Edit} from "@mui/icons-material";
import {useCreateBooking} from "@/hooks/bookingService";

export default function SingleEventHomePage({event}) {
	const {createBooking, createdBooking, loading, error} = useCreateBooking();

	const handleCreateBooking = e => {
		e.preventDefault();
		createBooking(event._id);
	}

	const formatDate = (dateString) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const formatTime = (timeString) => {
		if (!timeString) return '';
		return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	};

	return <Grid item xs={12} sm={6} md={4} key={event._id}>
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
					transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
				},
			}}
		>
			<CardContent sx={{p: 3, flexGrow: 1}}>
				{/* Event Title */}
				<Typography
					variant="h6"
					component="h2"
					sx={{
						fontWeight: '600', color: 'primary.main', mb: 2, lineHeight: 1.3,
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
							textTransform: 'none', fontWeight: '600', flex: 1,
						}}
					>
						Edit
					</Button>
					{!createdBooking && <Button
						variant="contained"
						size="small"
						startIcon={<Bookmark/>}
						onClick={handleCreateBooking}
						sx={{
							textTransform: 'none', fontWeight: '600', flex: 1,
						}}
						disabled={loading}
					>
						Book
					</Button>
					}
				</Stack>
			</CardContent>
		</Card>
	</Grid>
}