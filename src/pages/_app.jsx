import {Provider} from "react-redux";
import store from "../store/store";
import {Box, CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import theme from './../components/utils/theme'
import TopBar from "@/components/TopBar";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useGetMe} from "@/hooks/authservices";
import {login} from "@/store/userSlice";


function MyApp({Component, pageProps}) {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		useGetMe().then(user => {
			if (user)
				store.dispatch(login(user));
			setLoading(false);
		});
	}, [])

	if (loading) {
		return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<CircularProgress/>
		</Box>);
	}

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<ToastContainer/>
				<TopBar/>
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
