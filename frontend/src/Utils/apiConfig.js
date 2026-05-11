const isProduction = import.meta.env.MODE === 'production';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isProduction ? "/_/backend" : "http://localhost:5000");

export default API_BASE_URL;
