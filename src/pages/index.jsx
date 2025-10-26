'use client';

import SearchSection from './../components/SearchSection'
import {useGetEvents} from "../hooks/eventService";
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Grid,
	Paper,
	Stack,
	Typography
} from '@mui/material';
import {AccessTime, Add, Bookmark, CalendarToday, Edit} from '@mui/icons-material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import SingleEventHomePage from "@/components/SingleEventHomePage";
import {useEffect} from "react";

export default function ClientPage() {
	const {events, pagination, loading, error, getEvents} = useGetEvents();

	const submitFilters = data => {
		console.log(data);
		getEvents({...data});
	}

	useEffect(() => {
		getEvents();
	}, []);


	return (<>
		<main className="bg-gray-50 min-h-screen">
			<SearchSection submitFilters={submitFilters}/>
		</main>
		{loading && <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<CircularProgress/>
		</Box>}

		{error && <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Typography color="error">{error}</Typography>
		</Box>}

		{!loading && events.length === 0 ? (<Paper
			sx={{
				textAlign: 'center',
				py: 8,
				backgroundColor: 'white',
				borderRadius: 2,
				boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
				border: '1px solid #e5e7eb',
				mt: 2,
				mb: 3
			}}
		>
			<Typography variant="body2" color="secondary.main" sx={{mb: 3}}>
				No Event Found
			</Typography>
			<Button
				variant="contained"
				startIcon={<Add/>}
				onClick={() => router.push('/events/create')}
			>
				Create Event
			</Button>
		</Paper>) : (<Container maxWidth='lg' sx={{
			mt: 20,
			mb: 20
		}}>
			<Grid container spacing={3}>
				{events.map((event) => <SingleEventHomePage event={event}/> )}
			</Grid>

			{/* Pagination */}
			{pagination.totalPages > 1 && (
				<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 2}}>
					<Button
						variant="outlined"
						onClick={previousPage}
						disabled={!hasPreviousPage}
						sx={{textTransform: 'none', fontWeight: '600'}}
					>
						Previous
					</Button>

					<Typography variant="body2" color="secondary.main">
						Page {currentPage} of {pagination.totalPages}
					</Typography>

					<Button
						variant="outlined"
						onClick={nextPage}
						disabled={!hasNextPage}
						sx={{textTransform: 'none', fontWeight: '600'}}
					>
						Next
					</Button>
				</Box>)}
		</Container>)}
	</>)
}