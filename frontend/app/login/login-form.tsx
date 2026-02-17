"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Form from "next/form";
import { useActionState } from "react";
import { loginAction } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormState, Infer } from "@/lib/types";
import { SignInDto } from "@/lib/client.generated";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<
    FormState<Infer<typeof SignInDto>>,
    FormData
  >(loginAction, {
    values: {
      email: "",
      password: "",
    },
    errors: null,
    success: false,
  });

  return (
    <Form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state.values?.email}
            disabled={pending}
          />
          {state.errors?.email && (
            <FieldError>{state.errors.email.join(", ")}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={state.values?.password}
            disabled={pending}
          />
          {state.errors?.password && (
            <FieldError>{state.errors.password.join(", ")}</FieldError>
          )}
        </Field>
        <Field>
          {state.errors?.errors && (
            <FieldError>{state.errors.errors.join(", ")}</FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={pending}>
        {pending ? <Spinner /> : "Login"}
      </Button>
    </Form>
  );
}
