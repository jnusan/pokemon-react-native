export interface IPokemon {
  name: string;
  url: string;
}

export interface IReqRes {
  count: number;
  next: string;
  previous?: any;
  results: IPokemon[];
}