import { useEffect, useState } from "react";
import todoService, { Todo } from "../services/todo-service";
import { CanceledError } from "../services/api-client";

const useLabels = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = todoService.getAll<Todo>();
    request
      .then((res) => {
        setTodos(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });
    return () => cancel();
  }, []);
  return { todos, error, isLoading, setTodos, setError };
};

export default useLabels;
