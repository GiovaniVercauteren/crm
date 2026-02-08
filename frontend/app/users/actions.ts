"use server";

export async function createUser(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  await fetch("http://backend:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  // optionally: import { revalidatePath } from 'next/cache'; revalidatePath('/users')
}
