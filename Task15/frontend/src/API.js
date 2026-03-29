const BASE_URL = "http://localhost:5000/api/users";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/get-user`);
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${BASE_URL}/create-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${BASE_URL}/update-user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/delete-user/${id}`, {
    method: "DELETE",
  });
  return res.json();
};