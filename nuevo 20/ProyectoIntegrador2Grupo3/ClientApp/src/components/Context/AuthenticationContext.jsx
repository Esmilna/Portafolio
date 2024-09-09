
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthenticationContext = createContext();
export const useAuthentication = () => useContext(AuthenticationContext)

export const AuthenticationProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [role, setRole] = useState(null)
    const [fullName, setFullName] = useState("anónimo")
    const [avatar, setAvatar] = useState("");

    const checkAuth = async () => {
        let error = false;
        try{
            const token = localStorage.getItem("token")
            if(token){
                const response = await fetch("api/user/verify-token", {
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                })

                if(response.ok){
                    const data = await response.json()
                    if(data.success) {
                        setIsLoggedIn(true)
                        setRole(data.dataSession.role)
                        setFullName(data.dataSession.fullName)
                        setAvatar(data.dataSession.avatar || "https://res.cloudinary.com/dlgegwry6/image/upload/v1678554138/hssos8zjqaepzd3oyllp.png")
                    }else{
                        error = true  
                    }
                }
                else{
                    error = true
                }
            }else{
                error = true
            }

        } catch(err){
            error = true
        }

        if(error){
            setIsLoggedIn(false)
            setRole(null)
            setFullName("")
            setAvatar("")
            localStorage.removeItem("token")
        }
    }

    useEffect(() => {
        checkAuth()
    },[])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setRole(null)
    }

    return (
        <AuthenticationContext.Provider value={{checkAuth, handleLogout, isLoggedIn, role, fullName, avatar}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext