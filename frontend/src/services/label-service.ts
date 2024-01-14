import create from "./http-service";

export interface Label {
  _id: string;
  name: string;
  color: string;
}

export default create("/labels");
