import { FormState } from "@/lib/types";
import Form from "next/form";
import { useActionState } from "react";
import { updateProfileAction } from "./actions";
import { UserEntity } from "@/lib/client";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BadgeX } from "lucide-react";

export default function ProfileForm({ user }: { user: UserEntity }) {
  const [state, formAction, isPending] = useActionState<
    FormState<Pick<UserEntity, "firstName" | "lastName">>,
    FormData
  >(updateProfileAction, {
    values: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    errors: null,
    success: false,
  });
  const t = useTranslations("ProfilePage");

  return (
    <Form action={formAction}>
      <FieldSet>
        <FieldLegend className="text-lg">{t("title")}</FieldLegend>
        <FieldDescription>{t("description")}</FieldDescription>
      </FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="firstName">{t("firstNameLabel")}</FieldLabel>
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
          <FieldLabel htmlFor="lastName">{t("lastNameLabel")}</FieldLabel>
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
          <FieldLabel htmlFor="email">
            {t("emailLabel")}
            {user.isVerified ? (
              <Badge className="ml-2 text-xs bg-green-700 dark:bg-green-800 text-white">
                <BadgeCheck className="mr-1" />
                {t("emailVerifiedLabel")}
              </Badge>
            ) : (
              <Badge className="ml-2 text-xs bg-red-600 dark:bg-red-800 text-white">
                <BadgeX className="mr-1" />
                {t("emailNotVerifiedLabel")}
              </Badge>
            )}
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
            disabled
          />
        </Field>
      </FieldGroup>
    </Form>
  );
}
