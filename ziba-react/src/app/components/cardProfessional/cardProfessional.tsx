import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card } from 'react-bootstrap';
import './cardProfessional.css';
import { getInfoServices } from '@/app/services/Services';


export function CardProfessional() {
  const [index, setIndex] = useState(0);
  const [imgs, setImgs] = useState([{ speciality: 'loading', professional: '', services: [''] }]);

  const getServices = async () => {
    const imgs2 = await getInfoServices();
    setImgs(imgs2);
  }

  useEffect(() => {
    getServices();
  }, []);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };
  // acc = accumulator. es un array de indices de grupos que crea el groupIndex. ej: acc = [group0[card0,card1,card2], group1[card3,card4,card5], ...] 
  const reduceItems = (acc: any, cur: any, index: any) => {
    const groupIndex = Math.floor(index / 3);
    //si no hay grupo, lo inicializa vacio
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);

    return acc;
  };

  return (
    <main className='carousel-background'>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        {imgs.reduce(reduceItems, []).map((item: any, index: any) => (
          <Carousel.Item key={index}>
            <div key={index} className="d-flex justify-content-center cards-carousel">
              {item.map((item: any, index: any) => {
                return (
                  <div key={index} className='card-container'>
                    <Card key={index} className='card-content' style={{ width: "18rem" }}>
                      <Card.Body key={index} >
                        <Card.Title key={"title" + item.speciality} className='title-card' >{item.speciality}</Card.Title>
                        <Card.Text key={"text" + item.speciality} className='title-text'>{'Prof. '}{item.professional}</Card.Text>
                        <Card.Img key={"img" + item.speciality} className="img-carousel" variant="top" src={`imagenes/professionals/${item.speciality}.png`} />
                        <div key={"square" + item.specility} className='square-carousel' >
                          {item.services.map((service: any) => {
                            return (
                              <li key={item.services + service}> {service}</li>
                            )
                          })}

                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className='container-button-reservation'>
        <button className='button-reservation'>Reserve aquí su turno</button>
      </div>
    </main>
  );
} 