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
    <div className="users-page" style={{ padding: "20px" }}>
      <h1 className="users-page__title">User Management</h1>

      <table
        className="users-page__table"
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr className="users-page__row users-page__row--head">
            <th className="users-page__cell">Name</th>
            <th className="users-page__cell">Email</th>
            <th className="users-page__cell">Role</th>
            <th className="users-page__cell">Status</th>
            <th className="users-page__cell">Change Role</th>
            <th className="users-page__cell">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr className="users-page__row" key={user.id}>
              <td className="users-page__cell">{user.name}</td>

              <td className="users-page__cell">{user.email}</td>

              <td className="users-page__cell">{user.role}</td>

              <td className="users-page__cell">
                {user.isActive ? "Active" : "Inactive"}
              </td>

              <td className="users-page__cell">
                <select
                  className="users-page__select"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="requester">Requester</option>

                  <option value="agent">Agent</option>

                  <option value="admin">Admin</option>
                </select>
              </td>

              <td className="users-page__cell">
                <button
                  className="users-page__button"
                  onClick={() => handleToggleUser(user)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
