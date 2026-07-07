import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTicket } from "../api/ticket";
import { getSpaces } from "../api/space";

import TagSelect from "../components/TagSelect";

import "../style/CreateTicket.css";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    spaceId: "",
    tags: [],
  });

  useEffect(() => {
    fetchSpaces();
  }, []);

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

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await createTicket(form);

      console.log(response);

      if (!response.success) {
        alert(response.message);
        return;
      }

      alert("Ticket created successfully!");

      // Return to the ticket list
      navigate("/tickets");
    } catch (error) {
      console.error(error);
      alert("Error creating ticket");
    }
  }

  return (
    <div className="create-ticket">
      <h1 className="create-ticket__title">Create Ticket</h1>

      <form className="create-ticket__form" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="create-ticket__field">
          <label>Title</label>

          <input
            className="create-ticket__input"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="create-ticket__field">
          <label>Description</label>

          <textarea
            className="create-ticket__textarea"
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="create-ticket__field">
          <label>Category</label>

          <input
            className="create-ticket__input"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        {/* Space */}
        <div className="create-ticket__field">
          <label>Space</label>

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
          <label>Priority</label>

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

        {/* Tags */}
        <div className="create-ticket__field">
          <label>Tags</label>

          <TagSelect
            selected={form.tags}
            onChange={(tags) =>
              setForm((prev) => ({
                ...prev,
                tags,
              }))
            }
          />
        </div>

        <button className="create-ticket__button" type="submit">
          Create Ticket
        </button>
      </form>
    </div>
  );
}
