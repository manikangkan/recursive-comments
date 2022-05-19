import { useState } from "react";
import ReactTeaxtareaAutosize from "react-textarea-autosize";

const CommentForm = ({
  addComment,
  label,
  handleCancelButton = false,
  initialText = "",
  handleCancel,
}) => {
  const [body, setBody] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(body);
    setBody("");
  };

  return (
    <form className="flex items-end space-x-2" onSubmit={handleSubmit}>
      <ReactTeaxtareaAutosize
        required
        type="text"
        className="bg-transparent resize-none w-full border-b py-2 outline-none"
        placeholder="Type your comment here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {handleCancelButton && (
        <button
          className="py-2 px-4 bg-red-700 rounded-full font-semibold text-white text-xs outline-none"
          onClick={handleCancel}>
          Cancel
        </button>
      )}
      {body.trim() && (
        <button
          type="submit"
          className="py-2 px-4 bg-teal-700 rounded-full font-semibold text-white text-xs outline-none">
          {label}
        </button>
      )}
    </form>
  );
};

export default CommentForm;
