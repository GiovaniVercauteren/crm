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
import { FormState } from "@/lib/types";
import { SignInDto } from "@/lib/client";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<
    FormState<SignInDto>,
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
          {state.errors?.validation?.fieldErrors?.email && (
            <FieldError>
              {state.errors.validation.fieldErrors.email.join(", ")}
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
          {state.errors?.validation?.fieldErrors?.password && (
            <FieldError>
              {state.errors.validation.fieldErrors.password.join(", ")}
            </FieldError>
          )}
        </Field>
        <Field>
          {state.errors?.validation?.formErrors && (
            <FieldError>
              {state.errors.validation.formErrors.join(", ")}
            </FieldError>
          )}
          {state.errors?.server && (
            <FieldError>{state.errors.server}</FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={pending}>
        {pending ? <Spinner /> : "Login"}
      </Button>
    </Form>
  );
}
