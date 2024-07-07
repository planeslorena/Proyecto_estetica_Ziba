import { useEffect, useState } from 'react';
import './professional.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getSpecialtiesWhitoutProf } from '@/app/services/Services';
import { createProf, updateProf } from '@/app/services/User';
import Swal from 'sweetalert2';

interface TimeRange {
    hour1: string;
    hour2: string;
}

interface data {
    id: number,
    name: string,
    lastname: string,
    dni: number,
    tel: number,
    email: string,
    speciality: number,
    days: string[],
    hour1: string,
    hour2: string,
}

const schedules = [
    { day: 'Lunes', checked: false, },
    { day: 'Martes', checked: false, },
    { day: 'Miercoles', checked: false, },
    { day: 'Jueves', checked: false, },
    { day: 'Viernes', checked: false, },
    { day: 'Sábado', checked: false, },
];

const times = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00']

interface professionalProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action: string;
    updateData: () => void;
}

export const AddProfessional: React.FC<professionalProps> = ({ show, handleClose, data, action, updateData }) => {
    const [checkedDay, setCheckedDay] = useState(schedules);
    const [specialties, setSpecialties] = useState([{ id: '', speciality: '' }]);
    const [errorRegister, setErrorRegister] = useState('');

    const { handleSubmit, register, formState: { errors, isValid }, watch, setError, control, reset } = useForm<data>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<data> = async (newData) => {
        //Filtra los dias que esten checkeados en checkedDay y mapea los nombres de esos dias
        const selectedDays = checkedDay.filter(day => day.checked).map(day => day.day);
        newData.days = selectedDays;
        //CHEQUEA QUE SE HAYA SELECCIONADO POR LO MENOS UN DIA 
        if (newData.days.length == 0) {
            setError('days', {
                type: "manual",
                message: "Elija por lo menos un día",
            })
        } else {
            const prof = {
                id_professional: data?.id,
                mail: newData.email,
                password: 'prof1234',
                name: newData.name,
                lastname: newData.lastname,
                dni: newData.dni,
                phone: newData.tel,
                role: 'prof',
                speciality: newData.speciality,
                days: newData.days,
                hour_begin: newData.hour1,
                hour_end: newData.hour2
            }
            console.log(prof);
            //AGREGAR PROFESIONAL
            if (action == 'Agregar') {

                const resp = await createProf(prof);

                if (resp == 409) {
                    setErrorRegister('El mail indicado ya se encuentra registrado.')
                } else if (resp == 201) {
                    Swal.fire({
                        title: `Agregar Profesional`,
                        text: "Profesional registrado con exito!",
                        icon: "success"
                    });
                    handleClose();
                    reset();
                    setErrorRegister('');
                    updateData();
                } else {
                    setErrorRegister(resp)
                }
                //MODIFICAR PROFESIONAL
            } else if (action == 'Modificar') {
                //Sino se modifico ningun dato, muestra error
                if (data.name == newData.name && data.lastname == newData.lastname && data.mail == newData.email && data.phone == newData.tel && data.speciality == newData.speciality && data.dni == newData.dni && JSON.stringify(data.days) === JSON.stringify(newData.days) && data.hour_begin == newData.hour1 && data.hour_end == newData.hour2) {
                    setErrorRegister('Debe modificar algún dato.');
                    //Si se modificaron datos se llama al backend para actualizarlos
                } else {
                    setErrorRegister('');
                    const resp = await updateProf(prof);

                    if (resp == 200) {
                        Swal.fire({
                            title: `Modificación Profesional`,
                            text: "Profesional actualizado con exito!",
                            icon: "success"
                        });
                        handleClose();
                        reset();
                        updateData();
                    } else if (resp == 404) {
                        setErrorRegister('No se encontro profesional para actualizar')
                    } else if (resp == 409) {
                        setErrorRegister('El mail indicado ya se encuentra registrado.')
                    } else {
                        Swal.fire({
                            title: `${resp}`,
                            text: "No se pudo actualizar el profesional ",
                            icon: "error"
                        });
                    }
                }
            }
        }
    }

    const loadSpecialties = async () => {
        const resp = await getSpecialtiesWhitoutProf();
        setSpecialties(resp);
    }

    const handleCheckboxChange = (day: string) => {
        const newSchedule = checkedDay.map((item) => ({
            ...item,
            checked: (item.day == day) ? !item.checked : item.checked,
        }));
        setCheckedDay(newSchedule);
    };

    const dayTime = () => {
        const days = data?.days;
        const newSchedule = checkedDay.map((item) => ({
            ...item,
            checked: (days.includes(item.day)),
        }));
        setCheckedDay(newSchedule);
    }

    useEffect(() => {
        if (action == 'Modificar' && show) {
            dayTime();
        }
    }, [show]);

    const startTime = watch('hour1');

    const getEndTimeOptions = (item: any) => {
        if (!startTime) return item;
        const startTimeIndex = item.indexOf(startTime);
        return item.slice(startTimeIndex + 1);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >{action} profesional</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={data?.id} disabled hidden
                            {...register('id')} />
                        <div>
                            <label className='form-label-admin'>Nombre</label>
                            <input className='form-input-admin'
                                defaultValue={data?.name}
                                placeholder='Ingrese su/s nombre/s'
                                {...register("name", {
                                    required: "Por favor ingrese un nombre",
                                    minLength: {
                                        value: 2,
                                        message: "El nombre no puede contener menos de 2 caracteres",

                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El nombre no puede contener más de 100 caracteres",
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: "Nombre inválido",
                                    }
                                })} />
                            <small className='text-validation'>{errors.name?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Apellido</label>
                            <input className='form-input-admin'
                                defaultValue={data?.lastname}
                                placeholder='Ingrese su/s apellido/s'
                                {...register("lastname", {
                                    required: "Por favor ingrese un apellido",
                                    minLength: {
                                        value: 2,
                                        message: "El apellido no puede contener menos de 2 caracteres",

                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El apellido no puede contener más de 100 caracteres",
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: "Apellido inválido",
                                    }
                                })} />
                            <small className='text-validation'>{errors.lastname?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>DNI</label>
                            <input className='form-input-admin'
                                defaultValue={data?.dni}
                                placeholder='Ingrese su DNI'
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
                            <small className='text-validation'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Teléfono celular</label>
                            <input className='form-input-admin'
                                defaultValue={data?.phone}
                                placeholder='Ingrese su número de teléfono'
                                {...register("tel",
                                    {
                                        required: "Por favor ingrese su número de teléfono",
                                        minLength: {
                                            value: 10,
                                            message: "El número de teléfono no puede tener menos de 10 caracteres",

                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "El número de teléfono no puede tener más de 10 caracteres",
                                        },
                                        pattern: {
                                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                            message: "Número de teléfono inválido",
                                        }

                                    })} />
                            <small className='text-validation'>{errors.tel?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Email</label>
                            <input className='form-input-admin'
                                defaultValue={data?.mail}
                                placeholder="Ingrese su email"
                                {...register("email", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Dirección de email invalida'
                                    },
                                })} />
                            <small className='text-validation'>{errors.email?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Especialidad</label>
                            <select className="form-select form-input-admin" aria-label="Default select example"  {...register(
                                "speciality")} onClick={() => loadSpecialties()}>
                                {action == 'Agregar' && <option value="" selected disabled hidden>Elija una especialidad</option>}
                                {action == 'Modificar' && <option value={data?.speciality} selected>{data?.speciality}</option>}
                                {specialties.map(sp => (
                                    <option key={sp.id + sp.speciality} value={sp.id} selected={sp.speciality == data?.speciality}>{sp.speciality}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='form-label-admin'>Día/s</label>
                            {checkedDay.map(item => (
                                <label key={item.day}>
                                    <input
                                        type='checkbox'
                                        {...register('days')}
                                        onChange={() => handleCheckboxChange(item.day)}
                                        checked={item.checked}
                                        value={item.day}
                                    />
                                    <span>{item.day}</span>
                                </label>
                            ))}
                            <small className='text-validation'>{errors.days?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Horarios</label>
                            <div className='d-flex flex-row'>
                                <select className="form-select form-input-admin" aria-label="Default select example"  {...register("hour1")}>
                                    <option value="" selected disabled hidden>Entrada</option>
                                    {times.map(time => (
                                        <option key={time} value={time} selected={time == data?.hour_begin}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                                <select className="form-select form-input-admin" aria-label="Default select example"  {...register("hour2")}>
                                    <option value="" selected disabled hidden>Salida</option>
                                    {
                                        getEndTimeOptions(times).map((time: any) => (
                                            <option key={time} value={time} selected={time == data?.hour_end}>
                                                {time}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <small className='text-validation'>{errors.hour1?.message}</small>
                            <small className='text-validation'>{errors.hour2?.message}</small>
                        </div>

                        <small className='text-validation'>{errorRegister}</small>
                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>{action} Profesional</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
