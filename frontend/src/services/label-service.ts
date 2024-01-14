import create from "./http-service";

export interface Label {
  name: string;
  color: string;
}

export default create("/labels");
