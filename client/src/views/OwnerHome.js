import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';

const OwnerHome = (props) => {
    const [owner, setOwner] = useState("");
    const [listing,setListing] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const [request,setRequest] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/owners/' + id)
        .then(res => {
            setOwner(res.data)
            console.log(owner)
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        axios.get('http://localhost:8000/api/listings')
        .then(res => {
            setListing(res.data);
            setLoaded(true);
        })

        .catch(err => console.log(err))
    },[])

    useEffect(() =>{
        axios.get("http://localhost:8000/api/requests")
        .then(res =>{
            setRequest(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    const filteredListing = listing.filter((object) => object.owner === id);
    const filteredRequest = filteredListing.length > 0 ? request.filter((object) => object.listing === filteredListing[0]._id) : [];


    return(
        <div>
            <div className='topBar'>
                <a href="/">
                    <h1 className="stayHome">StayHome</h1>
                </a>
                <Link to="/">Logout</Link>
            </div>
            <h1>Hello {owner.username}</h1>
            <h1>Your Listing:</h1>
            <h1>Address: {loaded && filteredListing[0].address}</h1>
            <img src={loaded && `${filteredListing[0].photo_url}`} width={800}/>
            <h1>Description: {loaded && filteredListing[0].description}</h1>
            <h1>Your Requests:</h1>
            {filteredRequest.map((request,i)=>
            <p>{request.renter} | {request.request_status}</p>
            
            )}
            <div className="botBar">
                <h1>I am Bottom Bar</h1>
            </div>
        </div>
    )
}
export default OwnerHome