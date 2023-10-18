import React, { useEffect, useState } from 'react'
import {Link, useParams,useNavigate} from 'react-router-dom'
import axios from 'axios';


const OwnerHome = (props) => {
    const [owner, setOwner] = useState("");
    const [listing,setListing] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const [notLoaded,setNotLoaded] = useState(false);
    const [renter, setRenter] = useState([]);
    const [request,setRequest] = useState([]);
    const [filteredRenter,setFilteredRenter] = useState([]);
    const [filteredRenterLoaded,setFilteredRenterLoaded] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
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
            setLoaded(true)
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
    useEffect(()=>{
        const filteredListing = listing.filter((object) => object.owner === id);
        if(filteredListing.length < 1){
            setNotLoaded(true)
        }
        else if (filteredListing.length > 0){
            setNotLoaded(false)
        }
    },[id,listing,request,renter,filteredRenterLoaded])
    
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
    },[id,listing,request,renter,filteredRenterLoaded])

    const updateRequest = (id,request_status) =>{
        axios.patch('http://localhost:8000/api/requests/' + id, {
            request_status
        })
        .then(res => {
            const requestIndex = request.findIndex((request) => request._id === id)
            const updatedRequest = [...request]
            updatedRequest[requestIndex].request_status = request_status
            setRequest(updatedRequest)
            alert(`Response of [${request_status}] sent to renter! `)
            
        })
        .catch(err=>console.log(err))
    }

    
    return(
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <div className="rightSide">
                <Link to={"/message/" + owner +"/" + id} class="btn btn-primary">Messages</Link>
                {notLoaded && <Link to={"/newlisting/"+owner._id} class = "btn btn-primary">Create a Listing</Link>}
                <Link to="/" class="btn btn-primary">Logout</Link>
                </div>
            </div>
            <h1 className="hello">Hello {owner.username}</h1>
            <div className="ownerListingInfo">
                    {filteredListing.length > 0  ? (
                    <div>
                        <img src={loaded && `${filteredListing[0].photo_url}`} width={450}/>
                        <div className="ownerListingInfoText">
                            <h2>Your Listing:</h2>
                            <h3>{loaded && filteredListing[0].address}</h3>
                            <h3>{loaded && filteredListing[0].description}</h3>
                        </div>
                    </div>
                )
                :
                (
                    <div>
                                        <p>No listing found</p>
                    </div>
                                    )}
                    <div>
                        <h2>Your Requests:</h2>
                        <div className="ownerRequestContainer">
                            <div className="filteredRenterName">
                                    <h5>From:</h5>
                                {filteredRenterLoaded && filteredRenter.map((renter,i)=>
                                renter.length > 0 ?(
                                <div className="requestSpace">
                                    <p>{filteredRenterLoaded && renter[0].username}</p>
                                </div>
                                )
                                    :(
                                        <p>Loading...</p>
                                    )
                                )}
                            </div>
                            <div className="filteredRequest">
                                <h5>Status:</h5>
                                {filteredRequest.map((request,i)=>
                                <div className="requestSpace">
                                    <p>{filteredRenterLoaded && request.request_status}</p>
                                </div>
                                )}
                            </div>
                            <div>
                                <h5>Approve or Deny:</h5>
                            {filteredRequest.map((request,i)=>
                                <div className="approveOrDeny">
                                    <button onClick = {() => updateRequest(request._id,"approved")} class="btn btn-success">Approve</button>
                                    <button onClick = {() => updateRequest(request._id,"denied")} class="btn btn-danger">Deny</button>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                
            </div>
            <div className="botBar">
                <h1>I am Bottom Bar</h1>
            </div>
        </div>
    )
}
export default OwnerHome