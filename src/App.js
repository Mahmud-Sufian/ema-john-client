import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import Shop from './Components/Header/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState({})
  return (
     <userContext.Provider value={[loggedIn, setLoggedIn]}>
       
       <Router>
       <Header></Header>
         <Switch>
           <Route path="/shop">
           <Shop></Shop>
           </Route>
           <Route path="/review">
             <Review></Review>
           </Route>
           <PrivateRoute path="/shipment">
             <Shipment></Shipment>
           </PrivateRoute>
           <Route path="/login">
             <Login></Login>
           </Route>
           <PrivateRoute path="/inventory">
              <Inventory></Inventory>
           </PrivateRoute>
           <Route exact path="/">
              <Shop></Shop>
           </Route>
           <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
           </Route>
           <Route path="*">
              <NotFound></NotFound>
           </Route>
         </Switch>
       </Router>
       
       
     </userContext.Provider>
  );
}

export default App;
