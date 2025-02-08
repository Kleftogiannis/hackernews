import { Result } from "../App";

const SavedStories = ({
  savedItems,
  handleDelete,
}: {
  savedItems: Result[];
  handleDelete: (index: number) => void;
}) => {
  return (
    <div>
      <h3>Saved Stories</h3>
      {savedItems.map((item: Result, index) => (
        <div key={index}>
          <span>
            {item.title} {item.author} {item.num_comments} {item.points}
          </span>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default SavedStories;
