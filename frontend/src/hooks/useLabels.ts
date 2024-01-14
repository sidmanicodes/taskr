import { useEffect, useState } from "react";
import labelService, { Label } from "../services/label-service";
import { CanceledError } from "../services/api-client";

const useLabels = () => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = labelService.getAll<Label>();
    request
      .then((res) => {
        setLabels(res.data);
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
  return { labels, error, isLoading, setLabels, setError };
};

export default useLabels;
