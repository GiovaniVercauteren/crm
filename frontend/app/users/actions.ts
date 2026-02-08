"use server";

export async function fetchUsers() {
  const response = await fetch("http://localhost:4000/users");
  const users = await response.json();
  return users;
}

export async function createUser(formData: FormData) {
  await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  // optionally: import { revalidatePath } from 'next/cache'; revalidatePath('/users')
}
