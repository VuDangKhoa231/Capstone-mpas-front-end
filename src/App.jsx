import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ListOFCustomer from './Component/Customer/ListOFCustomer';
import Dashboard from './Component/Dashboard';
import LoginComponent from './Component/Login/LoginComponent';
import Main from './Component/Main';
import Browse from './Component/PLO/Browse';
import DetailPLO from './Component/PLO/ParkinglotOwner/DetailPLO';
import ListOfPLO from './Component/PLO/ParkinglotOwner/ListOfPLO';
import Withdrawal from './Component/PLO/Withdrawal';
import ProtectRouter from './ultis/ProtectRouter';
import DetailBrowse from './Component/PLO/Browse/DetailBrowse';
import './firebase/messaging_init_in_sw';
function App() {
  const user = useSelector((state) => state.auth)
  
  return (
    <Routes>
      <Route path="/login" element={!user.login.accessToken ? <LoginComponent /> : <Navigate to={`/`} replace={true} />} />
      <Route element={<ProtectRouter />}>
        <Route path='/' element={<Main/>} >
          <Route index element={<Dashboard />} />
          <Route path="/PLO" element={<ListOfPLO />} exact/> 
          <Route path="/PLO/:id" element={<DetailPLO />}/>
          <Route path="/Browse" element={<Browse />} exact/>
          <Route path="/Browse/:id" element={<DetailBrowse />} />
          <Route path="/Withdrawal" element={<Withdrawal />} />
          <Route path="/Customer" element={<ListOFCustomer />} />
          <Route path="*" element={<Navigate to={'/'} replace={true} />} />
        </Route>
      </Route>
    </Routes>
  )
}


export default App;
