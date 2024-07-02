import { createUser, updateClient } from '@/app/services/User';
import './clients.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useState } from 'react';


interface data {
    id: number,
    name: string;
    lastname: string;
    dni: number;
    tel: number;
    email: string;
}

interface clientProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action: string;
    updateData: () => void;
}

export const AddClient: React.FC<clientProps> = ({ show, handleClose, data, action, updateData }) => {

    const [errorRegister, setErrorRegister] = useState('');
    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm<data>({ mode: 'onChange' });
    const onSubmit: SubmitHandler<data> = async (newData) => {
        const user = {
            id_user: data?.id,
            mail: newData.email,
            password: 'cliente1234',
            name: newData.name,
            lastname: newData.lastname,
            dni: newData.dni,
            phone: newData.tel,
            role: 'client'
        }

        if (action == 'Agregar') {
            const resp = await createUser(user);

            if (resp == 409) {
                setErrorRegister('El mail indicado ya se encuentra registrado.')
            } else {
                Swal.fire({
                    title: `Alta Cliente`,
                    text: "Cliente registrado con exito!",
                    icon: "success"
                });
                handleClose();
                reset();
                updateData();
            }
        } else if (action == 'Modificar') {
            if (data.mail == newData.email && data.name == newData.name && data.lastname == newData.lastname && data.dni == newData.dni && data.phone == newData.tel) {
                setErrorRegister('Debe modificar algún dato.');
            } else {
                setErrorRegister('');
                const resp = await updateClient(user);

                if (resp == 404) {
                    setErrorRegister('No se encontro cliente para actualizar')
                } else {
                    Swal.fire({
                        title: `Modificación Cliente`,
                        text: "Cliente actualizado con exito!",
                        icon: "success"
                    });
                    handleClose();
                    reset();
                    updateData();

                }
            }
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{action} cliente</Modal.Title>
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
                            <small className='text-validation-admin'>{errors.name?.message}</small>
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
                            <small className='text-validation-admin'>{errors.lastname?.message}</small>
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
                            <small className='text-validation-admin'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Teléfono celular</label>
                            <input className='form-input-admin'
                                defaultValue={data?.phone}
                                placeholder='Ingrese su número de teléfono'
                                {...register("tel", {
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
                            <small className='text-validation-admin'>{errors.tel?.message}</small>
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
                            <small className='text-validation-admin'>{errors.email?.message}</small>
                        </div>
                        <small className='text-validation-admin'>{errorRegister}</small>
                        <button type='submit' disabled={!isValid} className='button-agregarcliente'>{action} cliente</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

