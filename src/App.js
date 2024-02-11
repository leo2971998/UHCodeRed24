import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ChartComponent from './components/ChartComponent';
import MapComponent from './components/MapComponent';
import PredictiveData from './components/PredictiveData'
import Header from './components/Header'

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState('ALL');
    const locations = [
        {position: [-95.6172034, 29.7808774], title: 'U.S.A'},
        {position: [-120.8785967, 56.2399659], title: 'CANADA'},
        {position: [5.5956558, 58.9304678], title: 'NORWAY/UK'},
        {position: [153.0063345, -27.4689049], title: 'AUSTRALIA'},
    ];

    const handleCountrySelect = useCallback((country) => {
        setSelectedCountry(country);
    }, [setSelectedCountry]);

    const handleLocationChange = (e) => {
        const locationTitle = e.target.value;
        setSelectedCountry(locationTitle);
    };

    const dataFiles = [
        { path: './data/ghg_data.json', valueKey: 'GHG Value', metricName: 'Greenhouse Gases' },
        { path: './data/energy_data.json', valueKey: 'Energy Value', metricName: 'Energy' },
        { path: './data/waste_data.json', valueKey: 'Waste Value', metricName: 'Waste Generated' },
    ];

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <div className="chart-container">
                                    <select className="location-dropdown" onChange={handleLocationChange} value={selectedCountry || ''}>
                                        <option value="ALL">All countries</option>
                                        {locations.map((location, index) => (
                                            <option key={index} value={location.title}>{location.title}</option>
                                        ))}
                                    </select>
                                    <ChartComponent dataFiles={dataFiles} country={selectedCountry} />
                                </div>
                                <MapComponent onCountrySelect={handleCountrySelect} selectedCountry={selectedCountry}/>
                            </>
                        } />
                        <Route path="/predictive-data" element={
                            <PredictiveData/>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
