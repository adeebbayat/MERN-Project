import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../views/style.css"
export default () => {
    
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [renterOrOwner,setRenterOrOwner] = useState("Renter")
    
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();

    const onSubmitHandler = e => {

        e.preventDefault();
        if(renterOrOwner === "Renter"){
        axios.post('http://localhost:8000/api/renters', {
            username,
            password,
            email
        })
        .then(res=>{
            console.log(res);
            navigate("/")
        })
        .catch(err=>{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
        })
    }
    else if(renterOrOwner === "Owner"){
        axios.post('http://localhost:8000/api/owners', {
            username,
            password,
            email
        })
        .then(res=>{
            console.log(res);
            navigate("/")
        })
        .catch(err=>{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
        })
    }
}

    //onChange to update firstName and lastName
    return (
        <div className="form">
            <form onSubmit={onSubmitHandler}>
                <div>
                    <div>
                            <p>
                                <label>Username:</label><br/>
                                <input className="text" type="text" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                            </p>
                            <p>
                                <label>Password:</label><br/>
                                <input className="text" type="text" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                            </p>
                            <p>
                                <label>Email:</label><br/>
                                <input className="text" type="text" onChange = {(e)=>setEmail(e.target.value)} value={email}/>
                            </p>
                            <p>
                                <label>Renter or Owner?</label><br/>
                                <input type="radio" name="renterOrOwner" value = "Renter" checked="checked" onChange = {(e)=>setRenterOrOwner(e.target.defaultValue)}/>
                                <label for="Renter">Renter</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="renterOrOwner" value = "Owner" onChange = {(e)=>setRenterOrOwner(e.target.defaultValue)}/>
                                <label for="Owner">Owner</label>
                            </p>
                        
                    </div>
                    <input className = "submit" type="submit" class="btn btn-primary" value="Create Profile"/>
                    {errors.map((err, index) => <p style = {{color:'red'}}key={index}>{err}</p>)}
                </div>
            </form>
        </div>

    )
}