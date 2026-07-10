import { useEffect, useState } from "react";
import { getTickets, updateTicket, deleteTicket } from "../api/ticket";
import { Link } from "react-router-dom";
import TicketDrawer from "../components/TicketDrawer/TicketDrawer";
import "../style/Tickets.css";

function Tickets() {
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statuses = ["open", "in_progress", "resolved", "closed"];

  useEffect(() => {
    fetchTickets();
  }, [search, priority]);

  async function fetchTickets() {
    try {
      setLoading(true);
      const response = await getTickets({
        search,
        priority,
        limit: 1000,
      });

      if (response?.success) {
        setAllTickets(response?.data || []);
      } else {
        setError(response?.message || "Failed to fetch tickets");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(ticketId, newStatus) {
    try {
      const response = await updateTicket(ticketId, { status: newStatus });

      if (response.success) {
        setAllTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? response.data : t)),
        );
        setSuccess("Ticket status updated");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update status");
    }
  }

  function handleOpenTicket(ticket) {
    setSelectedTicket(ticket);
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setSelectedTicket(null);
    setDrawerOpen(false);
  }

  function handleTicketUpdated(updatedTicket) {
    setAllTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket,
      ),
    );
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteTicket(id);

      if (response.success) {
        setAllTickets((prev) => prev.filter((t) => t.id !== id));
        setSuccess("Ticket deleted");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to delete ticket");
    }
  }

  const ticketsByStatus = {};
  statuses.forEach((s) => {
    ticketsByStatus[s] = allTickets.filter((t) => t.status === s);
  });

  if (loading) {
    return <h2 className="tickets__loading">Loading tickets...</h2>;
  }

  return (
    <div className="tickets-container">
      <div className="tickets__header">
        <h1 className="tickets__title">Tickets</h1>
      </div>

      {error && (
        <div className="tickets__error-banner">
          {error}
          <button
            className="tickets__banner-close"
            onClick={() => setError("")}
          >
            ✕
          </button>
        </div>
      )}
      {success && (
        <div className="tickets__success-banner">
          {success}
          <button
            className="tickets__banner-close"
            onClick={() => setSuccess("")}
          >
            ✕
          </button>
        </div>
      )}

      <div className="tickets__controls">
        <div className="tickets__filters">
          <input
            type="text"
            placeholder="🔍 Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tickets__search"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="tickets__select"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="kanban-board">
        {statuses.map((status) => (
          <div key={status} className="kanban-column">
            <div className="kanban-column__header">
              <h3 className="kanban-column__title">
                {status === "in_progress"
                  ? "In Progress"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </h3>
              <span className="kanban-column__count">
                {ticketsByStatus[status].length}
              </span>
            </div>

            <div className="kanban-column__cards">
              {ticketsByStatus[status].length === 0 ? (
                <p className="kanban-column__empty">No tickets</p>
              ) : (
                ticketsByStatus[status].map((ticket) => (
                  <KanbanCard
                    key={ticket.id}
                    ticket={ticket}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onOpenTicket={handleOpenTicket}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <TicketDrawer
        open={drawerOpen}
        ticket={selectedTicket}
        onClose={handleDrawerClose}
        onTicketUpdated={handleTicketUpdated}
      />
    </div>
  );
}

function KanbanCard({ ticket, onStatusChange, onDelete, onOpenTicket }) {
  const [showMenu, setShowMenu] = useState(false);
  const statuses = ["open", "in_progress", "resolved", "closed"];
  const nextStatuses = statuses.slice(statuses.indexOf(ticket.status) + 1);

  const getPriorityColor = (priority) => {
    const colors = {
      low: "#4caf50",
      medium: "#ff9800",
      high: "#f44336",
      urgent: "#9c27b0",
    };
    return colors[priority] || "#999";
  };

  return (
    <div
      className="kanban-card"
      onClick={() => onOpenTicket(ticket)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenTicket(ticket);
        }
      }}
    >
      <div className="kanban-card__header">
        <div>
          <h4 className="kanban-card__id">
            {ticket.ticketKey || `#${ticket.id}`}
          </h4>
          <p className="kanban-card__ticket-title">{ticket.title}</p>
        </div>
        <button
          type="button"
          className="kanban-card__menu-btn"
          onClick={(event) => {
            event.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          ⋮
        </button>
        {showMenu && (
          <div className="kanban-card__menu">
            <button
              type="button"
              className="kanban-card__menu-item"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(ticket.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="kanban-card__meta">
        <span
          className="kanban-card__priority-badge"
          style={{ backgroundColor: getPriorityColor(ticket.priority) }}
        >
          {ticket.priority?.charAt(0).toUpperCase() +
            ticket.priority?.slice(1) || "Medium"}
        </span>
        <span className="kanban-card__assignee">
          {ticket.assignee?.name?.charAt(0)?.toUpperCase() || "U"}
        </span>
      </div>

      <div className="kanban-card__field">
        <strong className="kanban-card__label">Due:</strong>
        <span className="kanban-card__value">
          {ticket.dueDate ? new Date(ticket.dueDate).toLocaleDateString() : "—"}
        </span>
      </div>

      <hr className="kanban-card__divider" />

      <div className="kanban-card__actions">
        <button
          type="button"
          className="kanban-card__view-btn"
          onClick={(event) => {
            event.stopPropagation();
            onOpenTicket(ticket);
          }}
        >
          Open
        </button>

        {nextStatuses.length > 0 && (
          <button
            type="button"
            className="kanban-card__move-btn"
            onClick={(event) => {
              event.stopPropagation();
              onStatusChange(ticket.id, nextStatuses[0]);
            }}
          >
            Move →
          </button>
        )}
      </div>
    </div>
  );
}

export default Tickets;
