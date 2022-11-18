import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Divider, InputNumber, Layout, Space, Typography} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {constructProcs} from "helpers/constructProcs";
import {TProcess} from "helpers/types";
import {maxDuration, minDuration} from "helpers/constants";
import {ProcsInfo} from "./ProcsInfo";
import './App.scss'

const App = () => {
  const [procCount, setProcCount] = useState(3)
  const [procs, setProcs] = useState<TProcess[]>(constructProcs(procCount))
  const [readyToSimulate, setReady] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const onChange = (val) => {
    setProcCount(val)
    setReady(false)
  };

  const onClickRun = () => {
    setReady(true)
  };

  const onCheck = (e: CheckboxChangeEvent) => {
    setShowAll(e.target.checked)
  };

  useEffect(() => {
    setProcs(constructProcs(procCount))
  }, [procCount])

  return (
    <Layout className="pageContainer">
      {/* Readme section */}
      <Typography.Paragraph>
        <pre>
          <ul>
            <li>После ввода количества процессов их длина будет расчитана автоматически (от {minDuration} до {maxDuration}).</li>
            <li>Чтобы сменить диапазон длин процессов обновите страницу.</li>
            <li>Вы можете включить отрисовку не только лучших, но и всех перестановок процессов, но это очень сильно скажется на производительности</li>
          </ul>
        </pre>
      </Typography.Paragraph>
      {/* Input section */}
      <Space direction="horizontal">
        <InputNumber className="input"
                     min={2}
                     max={10}
                     value={procCount}
                     placeholder="Кол-во процессов"
                     onChange={onChange}
        />
        <Button type="primary" onClick={onClickRun}>
          Запуск
        </Button>
        <Checkbox onChange={onCheck}>
          Показать все
        </Checkbox>
      </Space>
      {/* Data display section */}
      <Divider/>
      {readyToSimulate &&
          <ProcsInfo procs={procs} showAll={showAll}/>
      }
    </Layout>
  );
};

export default App;