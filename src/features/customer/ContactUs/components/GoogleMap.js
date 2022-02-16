import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Box } from '@mui/material';

const GoogleMap = ({ google }) => {
  return (
    <Box>
      <Map
        google={google}
        zoom={10}
        initialCenter={{
          lat: 16.0760216,
          lng: 108.1467546,
        }}
        style={{ top: 20 }}
      >
        <Marker />
      </Map>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_KEY}`,
})(GoogleMap);
