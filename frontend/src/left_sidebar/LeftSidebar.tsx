import React from "react";
import useLabels from "../hooks/useLabels";

const Display = () => {
  const { labels, error, isLoading, setLabels, setError } = useLabels();

  return (
    <div className="container-fluid">
      <ul className="list-group">
        {labels.map((label) => (
          <li key={label._id} className="list-group-item">
            {label.name + " | " + label.color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
