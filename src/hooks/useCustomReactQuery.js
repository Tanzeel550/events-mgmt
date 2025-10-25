import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useCustomReactQuery = (
	url,
	method = 'GET',
	body = null,
	config = {},
	initialData = []
) => {
	const [response, setResponse] = useState(initialData);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	// Memoize the config to prevent unnecessary re-renders
	const memoizedConfig = useCallback(() => {
		const baseConfig = {
			withCredentials: true, // Important for cookies
			headers: {
				'Content-Type': 'application/json',
				...config.headers,
			},
			...config,
		};
		return baseConfig;
	}, [config]);

	const execute = useCallback(async (customBody = body, customUrl = url) => {
		let isMounted = true;

		try {
			setLoading(true);
			setError(null);

			let res;
			const requestConfig = memoizedConfig();

			switch (method.toUpperCase()) {
				case 'GET':
					res = await axios.get(customUrl, requestConfig);
					break;

				case 'POST':
					res = await axios.post(customUrl, customBody, requestConfig);
					break;

				case 'PUT':
					res = await axios.put(customUrl, customBody, requestConfig);
					break;

				case 'PATCH':
					res = await axios.patch(customUrl, customBody, requestConfig);
					break;

				case 'DELETE':
					res = await axios.delete(customUrl, requestConfig);
					break;

				default:
					throw new Error(`Unsupported HTTP method: ${method}`);
			}

			if (isMounted) {
				setResponse(res.data);
			}

			return res.data;
		} catch (err) {
			if (isMounted) {
				const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
				setError(errorMessage);
			}
			throw err;
		} finally {
				setLoading(false);
		}
	}, [url, method, body, memoizedConfig]);

	// Auto-execute for GET requests
	useEffect(() => {
		if (method.toUpperCase() === 'GET') {
			execute();
		}
	}, [execute, method]);

	return {
		response,
		error,
		loading,
		setResponse,
		execute,
	};
};

export default useCustomReactQuery;