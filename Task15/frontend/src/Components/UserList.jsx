import React, { useState } from "react";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(start, start + limit);

  return (
    <div className="container">
      <input
        className="search-box"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="user-list">
        {paginatedUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <p className="user-text">
              {user.name} - {user.email}
            </p>

            <div className="btn-group">
              <button className="edit-btn" onClick={() => onEdit(user)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          PREV
        </button>

        <button
          className="page-btn"
          disabled={start + limit >= filteredUsers.length}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default UserList;