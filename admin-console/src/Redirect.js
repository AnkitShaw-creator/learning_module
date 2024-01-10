import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/** THIS PAGE IS ONLY FOR REDIRECTING TO ADMIN SITE */

function Redirect() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/admin')
    }, []);

    return (
        <div></div>
    );
}

export default Redirect;