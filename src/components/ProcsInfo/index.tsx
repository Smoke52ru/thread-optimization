import React, {useState} from 'react';
import {Space} from "antd";
import {Permutation} from "js-combinatorics";
import {TProcess} from "helpers/types";
import OneProcInfo from "./OneProcInfo";

interface TProcsInfoProps {
  procs: TProcess[]
}

export const ProcsInfo = ({procs}: TProcsInfoProps) => {
  const [permutations] = useState<TProcess[][]>([...new Permutation(procs)])

  return (
    <Space wrap>
      {permutations.map((process) => (
        <OneProcInfo key={process.map(({duration, order}) => `${order}_${duration}`).join(',')}
                     procs={process}/>
      ))}
    </Space>
  )
};