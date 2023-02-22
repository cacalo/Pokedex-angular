export interface Data {
  count: number;
  next: string;
  previous?: any;
  results: Resultado[];
}

export interface Resultado {
  name: string;
  url: string;
}
