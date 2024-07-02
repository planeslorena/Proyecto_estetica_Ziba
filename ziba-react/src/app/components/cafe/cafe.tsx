'use client'

import React from "react";
import './cafe.css'

export const Cafeteria = () => {

    return (
        <>
            <h2 className="title-cafe">¡Mimate,relajate y disfruta de tu infusión favorita!</h2>
            <div className='container-img-cafe'>
                
                <img className='img-armchairs' src="/imagenes/armchairs.jpg" alt="image armchairs" />
                <img className='img-cafeteria' src="/imagenes/cafeteria.jpg" alt="image cafeteria" />
               
                <div className='square-violet'> </div>
                <div className='border-violet'><p className="text-square">Zibá te invita a qué conozcas el nuevo espacio pensado para vos, no solo brindamos nuestros servicios para tu cuidado personal, si no tambien para que te relajes sola o en compañia en nuestra nueva cafeteria, donde vas a poder disfrutar de un rico desayuno o merienda.</p> </div>
            </div>
           
        </>


    );
} 