import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const series = [
	{
		name: "Pending",
		data: [ 670, 720, 770, 690, 900, 970, 1030 ],
	},
	{
		name: "Approved",
		data: [ 760, 590, 910, 850, 700, 1050, 920 ],
	},
	{
		name: "Success",
		data: [ 760, 590, 910, 850, 700, 1050, 920 ],
	},
	{
		name: "Reject/Cancel",
		data: [ 760, 590, 910, 850, 700, 1050, 920 ],
	}
];

const chartSettings = {
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "smooth",
		width: 2,
	},
	xaxis: {
		type: "category",
		categories: [],
		labels: {
			style: {
				colors: "#6B859E",
				opacity: 0.7,
			},
		},
	},
	yaxis: {
		labels: {
			style: {
				colors: [ "#6B859E" ],
				opacity: 0.7,
			},
		},
	},
	tooltip: {
		x: {
			show: false,
		},
	},
	fill: {
		type: "gradient",
		gradient: {
			shadeIntensity: 1,
			opacityFrom: 0.7,
			opacityTo: 1,
			stops: [ 40, 90, 100 ]
		}
	},
	colors: [ "#FFC405", "#4D53E0", "#43BC13", "#FF5668" ],
	chart: {
		toolbar: {
			show: false,
		},
	},
	legend: {
		show: true,
		horizontalAlign: "center",
	},
};

export default function ApexLineChart ( props )
{
	const [ seriesData, setSeriesData ] = useState( series );
	const [ option, setOption ] = useState( chartSettings );
	useEffect( () =>
	{
		if ( props.data )
		{
			let newData = series.map( item =>
			{
				let status = props.data.find( e => e.status == item.key );
				if ( status ) item.value = status.total;
				return item;
			} );
			setSeriesData( newData );
		}
		if(props.listDates?.length > 0) {
			option.xaxis.categories  = props.listDates;
			console.log(option);
			setOption(option)
		}
	}, [ props.data, props.listDates ] );

	return (
		<ApexCharts
			options={ chartSettings }
			series={ seriesData }
			type="area"
			height={ 300 }
		/>
	);
}
