import {TProcess} from "./types";

export const calcAvgs = (procs: TProcess[]): { waiting: number, running: number } => {
  let waiting = 0;
  let running = 0;

  procs.forEach((proc) => {
    waiting += running;
    running += proc.duration;
  })

  return {
    waiting: waiting / procs.length,
    running: (waiting + running) / procs.length,
  }
}