"use client";

import { useState } from "react";
import { createUser } from "./actions";

export default function NewUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    await createUser(formData);
    setName("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded-md p-4 mt-4"
    >
      <h2>Create New User</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border border-gray-300 rounded-md p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        className="border border-gray-300 rounded-md p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <button
        className="bg-blue-500 text-white rounded-md p-2 mt-2"
        type="submit"
      >
        Create User
      </button>
    </form>
  );
}
