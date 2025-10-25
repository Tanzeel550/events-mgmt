import {useGetMyBookings} from "@/hooks/bookingService";
import {useEffect} from "react";

const MyBookings = () => {
	const {bookings, loading, error} = useGetMyBookings();

	useEffect(() => {
		console.log(bookings);
	}, [bookings]);

	return <h1>My bookings page</h1>
}

export default MyBookings;