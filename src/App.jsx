import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout/Layout'
import LayoutLogin from './layouts/LayoutLogin/LayoutLogin'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Verification from './pages/Verification/Verification'

import Home from './pages/Home/Home'
import EditDistance from './pages/EditDistance/EditDistance'
import EditSlideCar from './pages/EditSlideCar/EditSlideCar'

import OfferChoice from './pages/OfferChoice/OfferChoice'
import ProcessWorking from './pages/ProcessWorking/ProcessWorking'

import List from './pages/List/List'

import Notification from './pages/Notification/Notification'

import Profile from './pages/Profile/Profile'
import Payment from './pages/Profile/Payment/Payment'
import EditProfile from './pages/Profile/EditProfile/EditProfile'
import Setting from './pages/Profile/Setting/Setting'

import useOrderData from './data/OrderData';
import users from "./data/user";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './App.css'

// BrowserRouter, HashRouter, MemoryRouter
// localhost:5174/<path>    <- BrowserRouter ***nginx
// localhost:5174/#/<path>  <- HashRouter *** compatable
// localhost:5174/<path>    <- MemoryRouter

// App -> Layout -> Navbar
// tab 

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newUserReg, setNewUserReg] = useState([]);

  // This state will hold the user ID, and will be updated when loggedInUser changes
  const [loggedInUserID, setLoggedInUserID] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  // useEffect to update loggedInUserID and other dependent data when loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      setLoggedInUserID(loggedInUser.userID);
      setProfileData(loggedInUser.informProfile);
      setPaymentMethods(loggedInUser.paymentMethods);
      setCurrentShowOrder([]);
      setSaveLocation([{
        province: "",
        district: "",
        coordinates: []
      }])
      setIsAcceptingJobs(false);
    }
  }, [loggedInUser]);

  const [paymentMethods, setPaymentMethods] = useState(loggedInUser ? loggedInUser.paymentMethods : []);
  const [profileData, setProfileData] = useState(loggedInUser ? loggedInUser.informProfile : []);

  const { ordersList, addOrders, updateOrders, deleteOrders } = useOrderData(loggedInUserID);
  const [saveLocation, setSaveLocation] = useState([{
    province: "",
    district: "",
    coordinates: []
  }]);

  const [currentShowOrder, setCurrentShowOrder] = useState([]);

  const [isAcceptingJobs, setIsAcceptingJobs] = useState(false); // เพิ่ม state สำหรับสถานะรับงาน

  return (
    <div className='App-container'>
      <HashRouter>
        <Routes>
          {!loggedInUser ?
            (
              <Route element={<LayoutLogin />} >
                <Route path={'/'} element={<Login onLogin={handleLogin} />} />
                <Route path={'/home'} element={<Login onLogin={handleLogin} />} />
                <Route path={'/login'} element={<Login onLogin={handleLogin} />} />
                <Route path={'/signup'} element={<Register newUserReg={newUserReg} setNewUserReg={setNewUserReg} />} />
                <Route path={'/verify'} element={<Verification onLogin={handleLogin} newUserReg={newUserReg} setNewUserReg={setNewUserReg} />} />
              </Route>

            ) :
            (
              <Route element={<Layout />}>

                <Route path={'/'} element={<Home
                  saveLocation={saveLocation}
                  isAcceptingJobs={isAcceptingJobs}
                  setIsAcceptingJobs={setIsAcceptingJobs}
                />} />
                <Route path={'/home'} element={<Home
                  saveLocation={saveLocation}
                  isAcceptingJobs={isAcceptingJobs}
                  setIsAcceptingJobs={setIsAcceptingJobs}
                />} />
                <Route path={'/home/edit-distance'} element={<EditDistance
                  saveLocation={saveLocation}
                  setSaveLocation={setSaveLocation}
                />} />
                <Route path={'/home/edit-slide-car'} element={<EditSlideCar
                  username={loggedInUser.user}
                />} />

                <Route path={'/home/offer-choice'} element={<OfferChoice
                  ordersList={ordersList}
                  saveLocation={saveLocation}
                  setCurrentShowOrder={setCurrentShowOrder}
                  addOrders={addOrders}
                />} />

                <Route path={'/list/process-working'} element={<ProcessWorking
                  setCurrentShowOrder={setCurrentShowOrder}
                  currentShowOrder={currentShowOrder}
                  updateOrders={updateOrders}
                />} />

                <Route path={'/list'} element={<List
                  ordersList={ordersList}
                  deleteOrders={deleteOrders}
                  setCurrentShowOrder={setCurrentShowOrder}
                />} />

                <Route path={'/notification'} element={<Notification />} />

                <Route path={'/profile'} element={<Profile
                  username={loggedInUser.user}
                />} />
                <Route path={'/profile/edit-profile'} element={<EditProfile
                  loggedInUserID={loggedInUserID}
                  profileData={profileData}
                  setProfileData={setProfileData}
                  username={loggedInUser.user}
                />} />
                <Route path={'/profile/payment'} element={<Payment
                  loggedInUserID={loggedInUserID}
                  paymentMethods={paymentMethods}
                  setPaymentMethods={setPaymentMethods}
                />} />
                <Route path={'/profile/setting'} element={<Setting
                  setLoggedInUser={setLoggedInUser}
                />} />
              </Route>

            )}
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
