import { create } from 'zustand'

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
        const { email, password } = get()
        return email.trim() !== '' && password.trim() !== ''
    }
}))

export default UseSignUpStore