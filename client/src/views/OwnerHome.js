import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';

const OwnerHome = (props) => {
    const [owner, setOwner] = useState("");
    const [listing,setListing] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const [renter, setRenter] = useState([]);
    const [request,setRequest] = useState([]);
    const [filteredRenter,setFilteredRenter] = useState([]);
    const [filteredRenterLoaded,setFilteredRenterLoaded] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/owners/' + id)
        .then(res => {
            setOwner(res.data)
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

    useEffect(()=>{
        axios.get("http://localhost:8000/api/renters")
        .then(res => {
            setRenter(res.data)

        })
        .catch(err => console.log(err))
    },[])

    //Filters all listings to find listings that belong to this owner
    const filteredListing = listing.filter((object) => object.owner === id);

    // Filters all requests to find the requests that belong to this owner
    const filteredRequest = filteredListing.length > 0 ? request.filter((object) => object.listing === filteredListing[0]._id) : [];
    
    useEffect(()=>{

        // Filter all renters to find those who have a request with this particular owner
        const filteredRentersArray = [];
        for(let i = 0; i < filteredRequest.length;i++){
            let filteredRenters = renter.filter((renter) => renter._id === filteredRequest[i].renter)
            filteredRentersArray.push(filteredRenters)
        }
        setFilteredRenter(filteredRentersArray)
        setFilteredRenterLoaded(true)
    },[id,listing,request,renter])



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

            <div className="ownerRequestContainer">
                <div className="filteredRenterName">
                    {filteredRenterLoaded && filteredRenter.map((renter,i)=>
                    renter.length > 0 ?(
                        <p>{filteredRenterLoaded && renter[0].username}</p>
                    )
                        :(
                            <p>Loading...</p>
                        )
                    )}
                </div>

                <div className="filteredRequest">
                    {filteredRequest.map((request,i)=>
                    <p>{request.request_status}</p>
                    
                    )}
                </div>
                <div>
                {filteredRequest.map((request,i)=>
                    <div className="approveOrDeny">
                        <button className="approve">Approve</button>
                        <button>Deny</button>
                    </div>
                )}
                </div>
                

            </div>
            <div className="botBar">
                <h1>I am Bottom Bar</h1>
            </div>
        </div>
    )
}
export default OwnerHome