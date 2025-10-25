import useCustomReactQuery from './useCustomReactQuery';
import axios from "axios";
import {useState} from "react";

export const useSignup = () => {
	const {response, error, loading, execute} = useCustomReactQuery(
		'/api/v1/auth/signup',
		'POST',
		null, // body will be passed in execute
		{}, // config
		null // initialData
	);

	const signup = async (userData) => {
		return await execute(userData);
	};

	return {signup, response, error, loading};
};

export const useLogin = () => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const sendReq = async (credentials) => {
		try {
			setLoading(true);
			setError(null);

			const result = await axios.post('/api/v1/auth/login', credentials, {
				withCredentials: true
			});

			setResponse(result.data);
			return result.data;

		} catch (err) {
			console.log(err);
			const errorMessage = err.response?.data?.message || err.message || 'Login failed';
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { sendReq, response, error, loading };
};

export async function useGetMe() {
	try {
		const res = await axios.get("/api/v1/auth/me", {
			withCredentials: true, // includes cookie "token" if backend sends it
		});

		return (res.data?.data?.user);
	} catch (err) {
		console.log(err);
		return null;
	}
}
