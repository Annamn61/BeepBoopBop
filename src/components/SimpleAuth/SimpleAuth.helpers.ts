import { useEffect, useState } from "react";

export const useSimpleAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const pass = localStorage.getItem('SimplePass');
        checkPassword(pass);
    }, [])

    const checkPassword = (password: string | null) => {
        if(!password) return;

        const correctPass = 'bunnybunnybunny'
        if(password === correctPass) {
            setIsLoggedIn(true);
            localStorage.setItem('SimplePass', correctPass);
        }
    }

    return {
        isLoggedIn, checkPassword
    }
}