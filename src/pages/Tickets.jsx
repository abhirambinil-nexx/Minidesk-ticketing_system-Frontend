import { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../api/ticket";
import { Link } from "react-router-dom";
import "../style/Tickets.css";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    try {
      const response = await getTickets();

      if (response.success) {
        setTickets(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteTicket(id);

      if (response.success) {
        setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete ticket");
    }
  }

  if (loading) {
    return <h2 className="tickets-page__loading">Loading tickets...</h2>;
  }

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <h1 className="tickets-header__title">Tickets</h1>

        <Link className="tickets-header__link" to="/tickets/new">
          <button className="tickets-header__button">Create Ticket</button>
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p className="tickets-page__empty">No tickets found.</p>
      ) : (
        <table
          className="tickets-page__table"
          border="1"
          cellPadding="10"
          width="100%"
        >
          <thead>
            <tr className="tickets-page__row tickets-page__row--head">
              <th className="tickets-page__cell">ID</th>
              <th className="tickets-page__cell">Title</th>
              <th className="tickets-page__cell">Status</th>
              <th className="tickets-page__cell">Priority</th>
              <th className="tickets-page__cell">Category</th>
              <th className="tickets-page__cell">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr className="tickets-page__row" key={ticket.id}>
                <td className="tickets-page__cell">{ticket.id}</td>
                <td className="tickets-page__cell">{ticket.title}</td>
                <td className="tickets-page__cell">{ticket.status}</td>
                <td className="tickets-page__cell">{ticket.priority}</td>
                <td className="tickets-page__cell">{ticket.category}</td>

                <td className="tickets-page__cell tickets-page__cell--actions">
                  <Link
                    className="tickets-page__action-link"
                    to={`/tickets/${ticket.id}`}
                  >
                    <button className="tickets-page__action-button">
                      View
                    </button>
                  </Link>

                  <Link
                    className="tickets-page__action-link"
                    to={`/tickets/edit/${ticket.id}`}
                  >
                    <button className="tickets-page__action-button">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="tickets-page__action-button"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tickets;
