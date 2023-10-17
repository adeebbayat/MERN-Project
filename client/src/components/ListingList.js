import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const ListingList = (props) =>{



    console.log(props)


    return(
        <div>
            <h1>{`Address is ${props.listings[0].address}`}</h1>
            <h1>{`Owner is ${props.listings[0].owner}`}</h1>
            <h1>{`Description is ${props.listings[0].description}`}</h1>
            <h1>{`Photo URL is ${props.listings[0].photo_url}`}</h1>
        </div>
    )
}

export default ListingList;