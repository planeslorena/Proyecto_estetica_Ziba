'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { Menu } from "@/app/components/nav/nav";
import { AppointmentList } from "@/app/components/appointmentList/appointmentList";
import { InfoUser } from "@/app/components/infoUser/infoUser";
import { Footer } from "@/app/components/footer/footer";
import { NewAppointment } from "@/app/components/newAppointment/newAppointment";
import './page.css'

const cardsData = [{
  profesion: 'depiladora',
  client: 'Ayelen Porqueres',
  tel: 2284659856,
  service: 'Depilación brasileña',
  dia: '2024/07/28',
  horario: '20:00',
},
{
  profesion: 'cosmetóloga',
  client: 'Guadalupe Chojo',
  tel: 2284458714,
  service: 'Peeling',
  dia: '2024/06/29',
  horario: '15:00',
},
{
  profesion: 'cosmetóloga',
  client: 'Helena Way',
  tel: 2284783256,
  service: 'Limpieza Facial',
  dia: '2024/07/05',
  horario: '16:00',
},
{
  profesion: 'masajista',
  client: 'Melina Sanchez',
  tel: 2284472196,
  service: 'Masaje cuerpo entero',
  dia: '2024/06/14',
  horario: '17:00',
},
{
  profesion: 'manicura',
  client: 'Juana Flores',
  tel: 2284675218,
  service: 'Esculpidas',
  dia: '2024/07/30',
  horario: '18:00',
}];

function ProfessionalPage() {

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


export default withRoles(ProfessionalPage,'prof', '/home');