import { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { format } from "timeago.js";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  addComment,
  updateComment,
  activeComment,
  setActiveComment,
  parentId = null,
}) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const getAvatar = async () => {
      const { data } = await axios.get(
        `https://api.multiavatar.com/${comment.userId}?apikey=pvkunVAEHbjoQJ`
      );
      const buffer = new Buffer(data);
      setAvatar(buffer.toString("base64"));
    };
    getAvatar();
  }, [comment.userId]);

  return (
    <div className="my-4">
      <div className="flex items-center space-x-4">
        {avatar ? (
          <img
            src={`data:image/svg+xml;base64,${avatar}`}
            alt="profile pic"
            className="w-10 sm:w-12 aspect-square"
          />
        ) : (
          <div className="w-10 sm:w-12 aspect-square bg-slate-500 animate-pulse rounded-full"></div>
        )}
        <h1 className="font-semibold text-sm sm:text-base">
          {comment.username}
        </h1>
      </div>
      <div className="border-l ml-5 pl-9 sm:ml-6 sm:pl-10">
        <div className="space-y-4">
          <p className="whitespace-pre-line text-sm sm:text-base">
            {" "}
            {comment.body}
          </p>
          <span className="text-xs text-gray-500">
            {" "}
            {format(comment.createdAt)}
          </span>
          {/* comment action i.e reply | edit | delete */}
          <div className="text-xs flex items-center space-x-8">
            {currentUserId && (
              <button
                onClick={() =>
                  setActiveComment({
                    id: comment.id,
                    type: "reply",
                  })
                }>
                Reply
              </button>
            )}
            {currentUserId === comment.userId && (
              <button
                onClick={() =>
                  setActiveComment({
                    id: comment.id,
                    type: "edit",
                  })
                }>
                Edit
              </button>
            )}
            {currentUserId === comment.userId && (
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            )}
          </div>
          {/* reply comment */}
          {activeComment &&
            activeComment.type === "reply" &&
            activeComment.id === comment.id && (
              <CommentForm
                addComment={(body) =>
                  addComment(body, parentId ? parentId : comment.id)
                }
                label="Reply"
              />
            )}
          {/* edit comment */}
          {activeComment &&
            activeComment.type === "edit" &&
            activeComment.id === comment.id && (
              <CommentForm
                addComment={(body) => updateComment(body, comment.id)}
                label="Update"
                handleCancelButton
                initialText={comment.body}
                handleCancel={() => setActiveComment(null)}
              />
            )}
        </div>

        {replies.length > 0 &&
          replies.map((reply) => (
            <Comment
              key={reply.userId}
              comment={reply}
              replies={[]}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              addComment={addComment}
              updateComment={updateComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              parentId={comment.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
