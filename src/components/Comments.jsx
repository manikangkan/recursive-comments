import { useState, useEffect } from "react";

import {
  createComment,
  getComments as getCommentsApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../api";

import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({ currentUserId }) => {
  const [comments, setComments] = useState([]);

  const [activeComment, setActiveComment] = useState(null);

  // filtering all root comments
  const rootComments = comments.filter((comment) => comment.parentId === null);

  // filtering all replies comes under root comments
  const getReplies = (parentId) => {
    return comments.filter((comment) => comment.parentId === parentId);
  };

  // fetching all comments from api
  useEffect(() => {
    const getComments = async () => {
      const comments = await getCommentsApi();
      setComments(comments);
    };
    getComments();
  }, []);

  // creating new comment
  const addComment = async (body, parentId) => {
    const response = await createComment(body, parentId);
    setComments([response, ...comments]);
    setActiveComment(null);
  };

  // update comment
  const updateComment = async (body, commentId) => {
    await updateCommentApi(body, commentId);

    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, body } : comment
      )
    );
    setActiveComment(null);
  };

  // delet comment
  const deleteComment = async (id) => {
    window.confirm("Are you sure you want to delete this comment?") &&
      (await deleteCommentApi(id));

    const newComments = comments.filter((comment) => comment.id !== id);

    setComments(newComments);
  };

  return (
    <div className="p-8 w-full lg:w-1/2 overflow-y-auto">
      <CommentForm addComment={addComment} label="Comment" />
      {/* rendering all the root comments below */}
      {rootComments.map((rootComment) => (
        <Comment
          key={rootComment.id}
          comment={rootComment}
          // here we are fetching all the replies of a specifc root comment on the fly
          replies={getReplies(rootComment.id)}
          currentUserId={currentUserId}
          deleteComment={deleteComment}
          addComment={addComment}
          updateComment={updateComment}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
        />
      ))}
    </div>
  );
};

export default Comments;
