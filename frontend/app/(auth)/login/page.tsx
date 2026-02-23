import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Card className="m-4 mt-8 md:max-w-lg md:w-lg">
      <CardHeader>Login</CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
