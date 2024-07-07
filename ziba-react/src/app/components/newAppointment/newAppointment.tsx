import './newAppointment.css';

export const NewAppointment = () => {
    return(
        <div className="d-flex justify-content-evenly align-items-center client-appointment-button-container">
            <p className='client-appointment-text'>¿No tiene turno todavía?</p>
            <button className='client-appointment-button'>Reserve uno ahora</button>
        </div>
    )
}