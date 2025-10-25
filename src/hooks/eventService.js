import useCustomReactQuery from '../hooks/useCustomReactQuery';
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

export const useCreateEvent = () => {
	const {response, error, loading, execute} = useCustomReactQuery(
		'/api/v1/events',
		'POST',
		null,
		{},
		null
	);

	const createEvent = async (eventData) => {
		return await execute(eventData);
	};

	return {createEvent, response, error, loading};
};

export const useGetMyEvents = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMyEvents = async () => {
			try {
				setLoading(true);
				setError(null);

				const res = await axios.get('/api/v1/events/get-my-events', {
					withCredentials: true,
					headers: {'Content-Type': 'application/json'},
				});

				setEvents(res.data?.data?.events || []);
			} catch (err) {
				const msg = err.response?.data?.message || 'Failed to load your events';
				setError(msg);
				toast.error(msg);
			} finally {
				setLoading(false);
			}
		};
		fetchMyEvents();
	}, [])

	return {events, loading, error};
};


// router.query.id in Next.js is initially undefined on the first render.

export const useGetEvent = (id) => {
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		const execute = async () => {
			try {
				setError(null);

				const res = await axios.get(`/api/v1/events/${id}`, {
					withCredentials: true,
					headers: {'Content-Type': 'application/json'},
				});

				setEvent(res.data?.data?.event || null);
			} catch (err) {
				const msg = err.response?.data?.message || 'Failed to load event';
				setError(msg);
				toast.error(msg);
			} finally {
				setLoading(false);
			}
		}
		execute();

	}, [id]);


	return {event, loading, error};
};

export const useUpdateEvent = () => {
	return async (id, formData) => {
		try {
			const res = await axios.put(`/api/v1/events/${id}`, formData, {
				withCredentials: true,
				headers: {'Content-Type': 'application/json'},
			});
			return res.data.data.event;
		} catch (e) {
			throw e;
		}
	};
}

export const useDeleteEvent = (eventId) => {
	const {response, error, loading, execute} = useCustomReactQuery(
		`/api/v1/events/${eventId}`,
		'DELETE',
		null,
		{},
		null
	);

	const deleteEvent = async () => {
		return await execute();
	};

	return {deleteEvent, response, error, loading};
};

export const useGetEvents = () => {
	const [events, setEvents] = useState([]);
	const [pagination, setPagination] = useState({
		totalItems: 0,
		totalPages: 0,
		currentPage: 1,
		limit: 10,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Function that performs the API request
	const fetchEvents = async (params = {}) => {
		setLoading(true);
		setError(null);

		try {
			console.log(params);
			const response = await axios.get('/api/v1/events', { params });
			const result = response.data;

			if (result.status === "success") {
				setEvents(result.data.events || []);
				setPagination(result.data.pagination || {});
			} else {
				throw new Error(result.message || "Failed to fetch events");
			}
		} catch (err) {
			console.error("Error fetching events:", err);
			setError(err.message || "Something went wrong while fetching events.");
		} finally {
			setLoading(false);
		}
	};

	// This is the function that external components will call
	const getEvents = async (params) => {
		await fetchEvents(params);
	};

	return {
		events,
		pagination,
		loading,
		error,
		getEvents, // <-- Exposed trigger function
	};
};
