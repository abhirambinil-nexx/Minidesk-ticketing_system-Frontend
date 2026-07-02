import { useEffect, useState } from "react";
import { getHistory } from "../api/history";

export default function HistorySection({ ticketId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, [ticketId]);

  async function fetchHistory() {
    try {
      const response = await getHistory(ticketId);

      if (response.success) {
        setHistory(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="history-section" style={{ marginTop: "30px" }}>
      <h2 className="history-section__title">Status History</h2>

      {history.length === 0 ? (
        <p className="history-section__empty">No status changes yet.</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            className="history-section__item"
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p className="history-section__statuses">
              <strong>{item.fromStatus}</strong>
              {"  →  "}
              <strong>{item.toStatus}</strong>
            </p>

            <p className="history-section__meta">
              Changed By: {item.user?.name}
            </p>

            <small className="history-section__date">
              {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
