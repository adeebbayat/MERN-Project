import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../views/style.css"
export default () => {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[renters,setRenters] = useState([]);
    const[owners,setOwners] = useState([]);
    const[renterOrOwner,setRenterOrOwner] = useState("Renter")
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();

    const onSubmitHandler = e =>{
        e.preventDefault();
        if(renterOrOwner === "Renter"){
            for(let i = 0; i < renters.length;i++){
                if(renters[i].username === username){
                    if(renters[i].password === password){
                        navigate(`/renter/${renters[i]._id}`)
                    }
                }
            }
        }else if(renterOrOwner ==="Owner"){
            for(let i = 0; i < owners.length;i++){
                if(owners[i].username === username){
                    if(owners[i].password === password){
                        navigate(`/owner/${owners[i]._id}`)
                    }
                }
            }
        }
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/api/renters')
            .then(res=>{
                setRenters(res.data);
                console.log(res.data)
            })
            .catch(err => console.error(err));
    },[]);

    useEffect(() =>{
        axios.get('http://localhost:8000/api/owners')
            .then(res=>{
                setOwners(res.data);
                console.log(res.data)
            })
            .catch(err => console.error(err));
    },[]);




    return (
        <div className="form">
            <form onSubmit={onSubmitHandler}>
                <div>
                {errors.map((err, index) => <p style = {{color:'red'}}key={index}>{err}</p>)}
                    <div>
                            <p>
                                <label >Username:</label><br/>
                                <input className="text" type="text" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                            </p>
                            <p>
                                <label>Password:</label><br/>
                                <input className="text" type="text" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                            </p>
                            <p>
                                <label>Renter or Owner?</label><br/>
                                <input type="radio" name="renterOrOwner" value = "Renter" checked="checked" onChange = {(e)=>setRenterOrOwner(e.target.defaultValue)}/>
                                <label for="Renter"> Renter</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="renterOrOwner" value = "Owner" onChange = {(e)=>setRenterOrOwner(e.target.defaultValue)}/>
                                <label for="Owner">Owner</label>
                            </p>
                        
                    </div>
                    <input className = "submit" class="btn btn-primary" type="submit" value="Login"/>
                </div>
            </form>
        </div>



    )
}