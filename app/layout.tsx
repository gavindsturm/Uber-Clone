import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import { Inter, Montserrat } from 'next/font/google'
import Header from '@/components/Header'
const inter = Montserrat({ subsets: ['latin']})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
          </SignedOut>
          <SignedIn>
          </SignedIn>
          <Header/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}