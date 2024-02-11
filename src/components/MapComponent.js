import React, {useEffect, useRef, useState} from 'react';
import Notification from './Notification';
import '../styles/Map.css';

const locations = [
    {position: [-95.6172034, 29.7808774], title: 'U.S.A'},
    {position: [-120.8785967, 56.2399659], title: 'CANADA'},
    {position: [5.5956558, 58.9304678], title: 'NORWAY/UK'},
    {position: [153.0063345, -27.4689049], title: 'AUSTRALIA'},
];
const MapComponent = ({onCountrySelect, selectedCountry}) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [notification, setNotification] = useState({show: false, message: ''});
    const showNotification = (message) => {
        setNotification({show: true, message});
        setTimeout(() => setNotification({show: false, message: ''}), 1000);
    };

    useEffect(() => {
        if (window.atlas && mapRef.current && !map) {
            const newMap = new window.atlas.Map(mapRef.current, {
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: 'u5ZyUSz2cIhpawZdXzI5CcEci-JjuILq6GPxhCQ7CDs',
                },
            });

            newMap.events.add('ready', () => {
                const dataSource = new window.atlas.source.DataSource();
                newMap.sources.add(dataSource);

                locations.forEach(loc => {
                    const pin = new window.atlas.HtmlMarker({
                        htmlContent: "<div><div class='pin bounce'></div><div class='pulse'></div></div>",
                        position: loc.position,
                        pixelOffset: [30, -18]
                    });

                    newMap.markers.add(pin);

                    newMap.events.add('click', pin, () => {
                        onCountrySelect(loc.title);
                        showNotification(`Location Selected: ${loc.title}`);
                    });
                });

                const bounds = window.atlas.data.BoundingBox.fromPositions(
                    locations.map(loc => loc.position)
                );
                newMap.setCamera({
                    bounds: bounds,
                    padding: 100
                });
            });
            setMap(newMap);
        }
    }, [map, onCountrySelect]);

    useEffect(() => {
        if (map) {
            if (selectedCountry === 'ALL') {
                const bounds = window.atlas.data.BoundingBox.fromPositions(locations.map(loc => loc.position));
                map.setCamera({
                    bounds: bounds,
                    padding: 100 // Adjust this padding value as needed
                });
            } else {
                const location = locations.find(loc => loc.title === selectedCountry);
                if (location) {
                    map.setCamera({
                        center: location.position,
                        zoom: 7.5
                    });
                }
            }
        }
    }, [selectedCountry, map]);

    return (
        <>
            <div ref={mapRef} className="mapContainer"></div>
            <Notification message={notification.message} show={notification.show}/>
        </>
    );
};

export default MapComponent;
