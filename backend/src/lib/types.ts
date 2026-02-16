declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      email: string;
      sub: number;
      name: string;
    };
  }
}

declare module '@fastify/secure-session' {
  interface SessionData {
    access_token: string;
    user: {
      email: string;
      sub: number;
      name: string;
      iat: number;
      exp: number;
    };
  }
}
