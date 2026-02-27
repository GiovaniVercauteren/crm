"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchAccountAction } from "./actions";
import { UserEntity } from "@/lib/client";
import AccountForm from "./account-form";

export default function AccountPage() {
  const [profile, setProfile] = useState<UserEntity | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  function fetchAccount() {
    startTransition(async () => {
      const { data } = await fetchAccountAction();
      setProfile(data);
    });
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  if (isPending || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AccountForm user={profile} />
    </div>
  );
}
