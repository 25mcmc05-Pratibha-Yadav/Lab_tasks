import "./UserForm.css";
import React, { useState, useEffect } from "react";

const UserForm = ({ addUser, editingUser, updateUser }) => {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      updateUser(editingUser.id, form);
    } else {
      addUser(form);
    }

    setForm({ name: "", email: "" });
  };

  return (
    <form className = "form" onSubmit={handleSubmit}>
      <input className="input"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input className="input"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <button className="submit-btn" type="submit">
        {editingUser ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default UserForm;