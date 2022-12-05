import { useState } from "react";

const useValidation = () => {
    const [email, setEmail] = useState(null)
    const tokenText = localStorage.getItem('jwt');
    if (tokenText) {
        fetch('http://localhost:5000/verifyuser', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => res.json())
            .then(data => setEmail(data.email))
    }
    return [email]
};

export default useValidation;