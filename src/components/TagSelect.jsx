import { useEffect, useState } from "react";
import { getTags } from "../api/tag";
// import "../style/TagSelect.css";

export default function TagSelect({ selected = [], onChange }) {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchTags() {
      try {
        const response = await getTags();

        if (isMounted && response.success) {
          setTags(response.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTags();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleToggle(tagId) {
    if (selected.includes(tagId)) {
      onChange(selected.filter((id) => id !== tagId));
    } else {
      onChange([...selected, tagId]);
    }
  }

  if (loading) {
    return (
      <div className="tag-select">
        <label className="tag-select__label">Tags</label>
        <p className="tag-select__loading">Loading tags...</p>
      </div>
    );
  }

  return (
    <div className="tag-select">
      <label className="tag-select__label">Tags</label>

      {tags.length === 0 ? (
        <p className="tag-select__empty">No tags available.</p>
      ) : (
        <div className="tag-select__container">
          {tags.map((tag) => (
            <label key={tag.id} className="tag-select__item">
              <input
                type="checkbox"
                checked={selected.includes(tag.id)}
                onChange={() => handleToggle(tag.id)}
              />

              <span
                className="tag-select__badge"
                style={{
                  backgroundColor: tag.color,
                }}
              >
                {tag.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
