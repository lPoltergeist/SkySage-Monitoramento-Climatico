import LoginInput from './input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { api } from '@/lib/api'
import { Button } from '../ui/button'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import matchPasswords from '@/helper/matchPasswords'
import { useNavigate } from 'react-router'
import { useEffect, type ChangeEvent } from 'react'
import UseSignUpStore from '@/store/validateSignUp'

const SignUp = () => {
    const { email, password, confirmPassword, name, setEmail, setPassword, setConfirmPassword, setName, isValid } = UseSignUpStore()
    const notify = (msg: string) => toast(msg)
    const navigate = useNavigate()

    const {
        handleSubmit,
    } = useForm<any>()


    const onSubmit: SubmitHandler<any> = () => {
        if (!isValid()) {
            notify("Preencha todos os campos!")
            return
        }

        if (!matchPasswords(password, confirmPassword)) return notify("As senhas não batem!")

        api.post('/users', {
            name: name,
            email: email,
            password: password
        }, {
            withCredentials: true,
        }).then(() => {
            return api.post('/auth', {
                email,
                password
            }, { withCredentials: true });
        }).then(() => {
            navigate("/weather")
        })
            .catch((error) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    "Credenciais inválidas";
                notify(msg);
            });
    }

    useEffect(() => {
        api.get('/auth/me', { withCredentials: true })
            .then(() => {
                navigate('/weather', { replace: true });
            })
            .catch(() => {
            });
    }, [navigate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LoginInput placeholder="nome" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <LoginInput placeholder="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <LoginInput type="password" placeholder="senha" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <LoginInput type="password" placeholder="confirme a senha" onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />

            <Button type="submit" className="mz-4">Sign Up</Button>

            <ToastContainer />
        </form>
    )
}

export default SignUp