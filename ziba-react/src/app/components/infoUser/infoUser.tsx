import { useContext } from 'react';
import './infoUser.css'
import { UserContext } from '@/app/context/user.context';

export const InfoUser = () => {

    const { userData } = useContext(UserContext);

    return (
       <div className="info-user-container">   
           <div className='info-user'>
               <div className='info-title'>
                   <h4>MI PERFIL</h4>
                   <i className='img-info-perfil bi-person-circle'/>
               </div>
                       <ul className="info-list">
                           <li className='item-list'>
                               <h5 className='item-list-title'>Nombre</h5>
                               <p>{userData?.name}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>Apellido</h5>
                               <p>{userData?.lastname}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>DNI</h5>
                               <p>{userData?.dni}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>Teléfono</h5>
                               <p>{userData?.phone}</p>
                           </li>
                           <li className='item-list'>
                               <h5 className='item-list-title'>Email</h5>
                               <p>{userData?.username}</p>
                           </li>
                       </ul>
           </div>
       </div>
    )
    
}