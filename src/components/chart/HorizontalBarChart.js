import React from 'react';
import ApexCharts from 'react-apexcharts';

const HorizontalBarChart = ({ chartData, chartTitle }) => {
    const chartOptions = {
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: chartData.map(item => item.label),
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#FF9800', '#8BC34A', '#E91E63'],
    };

    const chartSeries = [{
        name: 'Value',
        data: chartData.map(item => item.value),
    }];

    return (
        <div className="horizontal-bar-chart">
            <h3>{chartTitle}</h3>
            <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height="300px"
            />
        </div>
    );
};

export default HorizontalBarChart;
