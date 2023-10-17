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

    const onSubmitHandler = e => {
        axios.post("http://localhost:8000/api/requests",{
            renter,
            listing,
            request_status

        })
        .then(res=>{
            console.log(res)
            navigate(`/renter/${renterid}`)
        })
        .catch(err => console.log(err))

    }

    return (
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <div className="rightSide">
                <Link to="/">Logout</Link>
                </div>
            </div>
            <h1>Book this listing today!</h1>
            <img src={loaded && `${listingObj.photo_url}`} width="800"/>
            <h3>{listingObj.address}</h3>
            <div className="requestCheck">
            <button type="button" class="btn btn-success" onClick={onSubmitHandler}>Request to book</button>
            </div>
            <div className="botBar">
                <h1 className="botBarText">I am Bottom Bar</h1>
            </div>
        </div>
    );
};
export default Listing;
