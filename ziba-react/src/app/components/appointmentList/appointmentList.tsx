import React, { useContext, FC, useEffect, useState } from 'react';
import './appointmentList.css'
import { Card, CloseButton, Dropdown, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { UserContext } from '@/app/context/user.context';
import { appointmentAttended, deleteAppointment } from '@/app/services/Services';

interface listProps {
  data: any;
  updateData: () => void;
}

export const AppointmentList: React.FC<listProps> = ({ data , updateData }) => {
  const [filter, setFilter] = useState('Año');
  const [filteredCards, setFilteredCards] = useState<typeof data>(data);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    filterCards(filter);
  }, [filter]);

  useEffect(() => {
    setFilteredCards(data);
  }, [data]);

  const filterCards = (filter: any) => {
    const now = new Date();
    let filtered;

    switch (filter) {
      case 'Día':
        filtered = data.filter((card: any) => {
          const cardDate = new Date(card.date);
          return cardDate.toDateString() === now.toDateString();
        });
        break;
      case 'Semana':
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + 6);
        filtered = data.filter((card: any) => {
          const cardDate = new Date(card.date);
          return cardDate >= now && cardDate <= endOfWeek;
        });
        break;
      case 'Mes':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        filtered = data.filter((card: any) => {
          const cardDate = new Date(card.date);
          return cardDate >= startOfMonth && cardDate <= endOfMonth;
        });
        break;
      case 'Año':
        const startOfYear = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfYear = new Date(now.getFullYear(), 11, 31);
        filtered = data.filter((card: any) => {
          const cardDate = new Date(card.date);
          return cardDate >= startOfYear && cardDate <= endOfYear;
        });
        break;
      default:
        filtered = data;
    }

    setFilteredCards(filtered);
  };

  const cancelAppointment = (id:number) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Una vez cancelado el turno, no se puede revertir.",
      icon: "warning",
      background: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#558562",
      cancelButtonColor: "#9e1515",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cerrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp =  await deleteAppointment(id);
        if (resp == 200) {
        Swal.fire({
          title: "¡Listo!",
          text: "El turno ha sido cancelado exitosamente.",
          icon: "success"
        });
        updateData();
        } else {
          Swal.fire({
            title: `Error`,
            text: `No se pudo cancelar el turno`,
            icon: "error"
          });
        }
      }
    });
  }

  const checkAppointment = (id:number) => {
    Swal.fire({
      title: "¿Marcar como 'Atendido'?",
      text: "Una vez hecho esto, no se puede revertir.",
      icon: "warning",
      background: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#558562",
      cancelButtonColor: "#9e1515",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cerrar",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const resp = await appointmentAttended(id);
        if (resp == 200) {
        Swal.fire({
          title: "¡Listo!",
          text: "El turno ha sido marcado como atendido.",
          icon: "success"
        });
        updateData();
        } else {
          Swal.fire({
            title: `Error`,
            text: `No se pudo marcar como atendido el turno`,
            icon: "error"
          });
        }
      }
    });
  }

  return (
    <div className='appointment-list-container'>
      <h4 className='scroller-title'>MIS TURNOS</h4>
      <Dropdown className='appointment-dropdown'>
        <Dropdown.Toggle >Filtrar por: {filter}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilter('Día')}>Día</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('Semana')}>Semana</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('Mes')}>Mes</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('Año')}>Año</Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
      <div className='scroller-container'>
        {filteredCards.map((card: any) => {
          return (
            <div key={`${card.professionals}-${card.date}-${card.hour}`} className='appointment-cards-container'>
              <Card className='appointment-cards'>
                <div className='card-container'>
                {userData?.role == 'client' ?
                    <img className='img-appointment-card' src={`imagenes/professionals/${card.speciality}.jpg`} />:
                    <img className='img-appointment-card' src={`imagenes/services/${card.speciality}.jpg`} />
                }
                  <Card.Body>
                    <div>
                      {userData?.role == 'client' ?
                        <Card.Title>{card.speciality}</Card.Title> :
                        <Card.Title>{card.service}</Card.Title>
                      }
                    </div>
                    <div className='d-flex  justify-content-between container-info '>
                      {userData?.role == 'client' ?
                        <div className='service-text'>
                          <Card.Text className='prof-text'>Prof. {card.professional}</Card.Text>
                          <Card.Text className='prof-text'>Servicio: {card.service}</Card.Text>
                        </div>
                        :
                        <div className='service-text'>
                          <Card.Text className='prof-text'>Cliente: {card.client}</Card.Text>
                          <Card.Text className='prof-text'>Télefono: {card.phone}</Card.Text>
                        </div>
                      }
                      <div className='d-flex flex-column  justify-content-around container-day-hour'>
                        <Card.Text className='day-text'>
                          Día:{' '} {new Date(card.date).getDate()}{'/'}{new Date(card.date).getMonth() + 1}{'/'}{new Date(card.date).getFullYear()}
                        </Card.Text>
                        <Card.Text className='time-text'>
                          Hora:{' '}{card.hour.substring(0,5)}hs
                        </Card.Text>
                      </div>
                    </div>
                    <div className='container-duration'>
                    <Card.Text className='time-text'>
                          Duración del turno:{' '}{card.duration}min
                    </Card.Text>
                    </div>
                    {userData?.role == 'client' ?
                       <button onClick={() => cancelAppointment(card.id)}className='button-cancelar-appointment-client'>Cancelar turno</button>
                       
                       :
                      <div className='container-buttons-appointment'>
                        <button onClick={() => checkAppointment(card.id)} disabled = {card.attended.data[0] == 1} className='button-atendido-appointment'>Atendido</button>
                        <button onClick={() => cancelAppointment(card.id)} disabled = {card.attended.data[0] == 1} className='button-cancelar-appointment'>Cancelar turno</button>
                      </div>
                    }

                  </Card.Body>

                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  );
};

