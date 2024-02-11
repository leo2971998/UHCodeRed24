import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ChartComponent = ({ dataFiles, country }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let tempChartData = [];
            for (const file of dataFiles) {
                try {
                    const response = await fetch(file.path);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const fileData = await response.text();
                    const jsonData = JSON.parse(fileData.trim());
                    const filteredData = country === 'ALL'
                        ? jsonData
                        : jsonData.filter(item => item.Country === country);
                    const trace = {
                        x: filteredData.map((item) => item.Country),
                        y: filteredData.map((item) => item[file.valueKey]),
                        type: 'bar',
                        name: file.metricName,
                    };
                    tempChartData.push(trace);
                } catch (error) {
                    console.error('Error fetching or parsing data:', error);
                }
            }
            setChartData(tempChartData);
        };

        fetchData();
    }, [dataFiles, country]);

    return (
        <div>
            {chartData.length > 0 && (
                <Plot
                    data={chartData}
                    layout={{
                        autosize: true,
                        title: country === 'ALL' ? 'Performance by Countries in 2022' : `Performance in ${country}`,
                        barmode: 'group',
                    }}
                    config={{
                        displayModeBar: false,
                    }}
                />
            )}
        </div>
    );
};

export default ChartComponent;
