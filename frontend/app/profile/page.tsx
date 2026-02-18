"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchProfileAction, logoutAction } from "./actions";
import { Button } from "@/components/ui/button";
import { UserEntity } from "@/lib/client";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserEntity | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await fetchProfileAction();
      setProfile(data);
    });
  }, []);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>
        This is the profile page. You can view your profile information here.
      </p>
      {isPending && <p>Loading...</p>}
      {profile && (
        <div>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
      <Button onClick={logoutAction}>Logout</Button>
    </div>
  );
}
