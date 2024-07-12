import { Card } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './cardService.css'
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { DescriptionModal } from "./descriptionModal";
import moment from 'moment';
import { createAppointment, getAvailableTimes } from "@/app/services/Services";
import { UserContext } from "@/app/context/user.context";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface data {
    speciality: string,
    service: number,
    day: string,
    hour: string,
}

type Schedule = {
    day: string; // ej., "Lunes", "Martes"
    times: string[]; // ej., ["09:00 AM", "10:00 AM", "11:00 AM"]
};
interface cardServiceProps {
    infoServices: any,
}

export const CardService: React.FC<cardServiceProps> = ({ infoServices }) => {
    const [show, setShow] = useState<any>(false);
    const [value, setValue] = useState<any>();//Es la fecha elegida en el calendario
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedService, setSelectedService] = useState({ id_service: 0, name: '', price: 0, description: '', duration: 0 });
    const [price, setPrice] = useState<number>();
    const { userData } = useContext(UserContext);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid }, control, watch } = useForm<data>();

    const onSubmit: SubmitHandler<data> = async (data) => {
        if (!userData) {
            Swal.fire({ 
                title: "Inicia sesión",
                text: "Para reservar un turno tenes que iniciar sesión",
                icon: "warning",
                background: "#fff",
                confirmButtonColor: "#558562",
                confirmButtonText: "Aceptar",
            })
            router.push('/authPage');
        } else {
            const appointment = {
                id_user: userData.id,
                id_service: data.service,
                date: moment(data.day).format('YYYY-MM-DD'),
                hour: data.hour,
                duration: selectedService.duration
            }
            console.log(appointment);
            const resp = await createAppointment(appointment);

            if (resp == 201) {
                Swal.fire({
                    title: `Reserva de turno`,
                    text: "Su turno se reservó con exito!",
                    icon: "success"
                });
            } else if (resp == 409) {
                Swal.fire({
                    title: 'No se puede reservar turno',
                    text: "Ya tenes un turno reservado en ese horario por favor chequea tu perfil!",
                    icon: "error"
                });
            }else {
                Swal.fire({
                    title: `${resp}`,
                    text: "No se pudo reservar el turno",
                    icon: "error"
                });
            }
        }

    }

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const startDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
    const endDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 2, tomorrow.getDate() + 1);

    //Carga los dias que el profesional atiende
    const loadAvailableDays = () => {
        const newDays: number[] = []
        infoServices.days.forEach((day: string) => {
            switch (day) {
                case 'Lunes':
                    newDays.push(1);
                    break;
                case 'Martes':
                    newDays.push(2);
                    break;
                case 'Miercoles':
                    newDays.push(3);
                    break;
                case 'Jueves':
                    newDays.push(4);
                    break;
                case 'Viernes':
                    newDays.push(5);
                    break;
                case 'Sábado':
                    newDays.push(6);
                    break;
            }
        })
        return newDays;
    }

    const availableDays = loadAvailableDays();

    //Deshabilita del calendario los días que el profesional no atiende, los domingos y las fechas mayores a dos meses
    const isDateDisabled = (date: Date): boolean => {
        if (selectedService.id_service == 0) {
            return true
        } else {
            const day = date.getDay();
            const isSunday = day === 0;
            const isAvailable = availableDays.includes(day)
            return isSunday || date < now || date >= endDate || !isAvailable;
        }
    };

    const loadAvailableTimes = async (id_service: number, day: string) => {
        const times = await getAvailableTimes({ id_service: id_service, day: day });
        setAvailableTimes(times);
    }

    //Al cambiar el día seleccionado en el calendario carga los horarios disponibles para turnos
    useEffect(() => {
        if (value) {
            const day = moment(value).format('YYYY-MM-DD');
            loadAvailableTimes(selectedService.id_service, day);
        }
    }, [value]);

    useEffect(() => {
        setPrice(selectedService.price);
        setValue(null);
        setAvailableTimes([]);
    }, [selectedService]);

    return (
        <div className="d-flex  container-card-service-dos">
            <Card className="d-flex flex-row  container-card-service">

                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-evenly form-service ">
                    <div>
                        <Card.Title className="title-primary d-flex  align-items-center">
                            <p className="p-title p-service">{infoServices.speciality.toUpperCase()}</p>
                            <p className="p-title p-prof">Prof.{infoServices.professional}</p>
                        </Card.Title>
                        <Card.Title className="d-flex justify-content-evenly title-secondary align-items-center">
                            <select
                                {...register('service', {
                                    required: 'Por favor seleccione un servicio'
                                })}
                                onChange={(e) => {
                                    setValue(null);
                                    const selectedServiceId = parseInt(e.target.value, 10);
                                    const selectedService = infoServices.services.find((service: any) => service.id_service === selectedServiceId);
                                    if (selectedService) {
                                        setSelectedService(selectedService);
                                    }
                                }} className="select-service">
                                <option value="" selected disabled hidden>Servicio</option>
                                {infoServices.services.map((service: any) => (
                                    <option key={service.id_service} value={service.id_service}>{service.name}</option>
                                ))}
                            </select>
                            <small>{errors.service?.message}</small>
                            {selectedService.id_service != 0 ? (
                                <p onClick={handleShow} className="p-title p-que-es">¿Que es?</p>) : (
                                <p className="p-title p-que-es">¿Que es?</p>
                            )}
                            <DescriptionModal service={selectedService.name} desc={selectedService.description} show={show} handleClose={handleClose}></DescriptionModal>
                        </Card.Title>
                    </div>
                    <div className="d-flex">
                        <img src={`imagenes/services/${infoServices.speciality}.jpg`} alt="" />
                        <Card.Body className="d-flex justify-content-around">
                            <div className="d-flex flex-column align-items-center">
                                <p>Reserve aquí su turno</p>
                                <Controller
                                    name="day"
                                    control={control}
                                    rules={{ required: 'Por favor elija un día' }}
                                    render={({ field }) => (
                                        <Calendar
                                            onChange={(date) => {
                                                setValue(date);
                                                field.onChange(date);
                                            }}
                                            value={value}
                                            minDetail='month'
                                            maxDetail="month"
                                            minDate={startDate}
                                            maxDate={endDate}
                                            tileDisabled={({ date }) => isDateDisabled(date)}
                                            view="month"
                                            prev2Label={null}
                                            next2Label={null}
                                            showNeighboringMonth={false}
                                            locale='es-419'

                                        />
                                    )}
                                />
                                <small>{errors.day?.message}</small>
                            </div>
                            <div className="d-flex flex-column justify-content-evenly">
                                <div className="container-price-service">
                                    <p className="p-input-service">Precio</p>
                                    <input type="text" value={price} disabled className="input-precio inputs-service" />
                                </div>
                                <div className="container-price-service">
                                    <p className="p-input-service">Duracion del turno</p>
                                    <input type="text" value={`${selectedService.duration} min.`} disabled className="input-precio inputs-service" />
                                </div>
                                <div className="container-day-service">
                                    <p className="p-input-service">Día</p>
                                    <input type="text" value={value ? moment(value).format('DD-MM-YYYY') : ''} disabled className="inputs-service" />
                                </div>
                                <div className="container-hour-service">
                                    <p className="p-input-service" >Hora</p>
                                    <select className="container-option-hour inputs-service"
                                        {...register("hour", {
                                            required: "Por favor ingrese una hora",
                                        })}>
                                        {availableTimes.length > 0 ? (
                                            <>
                                                <option value="" selected disabled>Elija un horario</option>
                                                {availableTimes.map((time, index) => (
                                                    <option key={index} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value="" selected disabled>No hay horarios disponibles</option>
                                        )}
                                    </select>   
                                    <small>{errors.hour?.message}</small>
                                </div>
                                <button type="submit" disabled={!isValid} className="button-reservar-service">Reservar</button>
                            </div>
                        </Card.Body>
                    </div>
                </form>
            </Card>

        </div>


    )
}
