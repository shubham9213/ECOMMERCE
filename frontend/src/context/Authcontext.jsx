import {createContext ,useState} from "react";

export const authcontext=createContext();

export const Authprovider=({children})=>{
    const [user,setuser]=useState(null);
    const login=(userdata)=>{
        setuser(userdata);
        localStorage.setItem("userdata", JSON.stringify(userdata));
    }

     const logout=()=>{
        setuser(null);
        localStorage.removeItem("userdata");
    }
    return (
        <authcontext.Provider value={{ user, login, logout }}>
            {children}
        </authcontext.Provider>
    );
}