import Col from 'react-bootstrap/Col'
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function LoggedInName()
{
  

    mapboxgl.accessToken = 'pk.eyJ1IjoidXNlcjQ0NTEiLCJhIjoiY2tyOW5lbXoxMnEzOTJvdGNqdXhiaHZlcyJ9.vilRiGCNFkxFSKv6QXuA6Q';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-81.200220);
    const [lat, setLat] = useState(28.602346);
    const [zoom, setZoom] = useState(13.5);


  


    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });
    });
  return(
   <div className="homepage-user-profile" id="logged-in-div">
     
       <Col md = "auto">
            <h5 id="mapbox-header">Area for map demo</h5>
            <div ref={mapContainer} className="map-container" />
       </Col>
       
    
    
   </div>
  );

};


export default LoggedInName;
