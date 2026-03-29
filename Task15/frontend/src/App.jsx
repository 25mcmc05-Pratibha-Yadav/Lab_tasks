import React, { useEffect, useState } from "react";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import {
  getUsers,
  createUser,
  updateUser as apiUpdate,
  deleteUser as apiDelete,
} from "./API";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };


  const addUser = async (user) => {
    const tempId = Date.now();
    const optimisticUser = { id: tempId, ...user };

    setUsers([...users, optimisticUser]);

    try {
      const saved = await createUser(user);
      setUsers((prev) =>
        prev.map((u) => (u.id === tempId ? saved : u))
      );
    } catch {
      setUsers(users); 
    }
  };

 
  const updateUser = async (id, updatedUser) => {
    const oldUsers = [...users];

    setUsers(users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u)));

    try {
      await apiUpdate(id, updatedUser);
      setEditingUser(null);
    } catch {
      setUsers(oldUsers); 
    }
  };

  
  const deleteUser = async (id) => {
    const oldUsers = [...users];

    setUsers(users.filter((u) => u.id !== id));

    try {
      await apiDelete(id);
    } catch {
      setUsers(oldUsers); 
    }
  };

  return (
    <div>
      <h2>CRUD App</h2>

      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />

      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={deleteUser}
      />
    </div>
  );
}

export default App;