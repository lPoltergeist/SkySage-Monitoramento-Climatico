import z from 'zod'
import { create } from 'zustand'


const SignUpSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
})

interface SignUpState {
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setConfirmPassword: (password: string) => void
    setName: (name: string) => void
    isValid: () => boolean
}

const UseSignUpStore = create<SignUpState>((set, get) => ({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
    setName: (name) => set({ name }),
    isValid: () => {
        const data = get()
        const result = SignUpSchema.safeParse(data)
        return result.success
    }
}))

export default UseSignUpStore