type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
};

export const dynamic = "force-dynamic";

export default async function Users() {
  return (
    <div>
      <h1>User List</h1>
      <ul></ul>
    </div>
  );
}
