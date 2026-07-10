import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicket, updateTicket } from "../api/ticket";
import { getMembers } from "../api/spaceMember";
// import "../style/EditTicket.css";

export default function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    status: "open",
    assigneeId: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [spaceMembers, setSpaceMembers] = useState([]);
  const [memberSearch, setMemberSearch] = useState("");

  useEffect(() => {
    fetchTicket();
  }, []);

  async function fetchTicket() {
    try {
      const response = await getTicket(id);

      if (response.success) {
        const ticket = response.data;
        setForm({
          title: ticket.title,
          description: ticket.description,
          category: ticket.category || "",
          priority: ticket.priority,
          status: ticket.status,
          assigneeId: ticket.assigneeId || "",
        });
        setMemberSearch("");

        if (ticket.space?.key) {
          const membersResponse = await getMembers(ticket.space.key);
          if (membersResponse.success) {
            setSpaceMembers(
              (membersResponse.data || []).filter((member) =>
                ["admin", "agent"].includes(member.role),
              ),
            );
          } else {
            setSpaceMembers([]);
          }
        } else {
          setSpaceMembers([]);
        }
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

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and Description are required.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,
        assigneeId:
          form.assigneeId === "" || form.assigneeId === null
            ? null
            : Number(form.assigneeId),
      };

      const response = await updateTicket(id, payload);

      if (response.success) {
        alert("Ticket updated successfully.");
        navigate(`/tickets/${id}`);
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <h2 className="edit-ticket__loading">Loading Ticket...</h2>;
  }

  if (error) {
    return <h2 className="edit-ticket__error">{error}</h2>;
  }

  return (
    <div className="edit-ticket">
      <h1 className="edit-ticket__title">Edit Ticket</h1>

      <form className="edit-ticket__form" onSubmit={handleSubmit}>
        <div className="edit-ticket__field">
          <label className="edit-ticket__label">Title</label>

          <input
            className="edit-ticket__input"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-ticket__field">
          <label className="edit-ticket__label">Description</label>

          <textarea
            className="edit-ticket__textarea"
            name="description"
            rows="6"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-ticket__field">
          <label className="edit-ticket__label">Category</label>

          <input
            className="edit-ticket__input"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="edit-ticket__field">
          <label className="edit-ticket__label">Priority</label>

          <select
            className="edit-ticket__select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="edit-ticket__field">
          <label className="edit-ticket__label">Status</label>

          <select
            className="edit-ticket__select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
            <option value="reopened">Reopened</option>
          </select>
        </div>

        <div className="edit-ticket__field">
          <label className="edit-ticket__label">Assign To</label>

          <input
            className="edit-ticket__input"
            type="search"
            placeholder="Search space members..."
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
          />

          <select
            className="edit-ticket__select"
            name="assigneeId"
            value={form.assigneeId ?? ""}
            onChange={handleChange}
          >
            <option value="">Unassigned</option>

            {spaceMembers
              .filter((member) => {
                if (!memberSearch.trim()) return true;
                const search = memberSearch.toLowerCase();
                const name = (member.name || "").toLowerCase();
                const email = (member.email || "").toLowerCase();
                return (
                  name.includes(search) ||
                  email.includes(search) ||
                  String(member.role || "").toLowerCase().includes(search)
                );
              })
              .map((member) => (
                <option key={member.id} value={member.userId || member.id}>
                  {member.name || member.user?.name || "Unknown"} (
                  {member.role})
                </option>
              ))}
          </select>
        </div>

        <div className="edit-ticket__actions">
          <button
            className="edit-ticket__button"
            type="submit"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Ticket"}
          </button>

          <button
            type="button"
            className="edit-ticket__cancel"
            onClick={() => navigate(`/tickets/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
