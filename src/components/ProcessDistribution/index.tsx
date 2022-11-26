/* eslint-disable react/no-array-index-key */
import React, {FC, useEffect, useState} from 'react';
import {Card, Collapse, InputNumber, Space, Tooltip, Typography} from "antd";

import './index.scss'

const {Panel} = Collapse;

type TProcData = {
  length: number;
  index: number;
}

const maxProcessCount = 99
const minCPU = 2
const maxCPU = 20
const minProcLength = 1
const maxProcLength = 40

type TProcessProps = {
  process: TProcData;
}

const getRandomNumber = (min = minProcLength, max = maxProcLength) =>
  Math.round(Math.random() * (max - min) + min)

type TCPUData = {
  data: TProcData[],
  length: number,
}

const Process: FC<TProcessProps> = ({process}) => (
  <Tooltip title={`Процесс номер ${process.index}, время = ${process.length}`}>
    <span className='processBarItem'
          style={{width: process.length * 8}}
    >
      {`Процесс ${process.index}, ${process.length}`}
    </span>
  </Tooltip>
)

type TProcessBarProps = {
  procData: TProcData[]
}

const ProcessBar: FC<TProcessBarProps> = ({procData}) =>
  <div className='processBar'>
    {
      procData.length && procData.map((value, index) => (
        <Process process={value}
                 key={`${index}_${value}`}
        />
      ))
    }
  </div>

const ProcessDistribution: FC = () => {
  const [procCount, setProcCount] = useState(10)
  const [procData, setProcData] = useState<TProcData[]>([])
  const [cpuCount, setCpuCount] = useState(2)
  const [cpuData, setCpuData] = useState<TCPUData[]>([])
  const [tableValues,setTableValues] = useState<TProcData[][][]>([])

  const distribute = (cpuNumber: number, data: TProcData[]): TCPUData[] => {
    const cpus: TCPUData[] = []
  
    for (let i = 0; i < cpuNumber; i += 1) {
      cpus.push({data: [], length: 0})
    }
  
    data.forEach((item) => {
      let min = Infinity;
      const minIndex = cpus.reduce((minLengthIndex, cpu, currentIndex) => {
        if (cpu.length < min) {
          min = cpu.length
          return currentIndex
        }
        return minLengthIndex
      }, 0)
  
      cpus[minIndex].data.push(item)
      cpus[minIndex].length += item.length
  
      setTableValues((prevState) => {
        const res = [...prevState]
        
        res.push([...Array(cpuNumber)].map(()=>([])))
        const last = res.reduce<TProcData[]>((prev, cur):TProcData[]=>{
          if(cur[minIndex].length){
            return cur[minIndex]
          }
          return prev
        },[])
        res.at(-1)![minIndex] = [...last, item]

        return res
      })
    })
  
    return cpus
  }

  const onInputProcNumberChange = (value) => {
    if (value) {
      setProcCount(value)
    }
  }

  const onInputCPUNumberChange = (value) => {
    if (value){
      setCpuCount(value)
    }
  };

  const changeProcLengthFactory = (index) => (value) => {
    setProcData((prevState) => {
      prevState[index].length = value
      return [...prevState]
    })
  }

  useEffect(() => {
    const data: TProcData[] = []
    for (let i = 0; i < procCount; i += 1) {
      data.push({index: i, length: getRandomNumber()})
    }
    setProcData(data)
  }, [procCount])

  useEffect(() => {
    const procs = [...procData].sort((a, b) => -(a.length - b.length))
    setCpuData(
      distribute(cpuCount, procs)
    )
  }, [procData, cpuCount])

  return (
    <div className='container'>
      <Space direction='vertical'>
        <Typography.Paragraph>
          <pre>
            <ul>
              <li>Максимальное количество процессов - {maxProcessCount}</li>
              <li>Минимальное количество CPU - {minCPU}, максимальное - {maxCPU}</li>
              <li>Введите количество процессов и процессоров для распределения</li>
              <li>Время выполнения процессов будет рассчитано автоматически</li>
              <li>При необходимости откорректируйте время выполнения процессов</li>
              <li>Процессы будут распределены по принципу наименьшей занятости процессора</li>
              <li>Если информация о процессе не видна полностью, наведите на него курсор</li>
            </ul>
          </pre>
        </Typography.Paragraph>
        <Space direction='horizontal'>
          Введите количество процессоров:
          <InputNumber min={minCPU}
                       max={maxCPU}
                       value={cpuCount}
                       onChange={onInputCPUNumberChange}
          />
        </Space>
        <Space direction='horizontal'>
          Введите количество процессов:
          <InputNumber min={2}
                       max={maxProcessCount}
                       value={procCount}
                       onChange={onInputProcNumberChange}
          />
        </Space>
        <Space direction='horizontal'
               wrap
        >
          {procData.length && procData.map((value, index) => (
            <Card className='card'
                  size='small'
                  title={`Проц. ${index}`}
                  key={`${index}_${value}`}
            >
              <InputNumber className='input'
                           min={minProcLength}
                           max={maxProcLength}
                           value={value.length}
                           onChange={changeProcLengthFactory(index)}
              />
            </Card>
          ))}
        </Space>

        <Collapse defaultActiveKey='0'>
          <Panel header='Все процессы (отсортированные)' key='0'>
            <ProcessBar procData={[...procData].sort((a,b)=>-(a.length-b.length))}/>
          </Panel>
        </Collapse>

        <table className='table'>
          {tableValues[0] && tableValues[0].map((_,index)=><th key={index}>Процессор {index+1}</th>)}
          {tableValues.map((row, index)=>(
            <tr key={index}>
              {row.map((cell)=>(
                <td>{cell.map((val)=>val.length).join(',')}</td>
              ))}
            </tr>
          ))}
        </table>

        <Collapse defaultActiveKey='1'>
          {cpuData.length && cpuData.map((item, index) => (
            <Panel header={`Процессор ${index + 1}`} key='1'>
              <ProcessBar procData={item.data}/>
            </Panel>
          ))}
        </Collapse>
      </Space>
    </div>
  );
};

export default ProcessDistribution;
