'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { Menu } from "@/app/components/nav/nav";

function AdminPage() {
  return (
    <>
      <header>
        <div>
            <Menu></Menu>
        </div>

      </header>

      <main>
        <h1>admin</h1>
      </main>
    </>
  )
}

export default withRoles(AdminPage,'admin', '/home')