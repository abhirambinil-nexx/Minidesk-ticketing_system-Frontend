import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTicket } from "../api/ticket";
import CommentSection from "../components/CommentSection";
import HistorySection from "../components/HistorySection";
// import "../style/TicketDetails.css";

export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTicket();
  }, []);

  async function fetchTicket() {
    try {
      const response = await getTicket(id);

      if (response.success) {
        setTicket(response.data);
      } else {
        setError(response.message || "Ticket not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load ticket.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 className="ticket-details__loading">Loading Ticket...</h2>;
  }

  if (error) {
    return <h2 className="ticket-details__error">{error}</h2>;
  }

  return (
    <div className="ticket-details">
      <h1 className="ticket-details__title">Ticket Details</h1>

      <div className="ticket-details__card">
        <p className="ticket-details__info">
          <strong>Title:</strong> {ticket.title}
        </p>

        <p className="ticket-details__info">
          <strong>Description:</strong>
          <br />
          {ticket.description}
        </p>

        <p className="ticket-details__info">
          <strong>Status:</strong> {ticket.status}
        </p>

        <p className="ticket-details__info">
          <strong>Priority:</strong> {ticket.priority}
        </p>

        <p className="ticket-details__info">
          <strong>Category:</strong> {ticket.category || "-"}
        </p>

        <p className="ticket-details__info">
          <strong>Requester:</strong> {ticket.requester?.name || "-"}
        </p>

        <p className="ticket-details__info">
          <strong>Assigned To:</strong>{" "}
          {ticket.assignee?.name || "Not Assigned"}
        </p>

        <p className="ticket-details__info">
          <strong>Created:</strong>{" "}
          {new Date(ticket.createdAt).toLocaleString()}
        </p>

        <p className="ticket-details__info">
          <strong>Last Updated:</strong>{" "}
          {new Date(ticket.updatedAt).toLocaleString()}
        </p>

        <div className="ticket-details__tags">
          <strong>Tags:</strong>

          <div className="ticket-details__tag-list">
            {ticket.tags?.length ? (
              ticket.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="ticket-details__tag"
                  style={{
                    backgroundColor: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <span className="ticket-details__no-tags">No Tags</span>
            )}
          </div>
        </div>
      </div>

      <div className="ticket-details__actions">
        <Link to={`/tickets/edit/${ticket.id}`}>
          <button className="ticket-details__edit-button">Edit Ticket</button>
        </Link>

        <Link to="/tickets">
          <button className="ticket-details__back-button">Back</button>
        </Link>
      </div>

      <hr className="ticket-details__divider" />

      <CommentSection ticketId={ticket.id} />

      <hr className="ticket-details__divider" />

      <HistorySection ticketId={ticket.id} />
    </div>
  );
}
