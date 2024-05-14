'use client'
import { AuthContainer } from "@/app/components/authContainer/authContainer";
import { Logo } from "@/app/components/logo/logo";

export default function AuthPage() {
  return (
    <>
      <header>
        <div>
          <Logo></Logo>
        </div>

      </header>

      <main>
        <AuthContainer />
      </main>
    </>
  )
}
