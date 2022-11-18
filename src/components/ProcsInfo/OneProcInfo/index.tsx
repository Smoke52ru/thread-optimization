import React from 'react';
import {Chart} from "react-google-charts";
import {Card} from "antd";
import {TProcess} from "../../../helpers/types";
import {maxDuration} from "../../../helpers/constants";

interface TOneProcInfoProps {
  procs: TProcess[]
}

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

const OneProcInfo = ({procs}: TOneProcInfoProps) => {
  const title = JSON.stringify(procs.map(({duration}) => duration));
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
      <Chart chartType="CandlestickChart"
             width="100px"
             height="400px"
             data={data}
             options={options}
      />
    </Card>
  );
};

export default OneProcInfo;