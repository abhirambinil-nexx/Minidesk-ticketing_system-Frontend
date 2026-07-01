import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTicket } from "../api/ticket";
import CommentSection from "../components/CommentSection";
import HistorySection from "../components/HistorySection";

export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, []);

  async function fetchTicket() {
    try {
      const response = await getTicket(id);

      if (response.success) {
        setTicket(response.data);
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!ticket) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Ticket Details</h1>

      <p>
        <strong>Title:</strong> {ticket.title}
      </p>

      <p>
        <strong>Description:</strong> {ticket.description}
      </p>

      <p>
        <strong>Status:</strong> {ticket.status}
      </p>

      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>

      <p>
        <strong>Category:</strong> {ticket.category}
      </p>

      <br />
      <hr />

      <CommentSection ticketId={ticket.id} />
      <hr />

      <HistorySection ticketId={ticket.id} />
      <Link to="/tickets">
        <button>Back</button>
      </Link>
    </div>
  );
}
