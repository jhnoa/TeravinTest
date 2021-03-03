export interface SingleData {
  ID: string;
  Name: string;
  Email: string;
  Mobile: string;
  Address?: Array<string>;
}
export type Data = Array<SingleData>;
