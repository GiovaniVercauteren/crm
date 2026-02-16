"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Form from "next/form";
import { useActionState } from "react";
import { LoginFormState } from "./schemas";
import { loginAction } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginFormState, FormData>(
    loginAction,
    {
      values: {
        email: "",
        password: "",
      },
      errors: null,
      success: false,
    },
  );

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
          {state.errors?.properties?.email && (
            <FieldError>
              {state.errors.properties.email.errors.join(", ")}
            </FieldError>
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
          {state.errors?.properties?.password && (
            <FieldError>
              {state.errors.properties.password.errors.join(", ")}
            </FieldError>
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
