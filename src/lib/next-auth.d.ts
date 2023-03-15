import "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User;
  }
  interface User {
    id: string;
    username: string;
  }
}
