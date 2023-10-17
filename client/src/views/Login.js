import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import LoginForm from '../components/LoginForm';

const Login = (props) =>{


    return(
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <Link type="button" class="btn btn-primary goBack" to={"/"}>Go Back</Link>
            </div>
            <h1>Login</h1>
            {<LoginForm/>}
        </div>
    )
}
export default Login