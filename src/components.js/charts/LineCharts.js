import React from "react";
import { Line } from "react-chartjs-2";

const getOptions = (days, currency) => {
  return {
    scales: {
      x: {
        type: "time",
        time: {
          unit: days === 1 ? "hour" : "day",
          displayFormats: {
            hour: "h:mm ",
            day: "MMM d",
          },
        },
        title: {
          display: true,
          text: `Time (${days === 1 ? "Hourly" : "Daily"})`,
        },
      },
      y: {
        title: {
          display: true,
          text: `Price (${currency})`,
        },
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };
};

const formatData = (data) => {
  return {
    labels: data.map(([timestamp]) => new Date(timestamp)),
    datasets: [
      {
        label: "Price",
        data: data.map(([_, price]) => price),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
};

const LineCharts = (props) => {
  const data1 = props.data;
  const options = getOptions(props.noOfDay, props?.currency);
  const modifiedData = formatData(data1);
  return (
    <div>
      {modifiedData ? <Line options={options} data={modifiedData}></Line> : ""}
    </div>
  );
};

export default LineCharts;
