import React, {useEffect} from 'react';
import EventForm from './../components/EventForm';
import {toast} from "react-toastify";
import {useCreateEvent} from "@/hooks/eventService";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const CreateEventPage = () => {
	const router = useRouter();
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

	useEffect(() => {
		if (!isLoggedIn) router.push('/login');
	}, [])

	const { createEvent, loading } = useCreateEvent();

	const handleSubmit = async (formData) => {
		try {
			await createEvent(formData);
			toast.success('Event created successfully!');

			// Redirect to events page or clear form
			setTimeout(() => {
				router.push('/my-events');
			}, 1500);
		} catch (error) {
			toast.error('Failed to create event');
		}
	};

	return (
		<EventForm
			onSubmit={handleSubmit}
			loading={loading}
			submitButtonText="Create Event"
		/>
	);
};

export default CreateEventPage;