import { useEffect, useState } from 'react';
import './appointments.css';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getClientByDni } from '@/app/services/User';
import { createAppointment, getAvailableDays, getAvailableTimes, getServicesBySpeciliaty, getSpecialtiesWhitProf } from '@/app/services/Services';
import moment from 'moment';
import Swal from 'sweetalert2';



interface data {
    id: number,
    id_user: number,
    dni: number,
    speciality: number,
    service: number,
    day: string,
    hour: string,
}

type Schedule = {
    day: string; // ej., "Lunes", "Martes"
    times: string[]; // ej., ["09:00 AM", "10:00 AM", "11:00 AM"]
};

interface appointmentsProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action: string;
    updateData: () => void;
}

export const AddAppoinments: React.FC<appointmentsProps> = ({ show, handleClose, data, action, updateData }) => {

    const [value, setValue] = useState<any>(new Date());
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [availableDays, setAvailableDays] = useState<number[]>([]);
    const [dataClient, setDataClient] = useState<any>();
    const [specialties, setSpecialties] = useState([{ id: '', speciality: '' }]);
    const [services, setServices] = useState([{ id: 0, service: '', duration: 0 }]);
    const { handleSubmit, register, setError, formState: { errors, isValid }, control, getValues, clearErrors,reset } = useForm<data>({ mode: 'onChange' });
    const onSubmit: SubmitHandler<data> = async (data) => {
        const selectedService = services.find(se => se.id == data.service)
        const appointment = {
            id_user: data.id_user,
            id_service: data.service,
            date: moment(data.day).format('YYYY-MM-DD'),
            hour: data.hour,
            duration: selectedService?.duration
        }
        const resp = await createAppointment(appointment);

        if (resp == 201) {
            Swal.fire({
                title: `Reserva de turno`,
                text: "El turno se reservó con exito!",
                icon: "success"
            });
            handleClose();
            reset();
            updateData();
        } else if (resp == 409) {
            Swal.fire({
                title: 'No se puede reservar turno',
                text: "Ya tenes un turno reservado en ese horario por favor chequea tu perfil!",
                icon: "error"
            });
        } else {
            Swal.fire({
                title: `${resp}`,
                text: "No se pudo reservar el turno",
                icon: "error"
            });
        }
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const startDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
    const endDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 2, tomorrow.getDate() + 1);

    //Carga los dias que el profesional atiende
    const loadAvailableDays = async (id_speciality: number) => {
        const calendar = await getAvailableDays(id_speciality);
        const newDays: number[] = []
        calendar.forEach((item: any) => {
            switch (item.day) {
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
        setAvailableDays(newDays);
    }

    //Deshabilita del calendario los días que el profesional no atiende, los domingos y las fechas mayores a dos meses
    const isDateDisabled = (date: Date): boolean => {
        const day = date.getDay();
        const isSunday = day === 0;
        const isAvailable = availableDays.includes(day)
        return isSunday || date < now || date >= endDate || !isAvailable;
    };

    const loadAvailableTimes = async (id_service: number, day: string) => {
        const times = await getAvailableTimes({ id_service: id_service, day: day });
        setAvailableTimes(times);
    }

    //Al cambiar el día seleccionado en el calendario carga los horarios disponibles para turnos
    useEffect(() => {
        if (value) {
            const day = moment(value).format('YYYY-MM-DD');
            console.log(getValues('service'));
            loadAvailableTimes(getValues('service'), day);
        }
    }, [value]);

    const loadSpecialties = async () => {
        const resp = await getSpecialtiesWhitProf();
        setSpecialties(resp);
    }

    const loadServices = async (id_speciality: any) => {
        const resp = await getServicesBySpeciliaty(id_speciality);
        setServices(resp);
        loadAvailableDays(id_speciality);
    }


    useEffect(() => {
        loadSpecialties();
    }, [])

    //Funcion para llamar a backend para buscar los datos del cliente por DNI
    const findClient = async (dni: number) => {
        const resp = await getClientByDni(dni);
        if (resp.statusCode) {
            if (resp.statusCode == 404) {
                setError("dni", {
                    type: "manual",
                    message: "No se encuentra cliente con ese DNI",
                })
            } else {
                setError("dni", {
                    type: "manual",
                    message: `Error buscando cliente ${resp.message}`,
                })
            }
        } else {
            clearErrors("dni")
            setDataClient(resp);
        }
    }

    const resetAndHandleClose = () => {
        reset();
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={resetAndHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{action} turno</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={data?.id} disabled hidden
                            {...register('id')} />
                        <div>
                            <label className='form-label-admin'>DNI</label>
                            <div className='d-flex flex-row align-items-center'>
                                <input className='form-input-admin'
                                    {...register("dni", {
                                        required: "Por favor ingrese su DNI",
                                    })} />
                                <i className="bi bi-search" onClick={() => findClient(getValues('dni'))}></i>
                            </div>
                            <small className='texto-validaciones'>{errors.dni?.message}</small>
                        </div>
                        <div className='d-flex flex-row align-items-center'>
                            <input className='form-input-admin' disabled hidden
                                {...register("id_user")} value={dataClient?.id_user} />
                        </div>
                        {dataClient && <div>
                            <label className='form-label-admin'>Cliente</label>
                            <div className='d-flex flex-row align-items-center'>
                                <input className='form-input-admin' defaultValue={`${dataClient?.name} ${dataClient?.lastname}`} />

                            </div>
                        </div>}
                        <div>
                            <label id='select' className='form-label-admin'>Especialidad</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                {...register("speciality", {
                                    required: "Por favor ingrese una especialidad",
                                })} onChange={(e) => loadServices(e.target.value)}>
                                <option value={undefined} selected disabled >Elija una especialidad</option>
                                {specialties.map(sp => (
                                    <option key={sp.id + sp.speciality} value={sp.id}>{sp.speciality}</option>
                                ))}
                            </select>
                            <small className='texto-validaciones'>{errors.speciality?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Servicio</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                {...register("service", {
                                    required: "Por favor ingrese un servicio",
                                })}>
                                <option value="" selected disabled hidden>Elija un servicio</option>
                                {services.map(sp => (
                                    <option key={sp.id + sp.service} value={sp.id}>{sp.service}</option>
                                ))}
                            </select>
                            <small className='texto-validaciones'>{errors.service?.message}</small>
                        </div>
                        <div>
                            <label>Día</label>
                            <Controller
                                name="day"
                                control={control}
                                rules={{ required: 'Por favor elija un día' }}
                                render={({ field }) => (
                                    <div>
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
                                        <p>
                                            Turno: {moment(value).format('DD-MM-YYYY') }
                                        </p>
                                    </div>
                                )}
                            />
                            <small className='texto-validaciones'>{errors.day?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Hora</label>
                            <select
                                {...register("hour", {
                                    required: "Por favor ingrese una hora",
                                })}>
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((time, index) => (
                                        <option key={index} value={time}>
                                            {time}
                                        </option>
                                    ))
                                ) : (
                                    <option>No hay horarios disponibles</option>
                                )}
                            </select>
                            <small className='texto-validaciones'>{errors.hour?.message}</small>
                        </div>
                        <button type='submit' disabled={!isValid} className='button-agregarcliente'>{action} turno</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




