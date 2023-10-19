import React, {useEffect,useState,Navigate} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import ListingList from '../components/ListingList';
import './style.css'
const Main = (props) => {
    const [listing,setListing] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:8000/api/listings')
            .then(res=>{
                setListing(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[]);


    return (
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <div className="rightSide">
                    <Link type="button" class="btn btn-primary" to={"/login"}>Login</Link>
                    <Link type="button" class="btn btn-primary" to={"/signup"}>Sign Up</Link>
                </div>
            </div>
            <div className='midBar'>
                <h1>Welcome to StayHome.com</h1>
                <h2>Rent any of these homes today!</h2>
                <div  className="homeImageDiv">
                    {listing.map((listing,i)=>
                        <div>
                            <Link to="/login">
                                <img className="homeImage" src={loaded && `${listing.photo_url}`} width={450}/>
                            </Link>
                            <h3>{listing.address}</h3>
                        </div>
                    )}
                </div>
            </div>
            <div className="missionStatement">
                <h2 className="missionStatementText">Mission Statement</h2>
                <div className="missionStatementText">
                    <p>At StayHome, our mission is to connect individuals, families, and travelers from around the world with unique and inspiring places to stay. We are committed to creating a global community where people can belong, experience the world's diverse cultures, and find the comfort of home, wherever they go.</p>
                    <p>We believe that by opening up the doors to new experiences, we can foster a sense of belonging and shared humanity. Our platform empowers hosts to share their spaces and passions, enabling guests to immerse themselves in local cultures, discover hidden gems, and create unforgettable memories.</p>
                    <p>With StayHome, you're not just finding a place to stay; you're finding a place to belong. Join us in our journey to make the world feel a little bit smaller, and a lot more connected. Together, we can create a global family, one stay at a time.</p>
                </div>
            </div>
            {/* <div className="secondFromBottom">
                <h2>Fill in Content Here</h2>
                <div>
                    <p>Fill in content here</p>
                    <p>Fill in content here</p>
                    <p>Fill in content here</p>
                </div>
            </div>
            <div className="firstFromBottom">
                <h2 className="missionStatementText">Fill in Content Here</h2>
                <div className="missionStatementText">
                    <p>Fill in content here</p>
                    <p>Fill in content here</p>
                    <p>Fill in content here</p>
                </div>
            </div>
            <div className="secondFromBottom">
                <h2>Fill in Content Here</h2>
                <div>
                    <p>Fill in content here</p>
                    <p>Fill in content here</p>
                    <p>Fill in content here</p>
                </div>
            </div> */}
            <div className="botBar">
                <img src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" width="50" height="30"/>
                <img src="https://th.bing.com/th/id/R.0b96193508a806746ea68f0e1c0c0694?rik=Fi4%2froOKPymHLg&riu=http%3a%2f%2ffc00.deviantart.net%2ffs71%2ff%2f2014%2f031%2fc%2fd%2ftwitter_logo_vector_by_oguzhanbahardesign-d74i1sd.png&ehk=lLaZa%2fIDkISChl24W9Ek2d5nRmjQLJR3vzsW%2bXG4Umw%3d&risl=&pid=ImgRaw&r=0" width="40" height="30"/>
                <img src="https://www.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png" width="40" height="40"/>
                <h3>Contact Us</h3>
            </div>
        </div>
    )

}

export default Main;