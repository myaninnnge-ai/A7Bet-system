import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:5000/api/test";

  // Load data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new record
  const addData = async () => {
    if (!name.trim()) return;
    try {
      await axios.post(API_URL, { name });
      setName("");
      fetchData();
    } catch (err) {
      console.error("Error adding data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Supabase API Test</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "5px", marginRight: "5px" }}
        />
        <button onClick={addData}>Add</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
