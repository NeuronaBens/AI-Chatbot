import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  pages: {
    signIn: '/general/login'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'hello@example.com'},
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter an email and pasword");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include:{
            role: true,
          },
        })

        if (!user) {
          throw new Error("No user found");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        return user;
      }
    })
  ],
  callbacks: {
  
    async jwt({ token, user, session, trigger }) {
      //console.log('JWT Callback', { token, user, session })
      
      if(trigger === "update" && session?.name){
        token.name = session.name;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          deleted: user.deleted_at,
          role: user.role.name
        }
      }
      return token;
    },
    session({ session, token, user }) {
      //console.log('Session Callback', { session, token, user })
      return {
        ...session,
        user: {
          ...session.user,                     
          id: token.id,                     
          deleted: token.deleted,
          role: token.role
        }
      }
    },
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }