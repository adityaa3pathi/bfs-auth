import CredentialsProvider from 'next-auth/providers/credentials';
import prismadb from './db'; // Adjust path to your Prisma client setup

const MAX_SESSIONS = 1;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }

        const sessions = await prismadb.session.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'asc' },
        });

        if (sessions.length >= MAX_SESSIONS) {
          const oldestSession = sessions[0];
          await prismadb.session.delete({ where: { id: oldestSession.id } });
        }

        const newSession = await prismadb.session.create({
          data: { userId: user.id },
        });

        return { id: user.id, email: user.email, sessionId: newSession.id };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const, // Explicitly type as 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      if (typeof token.id === 'string') {
        session.user = {
          ...session.user,
          id: token.id,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
