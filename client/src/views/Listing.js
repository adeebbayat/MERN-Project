import React, { useEffect, useState,Navigate } from "react";
import { Link, useParams,useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import './style.css'

const Listing = (props) => {
    const [listingObj, setListingObj] = useState([]);
    const [request_status,setRequest_Status] = useState("pending");
    const [renter, setRenter] = useState("");
    const [listing,setListing] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [request,setRequest] = useState([]);
    const [alreadyBooked,setAlreadyBooked] = useState(false);
    const { renterid,listingid } = useParams();
    useEffect(()=>{
        setRenter(renterid);
        setListing(listingid);
    })
    

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/listings/" + listingid)
            .then((res) => {
                setListingObj(res.data);
                setLoaded(true);
                
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/requests")
        .then((res) => {
            setRequest(res.data)
            const repeatRequest = res.data.filter((object,i)=> 
                object.renter === renter && object.listing === listing
            
            );
            console.log(repeatRequest)
            if(repeatRequest.length > 0){
                setAlreadyBooked(true)
            }
            

        })
        .catch((err) => console.log(err))
    },[renter])

    const onSubmitHandler = e => {
    if(alreadyBooked === false){
        axios.post("http://localhost:8000/api/requests",{
            renter,
            listing,
            request_status

        })
        .then(res=>{
            console.log(res)
            navigate(`/renter/${renterid}`)
            alert("Booking Request Sent!")
        })
        .catch(err => console.log(err))

    } else{
        alert("You've already made a booking request!")
    }}


    return (
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <div className="rightSide">
                <Link to={`/renter/${renter}`} class = "btn btn-primary">Go Back</Link>
                <Link to="/" class = "btn btn-primary">Logout</Link>
                </div>
            </div>
            <h1>Book this listing today!</h1>
            <div className="listingInfo">
                <img src={loaded && `${listingObj.photo_url}`} width="550"/>
                <div className="listingText">
                    <h3>{listingObj.address}</h3>
                    <h4>{listingObj.description}</h4>
                    <button type="button" class="btn btn-success" onClick={onSubmitHandler}>Request to book</button>
                </div>
            </div>
            <div className="botBar">
                <h1 className="botBarText">I am Bottom Bar</h1>
            </div>
        </div>
    );
};
export default Listing;
