import useLabels from "../hooks/useLabels";

const Display = () => {
  const { labels } = useLabels();
  return (
    <div>
      <ul>
        {labels.map((label, index) => (
          <li key={index} color={label.color}>
            {label.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
