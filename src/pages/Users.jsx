import { useEffect, useState } from "react";

import {
  getUsers,
  changeUserRole,
  activateUser,
  deactivateUser,
} from "../api/user";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const data = await getUsers();

    if (data.success) {
      setUsers(data.data);
    }
  }

  async function handleRoleChange(id, role) {
    await changeUserRole(id, role);
    fetchUsers();
  }

  async function handleToggleUser(user) {
    if (user.isActive) {
      await deactivateUser(user.id);
    } else {
      await activateUser(user.id);
    }

    fetchUsers();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Change Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                {user.isActive ? "Active" : "Inactive"}
              </td>

              <td>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(
                      user.id,
                      e.target.value
                    )
                  }
                >
                  <option value="requester">
                    Requester
                  </option>

                  <option value="agent">
                    Agent
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </td>

              <td>
                <button
                  onClick={() =>
                    handleToggleUser(user)
                  }
                >
                  {user.isActive
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}