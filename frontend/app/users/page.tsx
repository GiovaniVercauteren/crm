import { GetServerSideProps } from "next";
import NewUserForm from "./NewUserForm";

type User = {
  id: string;
  name: string;
  email: string;
};

export default async function Users() {
  const response = await fetch("http://backend:3000/users");
  const users: User[] = await response.json();

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <NewUserForm />
    </div>
  );
}
