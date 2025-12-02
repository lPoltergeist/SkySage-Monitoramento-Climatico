const matchPasswords = (password: string, confirmationPassword: string): boolean => {
    if (password !== confirmationPassword) return false

    return true
}

export default matchPasswords