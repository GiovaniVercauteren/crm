import Form from "next/form";
import { UpdateUserDto, UserEntity } from "@/lib/client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BadgeX } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zUpdateUserDto } from "@/lib/client/zod.gen";
import { sendVerificationEmailAction, updateAccountAction } from "./actions";
import { handleError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AccountForm({ user }: { user: UserEntity }) {
  const form = useForm({
    resolver: zodResolver(zUpdateUserDto),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    },
  });
  const t = useTranslations("AccountPage");

  async function onSubmit(data: UpdateUserDto) {
    try {
      const updatedUser = await updateAccountAction(data);
      form.reset(updatedUser);
      toast.success("Account updated successfully");
    } catch (error) {
      form.setError("root.server", {
        message: await handleError(error),
      });
    }
  }

  async function handleSendVerificationEmail() {
    try {
      const success = await sendVerificationEmailAction();
      if (success) {
        toast.success("Verification email sent successfully");
      } else {
        toast.error("Failed to send verification email");
      }
    } catch {
      toast.error("Failed to send verification email");
    }
  }

  useEffect(() => {
    form.reset(user);
  }, [user, form]);

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
                <Input id={field.name} {...field} />
                <FieldError>{fieldState.error?.message}</FieldError>
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
                <Input id={field.name} {...field} />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          <Field>
            <FieldLabel>
              {t("emailLabel")}
              {user.isVerified ? (
                <Badge className="bg-green-700 dark:bg-green-800 text-white">
                  <BadgeCheck className="me-1" size={16} />
                  {t("emailVerifiedLabel")}
                </Badge>
              ) : (
                <Badge className="bg-red-700 dark:bg-red-800 text-white">
                  <BadgeX className="me-1" size={16} />
                  {t("emailNotVerifiedLabel")}
                </Badge>
              )}
            </FieldLabel>
            <Input value={user.email} disabled />
            {!user.isVerified && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleSendVerificationEmail}
              >
                {t("verifyEmailButton")}
              </Button>
            )}
          </Field>
          {form.formState.errors.root?.server && (
            <FieldError>{form.formState.errors.root.server.message}</FieldError>
          )}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting ? <Spinner /> : t("save")}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
