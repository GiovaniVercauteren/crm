import { getUser } from "@/lib/auth";
import { Role } from "@/lib/client";
import { use, useLayoutEffect, useState } from "react";

export default function RoleProtected({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: Role;
}) {
  const [role, setRole] = useState<Role | null>(null);

  useLayoutEffect(() => {
    const fetchUserRole = async () => {
      const user = await getUser();
      setRole(user?.role || null);
    };

    fetchUserRole();
  }, []);

  if (requiredRole && role !== requiredRole) {
    return <></>;
  }

  return <>{children}</>;
}
