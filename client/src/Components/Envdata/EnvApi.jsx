// apiService.js
import axios from 'axios';

const airQualityAPI = 'https://api.airvisual.com/v2/chicago';
const recyclingCentersAPI = 'https://api.earth911.com/earth911.searchLocations';

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

export const getAirQuality = async (latitude, longitude) => {
    try {
        const response = await axios.get(airQualityAPI, {
            params: {
                key: apiKey,
                lat: latitude,
                lon: longitude,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        throw error;
    }
};

export const getRecyclingCenters = async (zipCode) => {
    try {
        const response = await axios.get(recyclingCentersAPI, {
            params: {
                api_key: apiKey,
                postal_code: zipCode,
                country: 'US', // Change if needed
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recycling centers:', error);
        throw error;
    }
};
