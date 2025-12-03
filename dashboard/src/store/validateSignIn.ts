import { create } from 'zustand'
import { z } from 'zod'

const SignInSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

interface SignInState {
    email: string,
    password: string,
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    isValid: () => boolean
}

const UseSignInStore = create<SignInState>((set, get) => ({
    email: '',
    password: '',
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    isValid: () => {
        const data = get()
        const result = SignInSchema.safeParse(data)
        return result.success
    }
}))

export default UseSignInStore