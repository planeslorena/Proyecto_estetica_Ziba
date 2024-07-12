import './newAppointment.css';
import { useRouter } from 'next/navigation';


export const NewAppointment = () => {
    const router = useRouter();

    return(
        <div className="d-flex justify-content-evenly align-items-center client-appointment-button-container">
            <p className='client-appointment-text'>¿No tiene turno todavía?</p>
            <button className='client-appointment-button' onClick={() => router.push('/appointment')}>Reserve uno ahora</button>
        </div>
    )
}