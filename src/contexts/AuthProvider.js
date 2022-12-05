import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const authInfo = { user, loading, setUser };
    useEffect(() => {
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
                .then(data => setUser(data.email))
        }
        setLoading(false)
    }, [user])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;