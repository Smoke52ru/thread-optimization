export type TProcess = {
  duration: number,
  title: string,
  order: number,
}

export interface IProcsProps {
  procs: TProcess[]
}