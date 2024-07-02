import './infoUser.css'

const usuario = [
    { nombre: 'Lorena', apellido: 'Planes', dni: '39521567', telefono: '2284563215', email: 'planeslorena@gmail.com' }];

export const InfoUser = () => {
    return (
       <div className="info-user-container">   
           <div className='info-user'>
               <div className='info-title'>
                   <h4>MI PERFIL</h4>
                   <i className='img-info-perfil bi-person-circle'/>
               </div>
               {usuario.map((item: any) => {
                   return (
                       <ul key={item} className="info-list">
                           <li className='item-list'>
                               <h5 className='item-list-title'>Nombre</h5>
                               <p>{item.nombre}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>Apellido</h5>
                               <p>{item.apellido}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>DNI</h5>
                               <p>{item.dni}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>Teléfono</h5>
                               <p>{item.telefono}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>Email</h5>
                               <p>{item.email}</p>
                           </li>
                       </ul>
                   );
               })}
           </div>
       </div>
    )
    
}