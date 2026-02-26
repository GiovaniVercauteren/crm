"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { verifyEmailAction } from "./actions";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    const userId = Number(searchParams.get("userId"));
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    if (userId && email && token) {
      startTransition(async () => {
        const result = await verifyEmailAction(userId, email, token);
        setResult(result);
      });
    }
  }, [searchParams]);

  if (isPending) {
    return <p className="mt-16">Verifying your email...</p>;
  }

  if (result === false) {
    return (
      <div className="flex flex-col items-center gap-4 mt-16">
        <p>
          Failed to verify your email. The verification link may be invalid or
          expired.
        </p>
        <p>
          Please request a new verification email from your account settings.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      <p>Your email has been verified successfully!</p>
      <p>You can now close this page and return to the application.</p>
    </div>
  );
}
