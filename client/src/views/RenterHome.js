import React, { useEffect, useState,Navigate, useLayoutEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'

const RenterHome = (props) => {
    const [renter, setRenter] = useState("");
    const [listing, setListing] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [request, setRequest] = useState([]);
    const [filteredRequest,setFilteredRequest] = useState([]);
    const [filteredPhotosURLFinal,setFilteredPhotosURLFinal] = useState([])
    const [filterLoaded,setFilterLoaded] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/renters/' + id)
        .then(res => {
            setRenter(res.data)
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/listings")
            .then((res) => {
                setListing(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/requests")
            .then((res) => {
                setRequest(res.data);
                const filtered = request.filter((renter) => renter.renter === id);
                const filteredPhotoURL = [];
                for(let i = 0; i < filtered.length;i++){
                    const filteredPhotos = listing.filter((listing) => listing._id === filtered[i].listing)
                    filteredPhotoURL.push(filteredPhotos[0].photo_url)
                }
                setFilteredRequest(filtered)
                setFilteredPhotosURLFinal(filteredPhotoURL)
                setFilterLoaded(true)

            })
            .catch((err) => console.log(err));
        }, [renter,filteredPhotosURLFinal,id]);
    


    const removeRequest = (i) =>{
        axios.delete(`http://localhost:8000/api/requests/${filteredRequest[i]._id}`)
        .then((res)=> console.log(res))
        .catch((err) => console.log(err))
        console.log(filteredRequest[i]._id)
        setFilteredPhotosURLFinal(filteredPhotosURLFinal.splice(i,1))
        alert("Booking request has been canceled!")

    }


                
        
    return (
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <div className="rightSide">
                <Link to="/" class="btn btn-primary">Logout</Link>
                </div>
            </div>
            <h1>Hello, {renter.username}</h1>
            <h1>Click on any home to view more details!</h1>
            <div  className="homeImageDiv">
                {loaded && listing.map((listing,i)=>
                    <div>
                        <Link key = {i}to={`/listing/${renter._id}/${listing._id}`}>
                            <img key = {i}className="homeImage" src={loaded && `${listing.photo_url}`} width={450}/>
                        </Link>
                        <h3>{listing.address}</h3>
                    </div>
                )}
            </div>
            <div className="statusBar">
                <div>
                <h1>Your Requests</h1>

        <div className="maps">

            {filteredRequest.map((filteredRequest, i) => (
                <div key={i} className="requestItem">
                    <div className="imageContainer">
                    <img src={filterLoaded ? filteredPhotosURLFinal[i] : ''} width={200} alt={`i`} />

                    </div>
                    <div className="status">
                        <h4>Status: {filteredRequest.request_status}</h4>
                    </div>
                    <div className="cancelButton">
                        <button onClick = {() => removeRequest(i)} class="btn btn-danger">Cancel Request</button>
                    </div>
                </div>
            ))}
            
        </div>
                </div>
            </div>
            <div className="botBar">
                <img src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" width="50" height="30"/>
                <img src="https://th.bing.com/th/id/R.0b96193508a806746ea68f0e1c0c0694?rik=Fi4%2froOKPymHLg&riu=http%3a%2f%2ffc00.deviantart.net%2ffs71%2ff%2f2014%2f031%2fc%2fd%2ftwitter_logo_vector_by_oguzhanbahardesign-d74i1sd.png&ehk=lLaZa%2fIDkISChl24W9Ek2d5nRmjQLJR3vzsW%2bXG4Umw%3d&risl=&pid=ImgRaw&r=0" width="40" height="30"/>
                <img src="https://www.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png" width="40" height="40"/>
                <h3>Contact Us</h3>
            </div>
        </div>
    );
};
export default RenterHome;
