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
            <div className="botBar">
                <img src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" width="50" height="30"/>
                <img src="https://th.bing.com/th/id/R.0b96193508a806746ea68f0e1c0c0694?rik=Fi4%2froOKPymHLg&riu=http%3a%2f%2ffc00.deviantart.net%2ffs71%2ff%2f2014%2f031%2fc%2fd%2ftwitter_logo_vector_by_oguzhanbahardesign-d74i1sd.png&ehk=lLaZa%2fIDkISChl24W9Ek2d5nRmjQLJR3vzsW%2bXG4Umw%3d&risl=&pid=ImgRaw&r=0" width="40" height="30"/>
                <img src="https://www.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png" width="40" height="40"/>
                <h3>Contact Us</h3>
            </div>
        </div>
    )
}
export default Login