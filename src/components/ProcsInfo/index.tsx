import React, {useState} from 'react';
import {Divider, Space} from "antd";
import {Permutation} from "js-combinatorics";
import {IProcsProps, TProcess} from "helpers/types";
import OneProcInfo from "./OneProcInfo";
import {findBest} from "../../helpers/findBest";

export const ProcsInfo = ({procs, showAll}: IProcsProps & { showAll: boolean }) => {
  const [permutations] = useState<TProcess[][]>([...new Permutation(procs)])
  const best = findBest(permutations).map(({data}) => data)

  return (
    <>
      <h2>Лучшие</h2>
      <Space wrap>
        {best.map((process) => (
          <OneProcInfo key={process.map(({duration, order}) => `${order}_${duration}`).join(',')}
                       procs={process}/>
        ))}
      </Space>
      {showAll && (
        <>
          <Divider/>
          <h2>Все перестановки</h2>
          <Space wrap>
            {permutations.map((process) => (
              <OneProcInfo key={process.map(({duration, order}) => `${order}_${duration}`).join(',')}
                           procs={process}/>
            ))}
          </Space>
        </>)}
    </>
  )
};