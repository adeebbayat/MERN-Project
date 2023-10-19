import React, { useState, useEffect } from 'react';
import {useNavigate,Link,useParams} from 'react-router-dom';
import axios from 'axios';
import "../views/style.css"

const NewListing = (props) =>{
    const [address,setAddress] = useState("");
    const [description,setDescription] = useState("");
    const [photo_url, setPhoto_URL] = useState("https://i.pinimg.com/736x/30/35/71/303571ceb8ab676185ecfb272eb7b8c5.jpg");
    const [loaded,setLoaded] = useState(true);
    const [errors,setErrors] = useState([]);

    const {ownerid} = useParams();
    const owner = ownerid

    const navigate = useNavigate();

    const onSubmitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/listings', {
            owner,
            address,
            photo_url,
            description,
            
        })
        .then(res=>{
            console.log(res);
            navigate("/owner/"+ownerid)

        })
        .catch(err=>{const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrors(errorArr);
        })
        alert("New Listing Created!")
    }
    return (
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <Link type="button" class="btn btn-primary goBack" to={"/owner/"+ownerid}>Go Back</Link>
            </div>
            <div className="newListing">
                <div>
                    <h1>Create a New Listing:</h1>
                    <form onSubmit={onSubmitHandler}>
                        <div>
                            <div>
                                    <p>
                                        <label >Address:</label><br/>
                                        <input className="text" type="text" onChange={(e)=>setAddress(e.target.value)} value={address}/>
                                    </p>
                                    <p>
                                        <label>Description:</label><br/>
                                        <input className="text" type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                                    </p>
                                    <p>
                                        <label>Photo URL: (Change Default URL Below)</label><br/>
                                        <input className="text" type="text" onChange={(e)=>{
                                            setPhoto_URL(e.target.value)
                                            setLoaded(true)
                                        }} value={photo_url}/>
                                    </p>
                                    
                                
                            </div>
                            <input className = "submit" class="btn btn-primary" type="submit" value="Create Listing"/>
                            {errors.map((err, index) => <p style = {{color:'red'}}key={index}>{err}</p>)}
                        </div>
                    </form>
                </div>
                {loaded && <img src={`${photo_url}`} width="350"/>}
            </div>
            <div className="botBar">
                <img src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" width="50" height="30"/>
                <img src="https://th.bing.com/th/id/R.0b96193508a806746ea68f0e1c0c0694?rik=Fi4%2froOKPymHLg&riu=http%3a%2f%2ffc00.deviantart.net%2ffs71%2ff%2f2014%2f031%2fc%2fd%2ftwitter_logo_vector_by_oguzhanbahardesign-d74i1sd.png&ehk=lLaZa%2fIDkISChl24W9Ek2d5nRmjQLJR3vzsW%2bXG4Umw%3d&risl=&pid=ImgRaw&r=0" width="40" height="30"/>
                <img src="https://www.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png" width="40" height="40"/>
                <h3>Contact Us</h3>
            </div>
        </div>
    )
}

export default NewListing