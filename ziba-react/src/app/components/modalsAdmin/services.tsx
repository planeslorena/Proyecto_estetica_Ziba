import { useEffect, useState } from 'react';
import './services.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createService, getSpecialtiesWhitProf, updateService } from '@/app/services/Services';
import Swal from 'sweetalert2';
interface data {
    id: number,
    name: string,
    speciality: number,
    description: string,
    price: number,
    duration: number,
}

interface servicesProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action: string;
    updateData: () => void;
}

export const AddServices: React.FC<servicesProps> = ({ show, handleClose, data, action, updateData }) => {

    const [errorRegister, setErrorRegister] = useState('');
    const [specialties, setSpecialties] = useState([{ id: '', speciality: '' }]);
    const { handleSubmit, register, formState: { errors, isValid }, reset } = useForm<data>({ mode: 'onChange' });


    const onSubmit: SubmitHandler<data> = async (newData) => {
        const service = {
            id_service: data?.id,
            name: newData.name,
            id_speciality: newData.speciality,
            description: newData.description,
            price: newData.price,
            duration: newData.duration
        }

        //AGREGAR SERVICIO
        if (action == 'Agregar') {
            const resp = await createService(service);

            if (resp == 201) {
                Swal.fire({
                    title: `Agregar Servicio`,
                    text: "Servicio registrado con exito!",
                    icon: "success"
                });
                handleClose();
                reset();
                updateData();
            } else {
                Swal.fire({
                    title: `${resp}`,
                    text: "No se pudo registrar el servicio ",
                    icon: "error"
                });
            }
        //MOFICICAR SERVICIO
        } else if (action == 'Modificar') {
            //Sino se modifico ningun dato, muestra error
            if (data.name == newData.name && data.speciality == newData.speciality && data.description == newData.description && data.price == newData.price && data.duration == newData.duration) {
                setErrorRegister('Debe modificar algún dato.');
            //Si se modificaron datos se llama al backend para actualizarlos
            } else {
                setErrorRegister('');
                const resp = await updateService(service);

                if (resp == 200) {
                    Swal.fire({
                        title: `Modificación Servicio`,
                        text: "Servicio actualizado con exito!",
                        icon: "success"
                    });
                    handleClose();
                    reset();
                    updateData();
                }
                else if (resp == 404) {
                    setErrorRegister('No se encontro servicio para actualizar')
                } else {
                    Swal.fire({
                        title: `${resp}`,
                        text: "No se pudo actualizar el servicio ",
                        icon: "error"
                    });
                }
            }
        }
    }

    const resetAndHandleClose = () => {
        reset();
        handleClose();
    }

    const loadSpecialties = async () => {
        const resp = await getSpecialtiesWhitProf();
        setSpecialties(resp);
    }

    useEffect(() => {
        loadSpecialties();
    }, [])

    return (
        <>
            <Modal show={show} onHide={resetAndHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >{action} servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={data?.id} disabled hidden
                            {...register('id')} />
                        <div>
                            <label className='form-label-admin'>Servicios</label>
                            <input className='form-input-admin'
                                defaultValue={data?.service}
                                placeholder='Ingrese el nombre del servicio'
                                {...register("name", {
                                    required: "Por favor ingrese un servicio",
                                    minLength: {
                                        value: 2,
                                        message: "El servicio no puede contener menos de 2 caracteres",

                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El servicio no puede contener más de 100 caracteres",
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: "Servicio inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.name?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Especialidad</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                {...register("speciality", {
                                    required: "Por favor ingrese una especialidad",
                                })}>
                                {specialties.map(sp => (
                                    <option selected={sp.speciality == data?.speciality} key={sp.id + sp.speciality} value={sp.id}>{sp.speciality}</option>
                                ))}
                            </select>
                            <small className='texto-validaciones'>{errors.speciality?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Descripción</label>
                            <textarea className='form-input-admin'
                                defaultValue={data?.description}
                                placeholder='Ingrese la descripción del servicio'
                                {...register("description", {
                                    required: "Por favor ingrese una descripción",
                                    minLength: {
                                        value: 50,
                                        message: "La descripción no puede contener menos de 50 caracteres",
                                    },
                                    maxLength: {
                                        value: 1000,
                                        message: "La descripción no puede contener más de 1000 caracteres",
                                    },
                                    /* pattern: {
                                         value: /^([a-zA-Z]+\s?)+$/,
                                         message: "Servicio inválido",
                                     }*/
                                })} />
                            <small className='texto-validaciones'>{errors.description?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Precio</label>
                            <input type='number' className='form-input-admin'
                                defaultValue={data?.price}
                                placeholder='Ingrese un precio'
                                {...register("price", {
                                    required: "Por favor ingrese el precio",
                                    validate: (value: number) => {
                                        if (value <= 1000) {
                                            return 'El precio no puede ser menos de $1000';
                                        } else {
                                            if (value >= 999999) {
                                                return 'El precio no puede exceder los $999999';
                                            }
                                        }
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: "Servicio inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.price?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Duración del turno</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                defaultValue={data?.duration}
                                {...register("duration", {
                                    required: "Por favor ingrese una opción",
                                })}>
                                <option value={30} >30 mins</option>
                                <option value={60}>1:00 hs</option>
                                <option value={90}>1:30 hs</option>
                                <option value={120}>2:00 hs</option>
                            </select>
                            <small className='texto-validaciones'>{errors.duration?.message}</small>
                        </div>
                        <small className='text-validation-admin'>{errorRegister}</small>
                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>{action} servicio</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}