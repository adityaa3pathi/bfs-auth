// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;  // Extend session user to include user ID
      name?: string | null;  // Retain other fields like name
      email?: string | null; // Email field
      image?: string | null; // Image field
    };
  }

  interface Token {
    id: string; // Include user ID in token
  }
}
