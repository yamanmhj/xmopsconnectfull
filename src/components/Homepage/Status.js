import React, {useState, useContext, useEffect} from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [IsAuthenticated, setIsAuthenticated] = useState(false);

    const[status, setStatus] = useState(false);

    const{getSession, logouts} = useContext(AccountContext);

    useEffect(() => {
        getSession().then((session) => {
                console.log("Session", session);
                setStatus(true);
                
            });
    },[getSession]);

    };

export default Status;