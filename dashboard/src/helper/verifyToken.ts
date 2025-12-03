import { api } from "@/lib/api";
import { useNavigate } from "react-router";

const VerifyToken = () => {
    const navigate = useNavigate()

    api.get('/auth/me', { withCredentials: true })
        .then(() => {
            navigate('/', { replace: true });
        })
        .catch(() => {
        });
}

export default VerifyToken