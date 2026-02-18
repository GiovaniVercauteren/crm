"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logoutAction } from "./actions/logout.action";

export default function AppHeader() {
  const router = useRouter();

  function handleLogout() {
    logoutAction();
    router.push("/login");
  }

  return (
    <header className="bg-sky-200 text-black p-4 flex items-center">
      <h1 className="text-xl font-bold">CRM Application</h1>
      <Button variant="outline" className="ml-auto" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
