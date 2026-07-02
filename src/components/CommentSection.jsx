import { useEffect, useState } from "react";
import { getComments, createComment } from "../api/comment";
import CommentForm from "./CommentForm";

export default function CommentSection({ ticketId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadComments();
  }, [ticketId]);

  async function loadComments() {
    const response = await getComments(ticketId);

    if (response.success) {
      setComments(response.data);
    }
  }

  async function handleAdd(comment) {
    const response = await createComment(ticketId, comment);

    if (response.success) {
      loadComments();
    } else {
      alert(response.message);
    }
  }

  return (
    <div className="comment-section">
      <h2 className="comment-section__title">Comments</h2>

      <CommentForm onAdd={handleAdd} />

      <br />

      {comments.length === 0 ? (
        <p className="comment-section__empty">No comments yet.</p>
      ) : (
        comments.map((item) => (
          <div
            key={item.id}
            className="comment-section__item"
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4 className="comment-section__author">{item.author?.name}</h4>

            <p className="comment-section__body">{item.body}</p>

            <small className="comment-section__meta">
              {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
