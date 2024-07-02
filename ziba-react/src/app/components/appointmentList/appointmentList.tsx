import React, { useEffect, useState } from 'react';
import './appointmentList.css'
import { Card, CloseButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Swal from 'sweetalert2';

const cardsData = [{
  profesion: 'depiladora',
  servicio: 'Depilación',
  nombre: 'Prof. Romina Benegas',
  especialidad: 'Depilación brasileña',
  dia: '2024/06/2',
  horario: '20:00',
},
{
  profesion: 'cosmetóloga',
  servicio: 'Cosmetología',
  nombre: 'Prof. Marisa Ruiz',
  especialidad: 'Peeling',
  dia: '2024/06/27',
  horario: '15:00',
},
{
  profesion: 'cosmetóloga',
  servicio: 'Cosmetología',
  nombre: 'Prof. Marisa Ruiz',
  especialidad: 'Limpieza Facial',
  dia: '2024/06/5',
  horario: '16:00',
},
{
  profesion: 'masajista',
  servicio: 'Masoterapia',
  nombre: 'Prof. Naomi Almeida',
  especialidad: 'Masaje cuerpo entero',
  dia: '2024/06/14',
  horario: '17:00',
},
{
  profesion: 'manicura',
  servicio: 'Manicuría',
  nombre: 'Prof. Maiten Suarez',
  especialidad: 'Esculpidas',
  dia: '2024/07/30',
  horario: '18:00',
}];

export const AppointmentList = () => {
  const [filter, setFilter] = useState('Año');
  const [filteredCards, setFilteredCards] = useState<typeof cardsData>(cardsData);


  useEffect(() => {
    filterCards(filter);
  }, [filter]);

  const filterCards = (filter:any) => {
    const now = new Date();
    let filtered;

    switch (filter) {
      case 'Día':
        filtered = cardsData.filter((card:any) => {
          const cardDate = new Date(card.dia);
          return cardDate.toDateString() === now.toDateString();
        });
        break;
      case 'Semana':
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + 6);
        filtered = cardsData.filter((card:any) => {
          const cardDate = new Date(card.dia);
          return cardDate >= now && cardDate <= endOfWeek;
        });
        break;
      case 'Mes':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        filtered = cardsData.filter((card:any) => {
          const cardDate = new Date(card.dia);
          return cardDate >= startOfMonth && cardDate <= endOfMonth;
        });
        break;
      case 'Año':
        const startOfYear = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfYear = new Date(now.getFullYear(), 11, 31);
        filtered = cardsData.filter((card:any) => {
          const cardDate = new Date(card.dia);
          return cardDate >= startOfYear && cardDate <= endOfYear;
        });
        break;
      default:
        filtered = cardsData;
    }

    setFilteredCards(filtered);
  };

  const cancelAppointment = () => {
      Swal.fire({
        title: "¿Está seguro?",
        text: "Una vez cancelado el turno, no se puede revertir.",
        icon: "warning",
        background: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cerrar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Cancelado!",
            text: "El turno ha sido cancelado exitosamente.",
            icon: "success"
          });
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
            <div key={`${card.nombre}-${card.dia}-${card.horario}`} className='appointment-cards-container'>
            <Card className='appointment-cards'>
              <div className='card-container'>
              <img className='img-appointment-card' src={`imagenes/professionals/${card.profesion}.png`} />
              <Card.Body className='d-flex flex-column justify-content-between'>
                <div className='d-flex flex-wrap Salign-items-baseline justify-content-between'>
                  <Card.Title>{card.servicio}</Card.Title>
                  <Card.Text className='prof-text'>
                    {card.nombre}
                  </Card.Text>
                </div>
                <div className='service-text'>
                  <Card.Text>
                    Servicio: {' '}{card.especialidad}
                  </Card.Text>
                </div>
                <div className='d-flex flex-wrap justify-content-between'>
                <Card.Text className='day-text'>
                  Día:{' '}{new Date(card.dia).getDate()}{'/'}{new Date(card.dia).getMonth()+1}{'/'}{new Date(card.dia).getFullYear()}
                </Card.Text>
                <Card.Text className='time-text'>
                  Hora:{' '}{card.horario}
                </Card.Text>
                </div>
              </Card.Body>
              <OverlayTrigger
                key='bottom'
                placement='bottom'
                overlay={
                  <Tooltip id='tooltip-bottom'>
                    Cancelar turno
                  </Tooltip>
                }
              >
              <CloseButton onClick={cancelAppointment} className='cancel-appointment-cross' aria-label="Hide" />
              </OverlayTrigger>
                
              </div>
            </Card>
            </div>
          )
        })}
      </div>
    </div>
  );
};