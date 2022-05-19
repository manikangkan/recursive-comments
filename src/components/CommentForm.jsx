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
    <form
      className="flex flex-col lg:flex-row items-end space-x-4"
      onSubmit={handleSubmit}>
      <ReactTeaxtareaAutosize
        required
        type="text"
        className="bg-transparent resize-none w-full border-b py-2 outline-none text-sm sm:text-base"
        placeholder="Type your comment here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="flex items-center space-x-2 my-2 lg:my-0">
        {handleCancelButton && (
          <button
            className="py-2 px-4 bg-red-700 rounded-full font-semibold text-white text-xs outline-none hover:opacity-80"
            onClick={handleCancel}>
            Cancel
          </button>
        )}
        {body.trim() && (
          <button
            type="submit"
            className="py-2 px-4 bg-teal-700 rounded-full font-semibold text-white text-xs outline-none hover:opacity-80">
            {label}
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
