"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from "@/app/services/Login";
import { useContext, useState } from "react";
import "./loginForm.css";
import { useRouter } from 'next/navigation';
import { getInfoUser } from "@/app/services/User";
import { UserContext } from "@/app/context/user.context";

interface data {
    username: string,
    password: string
}

interface loginFormProps {
    onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onSwitchToRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, watch,setError, formState: { errors, isValid }} = useForm<data>({ mode: "onChange" });
    const router = useRouter();
    const { setUserData } = useContext(UserContext);

    const roleRouter = (role:string) => {
        //dependiendo del rol del usuario redirecciona a la pag correspondiente
        if (role === 'admin') {
            router.push('/admin')
        } else if (role === 'client') {
            router.push('/client')
        }
    }


    const onSubmit: SubmitHandler<data> = async (data) => {
        //Llama a el backend para generar el login
        const resp = await login(data);

        //Si hay un error de usuario no autorizado o usuario inexistente, muestra mensaje en pantalla
        if (resp == 401) {
            setError("password", {
                type: "manual",
                message: 'El mail o contraseña no son correctos.',
              })
        } else {
            //Si el login es exitoso llama a la funcion roleRouter mandandole como parametro el rol del usuario logeado.
            const user = await getInfoUser();
            //Guardo la info del usuario en el contexto
            setUserData(user);
            roleRouter(user.role);
        }
    };
    const passwordValue = watch("password", "");

    return (
        <>
            <div className='container-form-login '>
                <div className="image-login d-flex justify-content align-items"></div>
                <div className='form-login'>
                    <img src="/imagenes/logoziba-small.png" alt="" className="img-logoziba-small-login d-flex justify-content align-items" onClick={() => router.push('/home')} />
                    <h3 className="title-login">Iniciar sesión</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                        <div>
                            <label className='form-label-login'>Email</label>
                            <input className='form-input-login'
                                type="email"
                                placeholder="Ingrese su email"
                                {...register("username", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Email invalido.'
                                    }
                                })} />
                            <small className='text-validation-login'>{errors.username?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-login'>Contraseña</label>
                            <div className="password-input-login">
                                <input id="password" className='form-input-login'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingrese su contraseña"
                                    {...register("password", {
                                        required: 'Por favor ingrese su contraseña'
                                    })} />

                                {passwordValue && (
                                    <div className="visible-invisible-login">
                                        {showPassword ? (
                                            <img src="https://img.icons8.com/material/24/000000/visible--v1.png" alt="visible" onClick={() => setShowPassword(false)} />
                                        ) : (
                                            <img src="https://img.icons8.com/material/24/000000/invisible--v1.png" alt="invisible" onClick={() => setShowPassword(true)} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <small className='text-validation-login'>{errors.password?.message}</small>
                        <button type="submit" disabled={!isValid} className='button-login'> Iniciar sesion</button>
                    </form>
                    <div className="container-question">
                        <p className="question">¿Es tu primera vez en Zibá?{' '}</p>
                        <a href="#" onClick={onSwitchToRegister}className="a-registrate">Regístrate</a>
                    </div>
                </div>
            </div>

        </>
    )
}