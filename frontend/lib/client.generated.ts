import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const SignInDto = z
  .object({ email: z.string().email(), password: z.string() })
  .strict();
const SignUpDto = z
  .object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .strict();
const SessionDto = z
  .object({
    email: z.string().email(),
    sub: z.number(),
    name: z.string(),
    iat: z.number(),
    exp: z.number(),
  })
  .strict();
const PermissionsDto = z
  .object({
    bundles: z.array(z.enum(["admin", "user", "guest"])),
    permissions: z.array(
      z.enum([
        "is_admin",
        "is_user",
        "is_guest",
        "view_dashboard",
        "view_profile",
        "edit_profile",
        "delete_profile",
      ])
    ),
  })
  .strict();

export const schemas = {
  SignInDto,
  SignUpDto,
  SessionDto,
  PermissionsDto,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "getHello",
    requestFormat: "json",
    response: z.string(),
  },
  {
    method: "post",
    path: "/auth/login",
    alias: "login",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SignInDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/auth/logout",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.void(),
      },
    ],
    alias: "logout",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/auth/permissions",
    alias: "permissions",
    requestFormat: "json",
    response: PermissionsDto,
  },
  {
    method: "get",
    path: "/auth/session",
    alias: "session",
    requestFormat: "json",
    response: SessionDto,
  },
  {
    method: "post",
    path: "/auth/signup",
    alias: "signup",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SignUpDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/users",
    alias: "getUsers",
    requestFormat: "json",
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}

/** Appended bundle permissions from OpenAPI spec */

export const BundlePermissions = {
  "admin": [
    "is_admin",
    "is_user",
    "is_guest",
    "view_dashboard",
    "view_profile",
    "edit_profile",
    "delete_profile"
  ],
  "user": [
    "is_user",
    "view_dashboard",
    "view_profile",
    "edit_profile"
  ],
  "guest": [
    "is_guest",
    "view_dashboard"
  ]
}