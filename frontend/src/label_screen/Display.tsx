import React from "react";
import useLabels from "../hooks/useLabels";
import "./Display.css";

const Display = () => {
  const { labels } = useLabels();
  return (
    <ul className="list-group">
      {labels.map((label, index) => (
        <li key={index} className="list-group-item">
          {label.name + " | " + label.color}
        </li>
      ))}
    </ul>
  );
};

export default Display;
