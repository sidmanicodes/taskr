import create from "./http-service";
import { Label } from "./label-service";

export interface Todo {
  label: Label;
  task: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  _id?: string;
}

export default create("/todos");
