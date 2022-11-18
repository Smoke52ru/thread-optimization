import {TProcess} from "./types";
import {calcAvgs} from "./calcAvgs";

export const findBest = (procs: TProcess[][]) => (
  procs
    .map((perm) => ({data: perm, ...calcAvgs(perm)}))
    .sort((a, b) => a.running - b.running)
    .filter((perm, _, array) => perm.running === array[0].running)
)