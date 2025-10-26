import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: '#f8fafc',
				borderTop: '1px solid #e5e7eb',
				py: 7,
				mt: 'auto',
			}}
		>
			<Container maxWidth="lg">
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
				>
					<Typography
						variant="body2"
						color="secondary.main"
						sx={{ fontWeight: '500' }}
					>
						© {new Date().getFullYear()} Evently. All rights reserved.
					</Typography>

					<Stack direction="row" spacing={3}>
						<Typography
							variant="body2"
							color="secondary.main"
							sx={{
								fontWeight: '500',
								cursor: 'pointer',
								'&:hover': { color: 'primary.main' }
							}}
						>
							Privacy Policy
						</Typography>
						<Typography
							variant="body2"
							color="secondary.main"
							sx={{
								fontWeight: '500',
								cursor: 'pointer',
								'&:hover': { color: 'primary.main' }
							}}
						>
							Terms of Service
						</Typography>
						<Typography
							variant="body2"
							color="secondary.main"
							sx={{
								fontWeight: '500',
								cursor: 'pointer',
								'&:hover': { color: 'primary.main' }
							}}
						>
							Contact
						</Typography>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;