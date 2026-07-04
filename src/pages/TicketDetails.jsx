// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { deleteTicket, getTicket } from "../api/ticket";
// import "../style/TicketDetails.css";

// export default function TicketDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     fetchTicket();
//   }, [id]);

//   async function fetchTicket() {
//     try {
//       setLoading(true);
//       const response = await getTicket(id);

//       if (response?.success) {
//         setTicket(response.data);
//       } else {
//         setError(response?.message || "Ticket not found");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load ticket");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete() {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this ticket?",
//     );

//     if (!confirmDelete) return;

//     try {
//       setDeleting(true);
//       const response = await deleteTicket(id);

//       if (response?.success) {
//         navigate("/tickets");
//       } else {
//         setError(response?.message || "Unable to delete ticket");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Unable to delete ticket");
//     } finally {
//       setDeleting(false);
//     }
//   }

//   const getPriorityColor = (priority) => {
//     const colors = {
//       low: "#4caf50",
//       medium: "#ff9800",
//       high: "#f44336",
//       urgent: "#9c27b0",
//     };
//     return colors[priority] || "#999";
//   };

//   if (loading) {
//     return <h2 className="tickets__loading">Loading ticket...</h2>;
//   }

//   if (error) {
//     return <h2 className="tickets__empty">{error}</h2>;
//   }

//   if (!ticket) {
//     return <h2 className="tickets__empty">Ticket not found.</h2>;
//   }

//   return (
//     <div className="tickets-container">
//       <div className="tickets__header">
//         <div>
//           <h1 className="tickets__title">Ticket #{ticket.id}</h1>
//           <p className="tickets__subtitle">{ticket.title}</p>
//         </div>

//         <div className="tickets__header-actions">
//           <Link to="/tickets">
//             <button className="tickets__create-btn" type="button">
//               Back to Tickets
//             </button>
//           </Link>
//           <Link to={`/tickets/edit/${ticket.id}`}>
//             <button className="tickets__create-btn" type="button">
//               Edit Ticket
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="ticket-details">
//         <div className="ticket-details__card">
//           <div className="ticket-details__field">
//             <span className="ticket-details__label">Status</span>
//             <span className="tickets__status-badge">{ticket.status}</span>
//           </div>

//           <div className="ticket-details__field">
//             <span className="ticket-details__label">Priority</span>
//             <span
//               className="tickets__priority-badge"
//               style={{ backgroundColor: getPriorityColor(ticket.priority) }}
//             >
//               {ticket.priority}
//             </span>
//           </div>

//           <div className="ticket-details__field">
//             <span className="ticket-details__label">Category</span>
//             <span className="ticket-details__value">{ticket.category || "-"}</span>
//           </div>

//           <div className="ticket-details__field">
//             <span className="ticket-details__label">Requester</span>
//             <span className="ticket-details__value">
//               {ticket.requester?.name || "-"}
//             </span>
//           </div>

//           <div className="ticket-details__field">
//             <span className="ticket-details__label">Assignee</span>
//             <span className="ticket-details__value">
//               {ticket.assignee?.name || "Unassigned"}
//             </span>
//           </div>

//           <div className="ticket-details__field">
//             <span className="ticket-details__label">Created</span>
//             <span className="ticket-details__value">
//               {ticket.createdAt
//                 ? new Date(ticket.createdAt).toLocaleString()
//                 : "-"}
//             </span>
//           </div>

//           <div className="ticket-details__field ticket-details__field--stacked">
//             <span className="ticket-details__label">Description</span>
//             <p className="ticket-details__description">
//               {ticket.description || "No description provided."}
//             </p>
//           </div>

