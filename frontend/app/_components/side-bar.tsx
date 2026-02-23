export default function SideBar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/customers"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Customers
            </a>
          </li>
          <li>
            <a
              href="/reports"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Reports
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
