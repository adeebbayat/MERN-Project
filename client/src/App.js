import logo from './logo.svg';
import Main from './views/Main';
import SignUp from './views/SignUp';
import Login from './views/Login';
import OwnerHome from './views/OwnerHome';
import RenterHome from './views/RenterHome';
import Listing from './views/Listing';
import './App.css';
import {Routes,Route,Link,Navigate} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signup" element ={<SignUp/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/owner/:id" element={<OwnerHome/>}/>
        <Route path="/renter/:id" element = {<RenterHome/>}/>
        <Route path="/listing/:renterid/:listingid" element={<Listing/>}/>
      </Routes>
    </div>
  );
}

export default App;
