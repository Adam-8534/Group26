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
    const [zoom, setZoom] = useState(14);

    const coordinates = [
      [ -81.197832, 28.6078823 ],
    [ -81.198368, 28.606854 ],
    [ -81.198533, 28.606472 ],
    [ -81.199162, 28.60639 ],
    [ -81.200733, 28.605865 ],
    [ -81.201807, 28.605547 ],
    [ -81.202281, 28.605571 ],
    [ -81.202774, 28.605666 ],
    [ -81.203654, 28.606496 ],
    [ -81.205338, 28.605444 ],
    [ -81.206211, 28.604605 ],
    [ -81.206385, 28.604238 ],
    [ -81.205505, 28.604058 ],
    [ -81.205581, 28.603339 ],
    [ -81.202516, 28.603346 ],
    [ -81.202668, 28.603006 ],
    [ -81.202675, 28.602054 ],
    [ -81.202615, 28.601801 ],
    [ -81.201947, 28.600575 ],
    [ -81.202526, 28.599725 ],
    [ -81.201581, 28.599242 ],
    [ -81.201509, 28.599329 ],
    [ -81.201432, 28.599294 ],
    [ -81.201372, 28.599331 ],
  ];
  


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates[Math.floor((coordinates.length) / 2)],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('load', function () {
        map.current.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': coordinates
        }
        }
        });
        map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
        
        map.current.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            function (error, image) {
                if (error) throw error;
                map.current.addImage('custom-marker', image);
                // Add a GeoJSON source with 2 points
                map.current.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                // feature for Mapbox Start
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': coordinates[0]
                                },
                                'properties': {
                                    'title': 'Start'
                                }
                            },
                            {
                                // feature for Mapbox End 
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': coordinates[coordinates.length - 1]
                                },
                                'properties': {
                                    'title': 'End'
                                }
                            }
                        ]
                    }
                });

                // Add a symbol layer
                map.current.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
            }
        );
    });
      
  });
  return(
   <div className="homepage-map" id="logged-in-div">
     
       <Col md = "auto">
            <h5 id="mapbox-header">Area for map demo</h5>
            <div ref={mapContainer} className="map-container" />
       </Col>
       
    
    
   </div>
  );

};


export default LoggedInName;