//           <div className="ticket-details__actions">
//             <button
//               className="tickets__action-btn tickets__action-btn--delete"
//               onClick={handleDelete}
//               disabled={deleting}
//               type="button"
//             >
//               {deleting ? "Deleting..." : "Delete Ticket"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTicket, getTicket } from "../api/ticket";
import "../style/TicketDetails.css";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchTicket() {
    try {
      setLoading(true);
      const response = await getTicket(id);

      if (response.success) {
        setTicket(response.data);
      } else {
        setError(response.message || "Ticket not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      setDeleting(true);
      const response = await deleteTicket(id);

      if (response.success) {
        navigate("/tickets");
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to delete ticket");
    } finally {
      setDeleting(false);
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "low":
        return "#4caf50";
      case "medium":
        return "#ff9800";
      case "high":
        return "#f44336";
      case "urgent":
        return "#9c27b0";
      default:
        return "#999";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "open":
        return "#2196f3";
      case "in_progress":
        return "#ff9800";
      case "resolved":
        return "#4caf50";
      case "closed":
        return "#757575";
      default:
        return "#999";
    }
  }

  if (loading) {
    return <h2 className="ticket-loading">Loading ticket...</h2>;
  }

  if (error) {
    return <h2 className="ticket-error">{error}</h2>;
  }

  if (!ticket) {
    return <h2 className="ticket-error">Ticket not found.</h2>;
  }

  return (
    <div className="ticket-page">
      {/* Header */}
      <div className="ticket-header">
        <div>
          <span className="ticket-id">Ticket #{ticket.id}</span>
          <h1 className="ticket-title">{ticket.title}</h1>
          <div className="ticket-header-badges">
            <span
              className="ticket-status"
              style={{
                backgroundColor: getStatusColor(ticket.status),
              }}
            >
              {ticket.status.replace("_", " ").toUpperCase()}
            </span>
            <span
              className="ticket-priority"
              style={{
                backgroundColor: getPriorityColor(ticket.priority),
              }}
            >
              {ticket.priority.toUpperCase()}
            </span>
            <span className="ticket-category">
              {ticket.category || "General"}
            </span>
          </div>
        </div>

        <div className="ticket-header-actions">
          <Link to="/tickets">
            <button className="btn-secondary">← Back</button>
          </Link>

          <Link to={`/tickets/edit/${ticket.id}`}>
            <button className="btn-primary">Edit</button>
          </Link>

          <button
            className="btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="ticket-layout">
        {/* LEFT SIDE */}
        <div className="ticket-main">
          {/* Description */}
          <section className="ticket-card">
            <h2>Description</h2>
            <p>{ticket.description || "No description provided."}</p>
          </section>

          {/* Comments */}
          <section className="ticket-card">
            <div className="ticket-section-header">
              <h2>Comments</h2>
              <button className="btn-primary btn-small">Add Comment</button>
            </div>

            {ticket.comments?.length ? (
              ticket.comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <div className="comment-header">
                    <strong>{comment.user?.name}</strong>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              ))
            ) : (
              <div className="empty-section">No comments yet.</div>
            )}
          </section>

          {/* Activity */}
          <section className="ticket-card">
            <h2>Activity</h2>
            <div className="empty-section">No activity available.</div>
          </section>

          {/* Status History */}
          <section className="ticket-card">
            <h2>Status History</h2>
            <div className="empty-section">No status history available.</div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="ticket-sidebar">
          <div className="ticket-card">
            <h2>Details</h2>

            <div className="detail-row">
              <span>Status</span>
              <span
                className="ticket-status"
                style={{
                  backgroundColor: getStatusColor(ticket.status),
                }}
              >
                {ticket.status.replace("_", " ")}
              </span>
            </div>

            <div className="detail-row">
              <span>Priority</span>
              <span
                className="ticket-priority"
                style={{
                  backgroundColor: getPriorityColor(ticket.priority),
                }}
              >
                {ticket.priority}
              </span>
            </div>

            <div className="detail-row">
              <span>Category</span>
              <span>{ticket.category || "-"}</span>
            </div>

            <div className="detail-row">
              <span>Requester</span>
              <span>{ticket.requester?.name || "-"}</span>
            </div>

            <div className="detail-row">
              <span>Assignee</span>
              <span>{ticket.assignee?.name || "Unassigned"}</span>
            </div>

            <div className="detail-row">
              <span>Created</span>
              <span>
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleString()
                  : "-"}
              </span>
            </div>

            <div className="detail-row">
              <span>Updated</span>
              <span>
                {ticket.updatedAt
                  ? new Date(ticket.updatedAt).toLocaleString()
                  : "-"}
              </span>
            </div>

            <div className="detail-row">
              <span>Ticket ID</span>
              <span>#{ticket.id}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="ticket-card">
            <h2>Tags</h2>
            <div className="ticket-tags">
              {ticket.tags?.length ? (
                ticket.tags.map((tag) => (
                  <span key={tag.id} className="ticket-tag">
                    {tag.name}
                  </span>
                ))
              ) : (
                <span>No Tags</span>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
