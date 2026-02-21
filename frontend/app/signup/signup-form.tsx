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
import { SignUpDto } from "@/lib/client";
import { FormState } from "@/lib/types";
import { signUpAction } from "./actions";

export default function SignupForm() {
  const [state, formAction, pending] = useActionState<
    FormState<SignUpDto>,
    FormData
  >(signUpAction, {
    values: {
      firstName: "",
      lastName: "",
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
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue={state.values?.firstName}
          />
          {state.errors?.validation?.fieldErrors?.firstName && (
            <FieldError>
              {state.errors.validation.fieldErrors.firstName}
            </FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue={state.values?.lastName}
          />
          {state.errors?.validation?.fieldErrors?.lastName && (
            <FieldError>
              {state.errors.validation.fieldErrors.lastName}
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
          {state.errors?.validation?.fieldErrors?.email && (
            <FieldError>{state.errors.validation.fieldErrors.email}</FieldError>
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
          {state.errors?.validation?.fieldErrors?.password && (
            <FieldError>
              {state.errors.validation.fieldErrors.password}
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
          {state.errors?.validation?.fieldErrors?.confirmPassword && (
            <FieldError>
              {state.errors.validation.fieldErrors.confirmPassword}
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
        {pending ? <Spinner /> : "Sign Up"}
      </Button>
    </Form>
  );
}
