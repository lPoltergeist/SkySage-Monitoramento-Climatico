import { create } from 'zustand'

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
        const { email, password } = get()
        return email.trim() !== '' && password.trim() !== ''
    }
}))

export default UseSignInStore