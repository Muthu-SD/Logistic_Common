import React from 'react';
import ApexCharts from 'react-apexcharts';

const PieChart = ({ chartData, chartTitle }) => {
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: chartData.map(item => item.label),
        colors: ['#FF4560', '#00E396', '#775DD0', '#FEB019'],
        legend: {
            position: 'bottom',
        },
        tooltip: {
            y: {
                formatter: val => `${val} Units`,
            },
        },
    };

    const chartSeries = chartData.map(item => item.value);

    return (
        <div className="pie-chart">
            <h3>{chartTitle}</h3>
            <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="pie"
                height="300px"
            />
        </div>
    );
};

export default PieChart;
