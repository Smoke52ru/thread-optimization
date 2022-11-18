import React, {useEffect, useState} from 'react';
import {Button, Divider, InputNumber, Layout, Space, Typography} from "antd";
import {constructProcs} from "helpers/constructProcs";
import {TProcess} from "helpers/types";
import {ProcsInfo} from "./ProcsInfo";
import './App.scss'

const App = () => {
  const [procCount, setProcCount] = useState(3)
  const [procs, setProcs] = useState<TProcess[]>(constructProcs(procCount))
  const [readyToSimulate, setReady] = useState(false)

  const onChange = (val) => {
    setProcCount(val)
    setReady(false)
  };

  const onClick = () => {
    setReady(true)
  };

  useEffect(() => {
    console.log(procCount)
    setProcs(constructProcs(procCount))
  }, [procCount])

  return (
    <Layout className="pageContainer">
      <Typography.Paragraph>
        <pre>
          После ввода количества процессов их длина будет расчитана автоматически.
        </pre>
      </Typography.Paragraph>
      <Space direction="horizontal">
        <InputNumber className="input"
                     min={2}
                     max={5}
                     value={procCount}
                     placeholder="Кол-во процессов"
                     onChange={onChange}
        />
        <Button type="primary" onClick={onClick}>Запуск</Button>
      </Space>
      <Divider/>
      {readyToSimulate &&
          <ProcsInfo procs={procs}/>
      }
    </Layout>
  );
};

export default App;