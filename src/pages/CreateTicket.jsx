import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTicket } from "../api/ticket";
import { getSpaces } from "../api/space";
import { getMembers } from "../api/spaceMember";

import TagSelect from "../components/TagSelect";

import "../style/CreateTicket.css";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState([]);
  const [spaceMembers, setSpaceMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    spaceId: "",
    assigneeId: "",
    dueDate: "",
    tags: [],
  });

  useEffect(() => {
    fetchSpaces();
  }, []);

  useEffect(() => {
    if (form.spaceId) {
      fetchSpaceMembers(form.spaceId);
    } else {
      setSpaceMembers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.spaceId, spaces]);

  async function fetchSpaces() {
    try {
      const response = await getSpaces();

      if (response.success) {
        setSpaces(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchSpaceMembers(spaceId) {
    if (!spaceId) {
      setSpaceMembers([]);
      return;
    }

    try {
      setMembersLoading(true);
      const selectedSpace = spaces.find((space) => String(space.id) === String(spaceId));

      if (!selectedSpace?.key) {
        setSpaceMembers([]);
        return;
      }

      const response = await getMembers(selectedSpace.key);

      if (response.success) {
        const members = Array.isArray(response.data) ? response.data : [];
        setSpaceMembers(
          members.filter((member) =>
            ["admin", "agent"].includes(member.role),
          ),
        );
      } else {
        setSpaceMembers([]);
      }
    } catch (err) {
      console.error(err);
      setSpaceMembers([]);
    } finally {
      setMembersLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "spaceId") {
      setForm((prev) => ({
        ...prev,
        spaceId: value,
        assigneeId: "",
      }));
      fetchSpaceMembers(value);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await createTicket({
        ...form,
        spaceId: Number(form.spaceId),
        assigneeId: form.assigneeId ? Number(form.assigneeId) : null,
      });

      if (!response.success) {
        alert(response.message);
        return;
      }

      alert("Ticket created successfully!");
      navigate("/tickets");
    } catch (error) {
      console.error(error);
      alert("Error creating ticket");
    }
  }

  return (
    <div className="create-ticket">
      <div className="create-ticket__card">
        <h1 className="create-ticket__title">Create Ticket</h1>

        <form className="create-ticket__form" onSubmit={handleSubmit}>
          {/* Title */}

          <div className="create-ticket__field">
            <label className="create-ticket__label">
              Title
              <span className="required">*</span>
            </label>

            <input
              className="create-ticket__input"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              required
            />
          </div>

          {/* Description */}

          <div className="create-ticket__field">
            <label className="create-ticket__label">
              Description
              <span className="required">*</span>
            </label>

            <textarea
              className="create-ticket__textarea"
              name="description"
              rows="6"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              required
            />
          </div>

          {/* Category */}

          <div className="create-ticket__field">
            <label className="create-ticket__label">Category</label>

            <input
              className="create-ticket__input"
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Bug, Feature, Task..."
            />
          </div>

          {/* Space */}

          <div className="create-ticket__field">
            <label className="create-ticket__label">
              Space
              <span className="required">*</span>
            </label>

            <select
              className="create-ticket__select"
              name="spaceId"
              value={form.spaceId}
              onChange={handleChange}
              required
            >
              <option value="">Select Space</option>

              {spaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.key} — {space.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}

          <div className="create-ticket__field">
            <label className="create-ticket__label">Priority</label>

            <select
              className="create-ticket__select"
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

          {/* Assignee */}

          <div className="create-ticket__field">
            <label className="create-ticket__label">Assignee</label>

            <select
              className="create-ticket__select"
              name="assigneeId"
              value={form.assigneeId}
              onChange={handleChange}
              disabled={!form.spaceId || membersLoading}
            >
              <option value="">
                {!form.spaceId
                  ? "Select Space First"
                  : membersLoading
                    ? "Loading Members..."
                    : "Unassigned"}
              </option>

              {spaceMembers.map((member) => (
                <option
                  key={member.user?.id || member.id}
                  value={member.user?.id || member.id}
                >
                  {member.user?.name || member.name || "Unknown User"} ({member.role})
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}

          <div className="create-ticket__field">
            <label className="create-ticket__label">Due Date</label>

            <input
              className="create-ticket__input"
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          {/* Tags */}

          

          {/* Buttons */}

          <div className="create-ticket__actions">
            <button
              type="button"
              className="create-ticket__cancel"
              onClick={() => navigate("/tickets")}
            >
              Cancel
            </button>

            <button type="submit" className="create-ticket__button">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
