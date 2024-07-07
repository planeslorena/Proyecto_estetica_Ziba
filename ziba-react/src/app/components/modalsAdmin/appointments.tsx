import { useEffect, useState } from 'react';
import './appointments.css';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface data {
    id: number,
    dni: number,
    speciality: string,
    service: string,
    day: string,
    availability: string,
}

type Schedule = {
    day: string; // ej., "Lunes", "Martes"
    times: string[]; // ej., ["09:00 AM", "10:00 AM", "11:00 AM"]
  };

const schedules: Schedule[] = [
    { day: 'Monday', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Tuesday', times: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    { day: 'Wednesday', times: ['09:00 AM', '10:00 AM'] },
    { day: 'Thursday', times: ['01:00 PM', '02:00 PM'] },
    { day: 'Friday', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Saturday', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
];

interface appointmentsProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action:string;
    updateData: () => void;
}

export const AddAppoinments: React.FC<appointmentsProps> = ({ show, handleClose, data ,action, updateData}) => {

    const [value, setValue] = useState<any>(new Date());
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const { handleSubmit, register, formState: { errors, isValid }, control } = useForm<data>({ mode: 'onChange' });
    const onSubmit: SubmitHandler<data> = (data) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        data.day = value.toLocaleDateString(undefined, options)
        console.log(data);
    }
    
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const startDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
    const endDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 2, tomorrow.getDate() + 1);

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const isDateDisabled = (date: Date): boolean => {
        const day = date.getDay();
        const isSunday = day === 0;
        return isSunday || date < now || date >= endDate;
    };

    useEffect(() => {
        if (!Array.isArray(value)) {
            const selectedDay = value.toLocaleDateString('en-US', { weekday: 'long' });
            const schedule = schedules.find(s => s.day === selectedDay);
            if (schedule) {
                setAvailableTimes(schedule.times);
            } else {
                setAvailableTimes([]);
            }
        }
    }, [value]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{action} turno</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={data?.id} disabled hidden
                        {...register('id')}/>
                        <div>
                            <label className='form-label-admin'>DNI</label>
                            <input className='form-input-admin' 
                                defaultValue={data?.dni} 
                                {...register("dni", {
                                    required: "Por favor ingrese su DNI",
                                    validate: (value: number) => {
                                        if (value < 1000000 || value > 100000000) {
                                            return "Debe ingresar un DNI válido";
                                        }
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: "DNI inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Especialidad</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                defaultValue={data?.speciality}
                                {...register("speciality", {
                                    required: "Por favor ingrese una especialidad",
                                })}>
                                <option value="" selected disabled hidden>Elija una especialidad</option> 
                                <option value='Masajes'>Masajes</option>
                                <option value='Peluqueria'>Peluqueria</option>
                                <option value='Manicura'>Manicura</option>
                                <option value='Depilación'>Depilación</option>
                            </select>
                            <small className='texto-validaciones'>{errors.speciality?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Servicio</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                defaultValue={data?.service}
                                {...register("service", {
                                    required: "Por favor ingrese un servicio",
                                })}>
                                <option value="" selected disabled hidden>Elija un servicio</option> 
                                <option value='Bozo'>Bozo</option>
                                <option value='Peeling'>Peeling</option>
                                <option value='Soft gel'>Soft gel</option>
                                <option value='Piedras calientes'>Piedras calientes</option>
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
                                            const options: Intl.DateTimeFormatOptions = {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            };
                                            field.onChange(value.toLocaleDateString(undefined, options));
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
                                        defaultValue={tomorrow}                                        
                                        />
                                    <p>
                                        Turno: {formatDate(value)}
                                    </p>
                                    </div>  
                                    )}
                                />
                             <small className='texto-validaciones'>{errors.day?.message}</small>      
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Hora</label>
                            <select defaultValue={data?.availability}
                                {...register("speciality", {
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
                            <small className='texto-validaciones'>{errors.availability?.message}</small>
                        </div>
                        <button type='submit' disabled={!isValid} className='button-agregarcliente'>{action} turno</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




