import React from 'react';
import '../styles/PredictiveData.css'; // Make sure to create this CSS file

// Import your PNG images
import Plot1 from '../pics/PredictTotalEnergy.png';
import Plot2 from '../pics/PredictTotalGHGs.png';
import Plot3 from '../pics/PredictTotalWaste.png';

const PredictiveData = () => {
    return (
        <div className="predictive-data-container">
            <h2>Five-Year Outlook: Sustainability Trends</h2>
            <div className="plots-container">
                <img src={Plot1} alt="Predictive Plot 1" className="plot" />
                <img src={Plot2} alt="Predictive Plot 2" className="plot" />
                <img src={Plot3} alt="Predictive Plot 3" className="plot" />
            </div>
        </div>
    );
};

export default PredictiveData;
