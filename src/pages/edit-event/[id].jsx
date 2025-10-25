import {useRouter} from 'next/router';
import {useGetEvent, useUpdateEvent} from '../../hooks/eventService';
import {Box, CircularProgress, Typography} from "@mui/material";
import EventForm from "@/components/EventForm";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const EditEventPage = () => {
	const router = useRouter();
	const {id} = router.query;

	const {event, loading, error} = useGetEvent(id);

	const [formData, setFormData] = useState(null);

	const formatTime = time => {
		const split = time.split(':');
		const hour = split[0], minute = split[1];
		const date = new Date();
		date.setHours(hour);
		date.setMinutes(minute);
		return date;
	}

	useEffect(() => {
		if (event) {
			setFormData({
				...event,
				date: new Date(event.date),
				startTime: formatTime(event.startTime),
				endTime: formatTime(event.endTime),
			});
		}
	}, [event]);

	if (loading) {
		return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<CircularProgress/>
		</Box>);
	}

	if (error) {
		return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Typography color="error">{error}</Typography>
		</Box>);
	}

	if (!event) {
		return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Typography>No event found.</Typography>
		</Box>);
	}

	if (!formData) {
		return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<CircularProgress/>
		</Box>);
	}

	const handleSubmit = async (formData) => {
		console.log("handle submit called");
		try {
			await useUpdateEvent()(id, formData);
			// await updateEvent(formData);

			toast.success('Event updated successfully!');
			// Redirect to events page or clear form
			setTimeout(() => {
				router.push('/my-events');
			}, 1500);
		} catch (error) {
			console.log(error);
			toast.error(error)
		}
	};

	return (
		<EventForm
			initialData={formData}
			onSubmit={handleSubmit}
			loading={loading}
			submitButtonText="Update Event"
		/>
	);
};

export default EditEventPage;