import React, { useState, useEffect } from 'react';
import {useNavigate,Link,useParams} from 'react-router-dom';
import axios from 'axios';
import "../views/style.css"

const Message = (props) =>{

    const{ownerOrRenter,id} = useParams();
    return(
        <div>
            <div className='topBar'>
                <div className="leftSide">
                    <Link to ={"/"} className="stayHome">StayHome</Link>
                </div>
                <Link type="button" class="btn btn-primary goBack" to={"/" + ownerOrRenter +"/"+ id}>Go Back</Link>
            </div>
        </div>

    )
}

export default Message