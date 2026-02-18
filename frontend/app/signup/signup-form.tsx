"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SignupForm() {
  const [state, formAction, pending] = useActionState<
    SignupFormState,
    FormData
  >(signupAction, {
    values: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: null,
    success: false,
  });

  return (
    <Form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={state.values?.name}
          />
          {state.errors?.properties?.name && (
            <FieldError>
              {state.errors.properties.name.errors.join(", ")}
            </FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state.values?.email}
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
          />
          {state.errors?.properties?.password && (
            <FieldError>
              {state.errors.properties.password.errors.join(", ")}
            </FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            defaultValue={state.values?.confirmPassword}
          />
          {state.errors?.properties?.confirmPassword && (
            <FieldError>
              {state.errors.properties.confirmPassword.errors.join(", ")}
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
        {pending ? <Spinner /> : "Sign Up"}
      </Button>
    </Form>
  );
}
