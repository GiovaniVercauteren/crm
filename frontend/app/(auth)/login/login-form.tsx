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
import { loginAction } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { zSignInDto } from "@/lib/client/zod.gen";
import { SignInDto } from "@/lib/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorHandledFormSubmit } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const form = useForm<SignInDto>({
    resolver: zodResolver(zSignInDto),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const t = useTranslations("LoginPage");
  const router = useRouter();

  async function onSubmit(data: SignInDto) {
    const { success } = await errorHandledFormSubmit(loginAction, data, form);
    if (success) {
      router.push("/");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend className="text-lg">{t("title")}</FieldLegend>
        <FieldDescription>{t("description")}</FieldDescription>
        <FieldGroup>
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
        </FieldGroup>
        {form.formState.errors.root?.server && (
          <FieldError errors={[form.formState.errors.root.server]} />
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Spinner /> : t("loginButton")}
        </Button>
        <FieldDescription>
          {t("noAccount")} <Link href="/signup">{t("signUp")}</Link>.
        </FieldDescription>
      </FieldSet>
    </form>
  );
}
