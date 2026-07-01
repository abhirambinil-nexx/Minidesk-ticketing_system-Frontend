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
    <form onSubmit={handleSubmit}>
      <textarea
        rows="4"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <br />

      <button type="submit">Add Comment</button>
    </form>
  );
}
