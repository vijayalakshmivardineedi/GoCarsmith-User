import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
} from '@mui/material';
import axios from 'axios';
const AddressForm = () => {
    const [Name, setName] = useState('');
    const [FlatNo, setFlat] = useState('');
    const [locality, setLocality] = useState('');
    const [pincode, setPincode] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    useEffect(() => {
        // Initialize the map once the component is mounted
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCB_7DV83b0isZlTvj6C7NoReSPYHC9Kc8&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
        return () => {
            // Clean up the script to avoid memory leaks
            document.head.removeChild(script);
        };
    }, []);
    const initMap = () => {
        try {
            // Define bounds for India
            const indiaBounds = new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(6.749955, 68.162386), // Southwest corner (bottom-left)
                new window.google.maps.LatLng(35.674545, 97.395358) // Northeast corner (top-right)
            );
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 4,
                restriction: {
                    latLngBounds: indiaBounds,
                    strictBounds: false,
                },
            });
            const marker = new window.google.maps.Marker({
                map: map,
                position: { lat: latitude, lng: longitude },
                draggable: true,
            });
            window.google.maps.event.addListener(marker, 'dragend', (event) => {
                setLatitude(event.latLng.lat());
                setLongitude(event.latLng.lng());
                map.setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
            });
        } catch (error) {
            console.error('An error occurred in initMap:', error);
        }
    };
    const handleLocationSelect = () => {
        const geocoder = new window.google.maps.Geocoder();
        const address = `${FlatNo}, ${locality}, ${pincode}`;
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                setLatitude(location.lat());
                setLongitude(location.lng());
                initMap(); // Initialize the map with the selected location
            } else {
                alert('Location not found. Please check the address.');
            }
        });
    };
    // Handle script loading error
    window.initMap = () => {
        console.log('Google Maps script loaded successfully.');
        initMap(); // Your initialization code here
    };
    // Handle script loading error
    window.gm_authFailure = () => {
        console.error('Google Maps authentication failure. Please check your API key.');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "https://gocarsmithbackend.onrender.com/api/user/addAddress",
                { locality, Name, FlatNo, pincode, longitude, latitude }
            );
            if (response.status === 200) {
                console.log("Address added successfully");
                // Clear the form fields
                setName('');
                setFlat('');
                setLocality('');
                setPincode('');
                setLongitude(0);
                setLatitude(0);
            } else {
                console.error("Failed to add Address");
            }
        } catch (error) {
            console.error("Error: Not added", error);
        }
        alert('Form submitted! You can now handle the data as needed.');
    };
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
                <div id="map" style={{ height: '400px', width: '100%' }}></div>
            </Grid>
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Address Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {/* Other fields... */}
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name='Name'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Flat Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name='FlatNo'
                            value={FlatNo}
                            onChange={(e) => setFlat(e.target.value)}
                            required
                        />
                        <TextField
                            label="Locality"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name='locality'
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                            required
                        />
                        <TextField
                            label="Pin Code"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name='pincode'
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLocationSelect}
                            style={{ marginTop: '10px' }}
                        >
                            Select Location
                        </Button>
                        <TextField
                            label="Longitude"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name='longitude'
                            value={longitude}
                            //   onChange={(e) => setLongitude(e.target.value)}
                            aria-readonly
                        />
                        <TextField
                            label="Latitude"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name='latitude'
                            value={latitude}
                            //   onChange={(e) => setLongitude(e.target.value)}
                            aria-readonly
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default AddressForm;