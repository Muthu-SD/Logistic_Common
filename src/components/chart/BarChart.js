import React from 'react';
import ApexCharts from 'react-apexcharts';

const BarChart = ({ chartData, chartTitle }) => {
    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: {
              show: false,
            },
        },
        xaxis: {
            categories: chartData.map(item => item.label),
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#00E396', '#FEB019', '#FF4560', '#775DD0'],
    };

    const chartSeries = [{
        name: 'Value',
        data: chartData.map(item => item.value),
    }];

    return (
        <div className="bar-chart">
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

export default BarChart;
