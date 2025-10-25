import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Container,
} from '@mui/material';
import {CorporateFare} from '@mui/icons-material';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const TopBar = () => {
	const router = useRouter();
	const {isLoggedIn} = useSelector(state => state.user);

	return (
		<AppBar
			position="sticky"
			elevation={2}
			sx={{
				backgroundColor: 'white',
				color: 'text.primary',
			}}
		>
			<Container maxWidth="xl">
				<Toolbar sx={{justifyContent: 'space-between', px: {xs: 0, sm: 2}}}>
					{/* Company Logo */}
					<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
						<CorporateFare
							sx={{
								color: 'primary.main',
								fontSize: 32
							}}
						/>
						<Typography
							variant="h6"
							component="div"
							sx={{
								fontWeight: 'bold',
								display: {xs: 'none', sm: 'block'}
							}}
						>
							CompanyName
						</Typography>
					</Box>

					{isLoggedIn ? <Box sx={{display: 'flex', gap: 1}}>
							<Button
								color="inherit"
								sx={{
									color: 'text.primary',
									'&:hover': {
										color: 'primary.main',
										backgroundColor: 'transparent'
									}
								}}
								onClick={e => {
									e.preventDefault();
									router.push('/my-events');
								}}
							>
								My Events
							</Button>
							<Button
								color="inherit"
								sx={{
									color: 'text.primary',
									'&:hover': {
										color: 'primary.main',
										backgroundColor: 'transparent'
									}
								}}
								onClick={e => {
									e.preventDefault();
									router.push('/my-bookings');
								}}
							>
								My Bookings
							</Button>
							<Button
								variant="contained"
								sx={{
									backgroundColor: 'primary.main',
									'&:hover': {
										backgroundColor: 'primary.dark'
									}
								}}
								onClick={e => {
									e.preventDefault();
									router.push('/create-event');
								}}
							>
								Create
							</Button>
						</Box> :
					<Box sx={{display: 'flex', gap: 1}}>
						<Button
							color="inherit"
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'primary.main',
									backgroundColor: 'transparent'
								}
							}}
							onClick={e => {
								e.preventDefault();
								router.push('/login');
							}}
						>
							Login
						</Button>
						<Button
							variant="contained"
							sx={{
								backgroundColor: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.dark'
								}
							}}
							onClick={e => {
								e.preventDefault();
								router.push('/signup');
							}}
						>
							Sign Up
						</Button>
					</Box>
					}



				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default TopBar;