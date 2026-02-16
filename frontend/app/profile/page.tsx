"use client";

import { useEffect, useState } from "react";
import { getPermissionsAction, getProfileAction } from "./actions";

export default function ProfilePage() {
  const [profile, setProfile] = useState<unknown>(null);
  const [permissions, setPermissions] = useState<unknown>(null);

  useEffect(() => {
    async function fetchProfile() {
      setProfile(null);
      const result = await getProfileAction();
      setProfile(result);
    }
    fetchProfile();

    async function fetchPermissions() {
      setPermissions(null);
      const result = await getPermissionsAction();
      setPermissions(result);
    }
    fetchPermissions();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>
        This is the profile page. You can view your profile information here.
      </p>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <pre>{JSON.stringify(permissions, null, 2)}</pre>
    </div>
  );
}
