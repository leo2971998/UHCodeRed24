import React, { useEffect, useRef } from 'react';
import '../styles/Map.css';

const MapComponent = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const loadMap = async () => {
            if (window.atlas && mapRef.current) {
                const map = new window.atlas.Map(mapRef.current, {
                    center: [-122.33, 47.60],
                    zoom: 10,
                    authOptions: {
                        authType: 'subscriptionKey',
                        subscriptionKey: 'u5ZyUSz2cIhpawZdXzI5CcEci-JjuILq6GPxhCQ7CDs',
                    },
                });

                map.events.add('ready', () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const userLocation = [position.coords.longitude, position.coords.latitude];
                                map.setCamera({ center: userLocation, zoom: 12 });
                            },
                            (error) => {
                                console.error(error);
                            }
                        );
                    }
                });
            }
        };

        loadMap();
    }, []);

    return <div ref={mapRef} className="mapContainer"></div>;
};

export default MapComponent;
