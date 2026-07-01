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
    <div style={{ marginTop: "30px" }}>
      <h2>Status History</h2>

      {history.length === 0 ? (
        <p>No status changes yet.</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>{item.fromStatus}</strong>
              {"  →  "}
              <strong>{item.toStatus}</strong>
            </p>

            <p>
              Changed By: {item.user?.name}
            </p>

            <small>
              {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}