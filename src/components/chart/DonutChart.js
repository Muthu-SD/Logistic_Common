import React from 'react';
import ApexCharts from 'react-apexcharts';

const DonutChart = ({ chartData, chartTitle }) => {
    const chartOptions = {
        chart: {
            type: 'donut',
        },
        labels: chartData.map(item => item.label), // dynamically setting labels
        plotOptions: {
            pie: {
                donut: {
                    size: '50%',
                },
            },
        },
        legend: {
            position: 'bottom',
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} Tons`,
            },
        },
        colors: [
            '#00E396', '#FF4560', '#775DD0', '#FEB019', '#FF66B2', 
            '#28B9B5', '#FFB6C1', '#00B8D4', '#9C27B0', '#FF9800', 
            '#8BC34A', '#E91E63'
          ]
    };

    const chartSeries = chartData.map(item => item.value);

    return (
        <div className="donut-chart">
            <h3>{chartTitle}</h3>
            <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="donut"
                height="300px"
            />
        </div>
    );
};

export default DonutChart;
