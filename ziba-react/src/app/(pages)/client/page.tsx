'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { Menu } from "@/app/components/nav/nav";
import { AppointmentList } from "@/app/components/appointmentList/appointmentList";
import { InfoUser } from "@/app/components/infoUser/infoUser";
import { Footer } from "@/app/components/footer/footer";
import { NewAppointment } from "@/app/components/newAppointment/newAppointment";
import './page.css'
import { useContext, useEffect, useState } from "react";
import { getAppointmentsByClient } from "@/app/services/Services";
import { UserContext } from "@/app/context/user.context";

function ClientPage() {

  const { userData } = useContext(UserContext);
  const [cardsData, setCardsData] = useState([])

  const loadAppointments = async () => {
      const id_user = userData?.id;
      const  newCardsData = await getAppointmentsByClient(id_user);
      setCardsData(newCardsData);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  

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
            <AppointmentList data={cardsData}></AppointmentList>
          </div>
        </div>
        <Footer></Footer>

      </main>
    </>
  )
}

export default withRoles(ClientPage, 'client', '/home');