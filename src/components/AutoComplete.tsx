import { Result } from "../App";

const AutoComplete = ({
  results,
  handleSelect,
}: {
  results: Result[];
  handleSelect: (item: Result) => void;
}) => {
  return (
    results.length > 0 && (
      <ul>
        {results.map((item: Result, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {item.title} {item.author} {item.num_comments} {item.points}
          </li>
        ))}
      </ul>
    )
  );
};

export default AutoComplete;
