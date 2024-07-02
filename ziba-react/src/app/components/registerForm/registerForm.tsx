"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { createUser } from "@/app/services/User";
import "./registerForm.css";
import Swal from 'sweetalert2'


interface datos {
    name: string,
    lastname: string,
    dni: number,
    phone: number,
    email: string,
    password: string,
    repeatPassword: string
}

interface registerProps {
    onSwitchToLogin: () => void
}

export const RegisterForm: React.FC<registerProps> = ({ onSwitchToLogin }) => {
    const [password, setPassword] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [errorRegister, setErrorRegister] = useState('');

    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<datos>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<datos> = async (datos) => {
        const user = {
            mail: datos.email,
            password: datos.password,
            name: datos.name,
            lastname:datos.lastname,
            dni: datos.dni,
            phone: datos.phone,
            role: 'client'
        }
        const resp = await createUser(user);

        if (resp == 409) {
           setErrorRegister('El mail indicado ya se encuentra registrado.')
        } else {
            Swal.fire({
            title: `Hola ${datos.name}!`,
            text: "Ya podes empezar a disfrutar de nuestros servicios!",
            icon: "success"
            });
            onSwitchToLogin();
        }
    };

    const passwordValue = watch("password", "");
    const repeatPasswordValue = watch("repeatPassword", "");

    const checkComplexity = (password: string): boolean => {
        // Define your password complexity rules here
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    return (
        <>
            <div className='container-form-register container-register'>
                <div className="image">
                </div>
                <div className='form-register'>
                    <h3 className="title-register">Crea una cuenta</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div className="fields-name-and-lastname">
                            <div className="field-name">
                                <label className='form-label-register'>Nombre</label>
                                <input className='form-input-register'
                                    placeholder="Ingrese su nombre"
                                    {...register("name", {
                                        required: 'Por favor ingrese nombre',
                                        minLength: {
                                            value: 2,
                                            message: 'El contenido no puede ser menos de 2 caractéres.'
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'El contenido no puede exceder los 100 caractéres.'
                                        },
                                        pattern: {
                                            value: /^([a-zA-Z]+\s?)+$/,
                                            message: 'Nombre invalido'
                                        },
                                    })} />
                                <small className='text-validation-register'>{errors.name?.message}</small>
                            </div>
                            <div>
                                <label className='form-label-register'>Apellido</label>
                                <input className='form-input-register'
                                    placeholder="Ingrese su apellido"
                                    {...register("lastname", {
                                        required: 'Por favor ingrese su apellido',
                                        minLength: {
                                            value: 2,
                                            message: 'El contenido no puede ser menos de 2 caractéres.'
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'El contenido no puede exceder los 100 caractéres.'
                                        },
                                        pattern: {
                                            value: /^([a-zA-Z]+\s?)+$/,
                                            message: 'Apellido invalido'
                                        },
                                    })} />
                                <small className='text-validation-register'>{errors.lastname?.message}</small>
                            </div>
                        </div>
                        <div>
                            <label className='form-label-register'>DNI</label>
                            <input className='form-input-register'
                                placeholder="Ingrese su dni (Sin puntos)"
                                {...register("dni", {
                                    required: 'Por favor ingrese su dni',
                                    validate: (value: number) => {
                                        if (value < 1000000 || value > 100000000) {
                                            return 'Debe ingresar un DNI valido';
                                        }
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: 'DNI invalido'
                                    }
                                })} />
                            <small className='text-validation-register'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-register'>Email</label>
                            <input className='form-input-register'
                                placeholder="Ingrese su email"
                                {...register("email", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Dirección de email invalida'
                                    },
                                })} />
                            <small className='text-validation-register'>{errors.email?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-register'>Teléfono celular</label>
                            <input className='form-input-register'
                                placeholder="Ingrese su teléfono celular (Ej.: 2284123456)"
                                {...register("phone", {
                                    required: 'Por favor ingrese su número de celular',
                                    minLength: {
                                        value: 10,
                                        message: 'Número invalido',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Número invalido',
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: 'Numero de teléfono invalido'
                                    }
                                })} />
                            <small className='text-validation-register'>{errors.phone?.message}</small>
                        </div>
                        <div className="fields-passwords">
                            <div className="field-password">
                                <label className='form-label-register'>Contraseña</label>
                                <div className="password-input-register">
                                    <input className='form-input-register'
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Ingrese su contraseña"
                                        id="password"
                                        onFocus={() => {
                                            setShowTooltip(true)
                                        }}
                                        {...register("password", {
                                            required: 'Por favor ingrese una contraseña',
                                            minLength: 8,
                                            maxLength: 32,
                                            onBlur: () => { setShowTooltip(false) },
                                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                setPassword(e.target.value)
                                            }
                                        })} />
                                    {passwordValue && (
                                        <div className="visible-invisible-register">
                                            {showPassword ? (
                                                <img src="https://img.icons8.com/material/24/000000/visible--v1.png" alt="visible" onClick={() => setShowPassword(false)} />
                                            ) : (
                                                <img src="https://img.icons8.com/material/24/000000/invisible--v1.png" alt="invisible" onClick={() => setShowPassword(true)} />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {showTooltip && !checkComplexity(password) && (
                                    <p className="text-danger">
                                        Contraseña debe contener por lo menos 8 caractéres (máx. 32), mayúscula, minuscula, numeros, y caractéres especiales.
                                    </p>
                                )}
                                <small className='text-validation-register'>{errors.password?.message}</small>
                            </div>
                            <div>
                                <label className='form-label-register'>Confirmar contraseña</label>
                                <div className="password-input-register">
                                    <input className='form-input-register'
                                        type={showRepeatPassword ? 'text' : 'password'}
                                        placeholder="Ingrese su contraseña nuevamente"
                                        id="repeatPassword"
                                        {...register("repeatPassword", {
                                            required: 'Por favor ingrese una contraseña',
                                            validate: (val: string) => {
                                                if (watch('password') != val) {
                                                    return "Las contraseñas no coinciden";
                                                }
                                            }
                                        })} />
                                    {repeatPasswordValue &&
                                        <div className="visible-invisible-register">
                                            {
                                                (showRepeatPassword === false ?
                                                    <img width="24" height="24" src="https://img.icons8.com/material/24/000000/invisible--v1.png" alt="invisible--v1" onClick={() => { setShowRepeatPassword(!showRepeatPassword) }} /> : <img width="24" height="24" src="https://img.icons8.com/material/24/000000/visible--v1.png" alt="visible--v1" onClick={() => { setShowRepeatPassword(!showRepeatPassword) }} />
                                                )
                                            }
                                        </div>
                                    }
                                </div>
                                <small className='text-validation-register'>{errors.repeatPassword?.message}</small>
                            </div>
                        </div>
                        <small className='text-validation-register'>{errorRegister}</small>
                        <button type="submit" disabled={!isValid} className='button-register'> Registrate </button>
                    </form>
                    <div className="container-question-register">
                        <p className="question">¿Ya tenés una cuenta en Zibá?{' '}</p>
                        <a href="#" onClick={onSwitchToLogin}className="a-login">Inicia sesión</a>
                    </div>
                </div>
            </div>
        </>
    )
}