import {TProcess} from "./types";
import {maxDuration, minDuration} from "./constants";

export const constructProcs = (count: number): TProcess[] => {
  const res: TProcess[] = []
  for (let i = 1; i <= count; i += 1) {
    res.push({
      duration: Math.round(Math.random() * (maxDuration - minDuration) + minDuration),
      order: i,
      title: `process_${i}`
    })
  }
  return res
}