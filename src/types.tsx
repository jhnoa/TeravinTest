export interface SingleData {
  ID: string;
  Name: string;
  Email: string;
  Mobile: string;
  Address: Array<string>;
  Birthday: string;
}
export type Data = Array<SingleData>;
