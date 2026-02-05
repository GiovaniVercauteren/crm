import { GetServerSideProps } from "next";

type User = {
  id: string;
  name: string;
  email: string;
};

export const getServerSideProps = (async () => {
    const res = await fetch('http://backend:3000/users');
    const users: User[] = await res.json();
    return {
        props: {
            users,
        },
    };
}) satisfies GetServerSideProps<{ users: User[] }>;

export default async function Users({ users }: { users: User[] }) {
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
    </div>
    );
}