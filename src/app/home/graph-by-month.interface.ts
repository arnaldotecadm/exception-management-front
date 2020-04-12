export interface GraphByMonth {
  exceptionType: string;
  graphModelList: GraphModel[];
}

export interface GraphModel {
  year: number;
  month: number;
  day: number;
  count: number;
}

export interface GraphGrouppedByType {
  typeName: string;
  count: number;
}
