import { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../api/ticket";
import { Link } from "react-router-dom";

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
    return <h2>Loading tickets...</h2>;
  }

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <h1>Tickets</h1>

        <Link to="/tickets/new">
          <button>Create Ticket</button>
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.category}</td>

                <td>
                  <Link to={`/tickets/${ticket.id}`}>
                    <button>View</button>
                  </Link>

                  <Link to={`/tickets/edit/${ticket.id}`}>
                    <button>Edit</button>
                  </Link>

                  <button onClick={() => handleDelete(ticket.id)}>
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
  