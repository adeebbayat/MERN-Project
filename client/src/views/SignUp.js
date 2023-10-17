import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import SignUpForm from '../components/SignUpForm';
import './style.css'
const SignUp = (props) =>{


    return(
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <Link type="button" class="btn btn-primary goBack" to={"/"}>Go Back</Link>
            </div>
            <h1>Sign Up</h1>
            {<SignUpForm/>}
        </div>
    )
}
export default SignUp