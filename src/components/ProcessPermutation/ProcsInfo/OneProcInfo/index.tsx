import React from 'react';
import {Chart} from "react-google-charts";
import {Card} from "antd";
import {IProcsProps, TProcess} from "helpers/types";
import {maxDuration} from "helpers/constants";
import {calcAvgs} from "helpers/calcAvgs";

const makeData = (procs: TProcess[]) => {
  type chunk = {
    data: [string, number, number, number, number],
    order: number,
  }

  const res: chunk[] = []
  let startTime = 0;
  procs.forEach((proc) => {
    const mark = proc.title;
    const startWaiting = 0;
    const startRunning = startTime;
    const endRunning = startRunning + proc.duration;
    const endWaiting = startRunning;

    startTime += proc.duration;

    res.push({
      data: [mark, startWaiting, startRunning, endRunning, endWaiting],
      order: proc.order
    })
  })
  return [
    ["Day", "", "", "", ""],
    ...res.sort((a, b) => a.order - b.order)
      .map((chunk) => chunk.data)
  ]
}

const OneProcInfo = ({procs}: IProcsProps) => {
  const title = JSON.stringify(procs.map(({duration}) => duration));
  const avgs = calcAvgs(procs)
  const data = makeData(procs)
  const options = {
    vAxis: {
      maxValue: maxDuration * procs.length,
    },
    legend: "none",
    bar: {groupWidth: "100%"},
  };

  return (
    <Card title={title}>
      <p>Ср. время ожидания: {avgs.waiting.toFixed(2)}</p>
      <p>Ср. время выполнения: {avgs.running.toFixed(2)}</p>
      <Chart chartType="CandlestickChart"
             width="100%"
             height="400px"
             data={data}
             options={options}
      />
    </Card>
  );
};

export default OneProcInfo;