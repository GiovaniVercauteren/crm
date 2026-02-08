import NewUserForm from "./NewUserForm";
import { fetchUsers } from "./actions";

type User = {
  id: string;
  name: string;
  email: string;
};

export const dynamic = "force-dynamic";

export default async function Users() {
  const users = await fetchUsers();

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
