import {useEffect, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useGetMyBookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await axios.get('/api/v1/bookings', {
					withCredentials: true,
				});
				setBookings(res.data?.data?.bookings || []);
			} catch (err) {
				const msg = err.response?.data?.message || 'Failed to fetch bookings';
				setError(msg);
				toast.error(msg);
			} finally {
				setLoading(false);
			}
		};

		fetchBookings();
	}, []);

	return {bookings, loading, error};
};

export const useCreateBooking = () => {
	const [createdBooking, setCreatedBooking] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const createBooking = async (eventId) => {
		try {
			setLoading(true);
			setError(null);
			const res = await axios.post('/api/v1/bookings', {eventId}, {
				withCredentials: true, headers: {'Content-Type': 'application/json'},
			});
			setCreatedBooking(res.data?.data?.booking || null);
			toast.success('Booking created successfully');
		} catch (err) {
			const msg = err.response?.data?.message || 'Failed to create booking';
			setError(msg);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};

	return {createBooking, createdBooking, loading, error};
};


export const useDeleteBooking = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const deleteBooking = async (bookingId) => {
		try {
			setLoading(true);
			setError(null);
			setSuccess(false);

			await axios.delete(`/api/v1/bookings/${bookingId}`, {
				withCredentials: true,
			});

			setSuccess(true);
			toast.success('Booking deleted successfully');
		} catch (err) {
			const msg = err.response?.data?.message || 'Failed to delete booking';
			setError(msg);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};

	return {deleteBooking, loading, error, success};
};

