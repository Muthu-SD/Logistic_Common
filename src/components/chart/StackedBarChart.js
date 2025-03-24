import React from 'react';
import ApexCharts from 'react-apexcharts';

const StackedBarChart = ({ chartData, chartTitle }) => {
    const categories = [...new Set(chartData.flatMap(item => item.label))];
    const series = chartData.map(seriesItem => ({
        name: seriesItem.name,
        data: seriesItem.data,
    }));

    const chartOptions = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        xaxis: {
            categories: categories,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    total: {
                        enabled: true,
                    },
                },
            },
        },
        colors: ['#00E396', '#FEB019', '#FF4560', '#775DD0'],
    };

    return (
        <div className="stacked-bar-chart">
            <h3>{chartTitle}</h3>
            <ApexCharts
                options={chartOptions}
                series={series}
                type="bar"
                height="300px"
            />
        </div>
    );
};

export default StackedBarChart;
