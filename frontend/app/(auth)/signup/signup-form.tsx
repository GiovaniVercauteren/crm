"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SignUpDto } from "@/lib/client";
import { signUpAction } from "./actions";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSignUpDto } from "@/lib/client/zod.gen";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const form = useForm<SignUpDto>({
    resolver: zodResolver(
      zSignUpDto.refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }),
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const t = useTranslations("SignupPage");
  const router = useRouter();

  async function onSubmit(data: SignUpDto) {
    try {
      await signUpAction(data);
      router.push("/login");
    } catch (error) {
      form.setError("root.server", {
        message: await handleError(error),
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend className="text-lg">{t("title")}</FieldLegend>
        <FieldDescription>{t("description")}</FieldDescription>
        <FieldGroup>
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  {t("firstNameLabel")}
                </FieldLabel>
                <Input
                  id={field.name}
                  {...field}
                  type="text"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  {t("lastNameLabel")}
                </FieldLabel>
                <Input
                  id={field.name}
                  {...field}
                  type="text"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t("emailLabel")}</FieldLabel>
                <Input
                  id={field.name}
                  {...field}
                  type="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  {t("passwordLabel")}
                </FieldLabel>
                <Input
                  id={field.name}
                  {...field}
                  type="password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  {t("confirmPasswordLabel")}
                </FieldLabel>
                <Input
                  id={field.name}
                  {...field}
                  type="password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        {form.formState.errors.root?.server && (
          <FieldError errors={[form.formState.errors.root.server]} />
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Spinner /> : t("signupButton")}
        </Button>
        <FieldDescription>
          {t("haveAccount")} <Link href="/login">{t("login")}</Link>.
        </FieldDescription>
      </FieldSet>
    </form>
  );
}
