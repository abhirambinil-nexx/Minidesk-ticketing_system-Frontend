import { useState } from "react";

export default function CommentForm({ onAdd }) {
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!comment.trim()) return;

    onAdd(comment);

    setComment("");
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-form__textarea"
        rows="4"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <br />

      <button className="comment-form__submit" type="submit">
        Add Comment
      </button>
    </form>
  );
}
