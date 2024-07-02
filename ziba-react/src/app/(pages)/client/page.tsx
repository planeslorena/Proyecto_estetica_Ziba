'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { Menu } from "@/app/components/nav/nav";
import { AppointmentList } from "@/app/components/appointmentList/appointmentList";
import { InfoUser } from "@/app/components/infoUser/infoUser";
import './page.css'
import { NewAppointment } from "@/app/components/newAppointment/newAppointment";

function ClientPage() {

  return (
    <>
      <header>
        <div>
            <Menu></Menu>
        </div>

      </header>

      <main>
        <div className="d-flex">
          <div className="d-flex flex-column info-user-appointment">
            <InfoUser></InfoUser>
            <div className="new-appointment">
              <NewAppointment></NewAppointment>
            </div>
          </div>
          <div className="appointment-list">
            <AppointmentList></AppointmentList>
          </div>
        </div>
      </main>
    </>
  )
}


export default withRoles(ClientPage,'client', '/home');