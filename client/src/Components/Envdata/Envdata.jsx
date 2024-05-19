// ExampleComponent.js
import React, { useState, useEffect } from 'react';
import { getAirQuality, getRecyclingCenters } from './EnvApi';

const Envdata = () => {
    const [airQualityData, setAirQualityData] = useState(null);
    const [recyclingCentersData, setRecyclingCentersData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const airQuality = await getAirQuality(40.7128, -74.0060); // Example coordinates (New York)
                setAirQualityData(airQuality);

                const recyclingCenters = await getRecyclingCenters('10001'); // Example ZIP code (New York)
                setRecyclingCentersData(recyclingCenters);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {airQualityData && airQualityData.data && (
                <div>
                    <h2>Air Quality</h2>
                    <p>Location: {airQualityData.data.city}</p>
                    <p>AQI: {airQualityData.data.aqi}</p>
                </div>
            )}
            {recyclingCentersData && recyclingCentersData.locations && (
                <div>
                    <h2>Recycling Centers</h2>
                    <ul>
                        {recyclingCentersData.locations.map((center) => (
                            <li key={center.id}>{center.description}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Envdata;
