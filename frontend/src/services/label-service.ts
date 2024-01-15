import create from "./http-service";

export interface Label {
  name: string;
  color: string;
  _id?: string;
}

export default create("/labels");
