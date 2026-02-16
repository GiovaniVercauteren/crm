"use client";
import { startTransition } from "react";
import { Button } from "../components/ui/button";
import { logout } from "./actions";

export default function AppHeader() {
  function handleLogout() {
    startTransition(() => {
      logout();
    });
  }

  return (
    <div className="w-screen flex">
      Header
      <Button variant="outline" className="ml-auto" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
