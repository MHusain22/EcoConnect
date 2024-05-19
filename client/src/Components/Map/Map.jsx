import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Container, Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Head from '../UI/Head';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const categories = ['Tree Plantation', 'Recycling Drives', 'Cleanup Event', 'Lake Cleaning'];

const initialInitiatives = [
  { id: 1, title: 'Tree Plantation', category: 'Tree Plantation', location: [22.857195,72.639149] },
  { id: 2, title: 'Recycling Drives', category: 'Recycling Drives', location: [18.999803,72.902678] },
  { id: 3, title: 'Cleanup Event', category: 'Cleanup Event', location: [23.322080,77.470515] },
  { id: 4, title: 'Lake Cleaning', category: 'Lake Cleaning', location: [17.308687,78.524630] },
  { id: 5, title: 'Water Conservation', category: 'Water Conservation', location: [26.364310,74.628793] },
];

const AddMarker = ({ newInitiative, setNewInitiative }) => {
  useMapEvents({
    click(event) {
      setNewInitiative({ ...newInitiative, location: [event.latlng.lat, event.latlng.lng] });
    },
  });
  return newInitiative.location === null ? null : (
    <Marker position={newInitiative.location}>
      <Popup>New Initiative Location</Popup>
    </Marker>
  );
};

const Map = () => {
  const [initiatives, setInitiatives] = useState(initialInitiatives);
  const [filteredInitiatives, setFilteredInitiatives] = useState(initialInitiatives);
  const [newInitiative, setNewInitiative] = useState({ title: '', category: '', location: null });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterInitiatives(event.target.value, searchLocation);
  };

  const handleSearchChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const filterInitiatives = (category, location) => {
    let filtered = initiatives;
    if (category) {
      filtered = filtered.filter((initiative) => initiative.category === category);
    }
    // Implement location-based filtering here if needed
    setFilteredInitiatives(filtered);
  };

  const handleAddInitiative = () => {
    setInitiatives([...initiatives, { ...newInitiative, id: initiatives.length + 1 }]);
    setNewInitiative({ title: '', category: '', location: null });
  };

  return (
    <Container>
      <Head>
        Environmental Initiatives
      </Head>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Select value={selectedCategory} onChange={handleCategoryChange} displayEmpty>
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Search by Location"
          value={searchLocation}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              filterInitiatives(selectedCategory, searchLocation);
            }
          }}
        />
        <Button onClick={() => filterInitiatives(selectedCategory, searchLocation)}>Search</Button>
      </Box>
      <MapContainer center={[22.6708, 71.5724]} zoom={8} style={{ width: '100%', height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          
        />
        {filteredInitiatives.map((initiative) => (
          <Marker key={initiative.id} position={initiative.location}>
            <Popup>{initiative.title}</Popup>
          </Marker>
        ))}
        <AddMarker newInitiative={newInitiative} setNewInitiative={setNewInitiative} />
      </MapContainer>
      
    
    </Container>
  );
};

export default Map;
