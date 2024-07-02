'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { Menu } from "@/app/components/nav/nav";

function ClientPage() {

  return (
    <>
      <header>
        <div>
            <Menu></Menu>
        </div>

      </header>

      <main>
        <h1>client</h1>
      </main>
    </>
  )
}


export default withRoles(ClientPage,'client', '/home');