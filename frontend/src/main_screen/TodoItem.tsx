import React from "react";
import { Todo } from "../services/todo-service";

interface Props {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (_id: string) => void;
}

const TodoItem = ({ todo, onEdit, onDelete }: Props) => {
  return <div>TodoItem</div>;
};

export default TodoItem;
