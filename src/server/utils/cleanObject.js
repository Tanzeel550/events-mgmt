function cleanObject(obj) {
	if (typeof obj !== "object" || obj === null) return obj;

	for (const key in obj) {
		const value = obj[key];

		// Recurse into nested objects
		if (typeof value === "object" && value !== null) {
			obj[key] = cleanObject(value);

			// Remove empty objects
			if (
				Object.keys(obj[key]).length === 0 &&
				obj[key].constructor === Object
			) {
				delete obj[key];
			}
		}

		// Remove nulls, empty arrays, or empty strings
		if (
			value === null ||
			(Array.isArray(value) && value.length === 0) ||
			(typeof value === "string" && value.trim() === "")
		) {
			delete obj[key];
		}
	}

	return obj;
}

module.exports = cleanObject;
