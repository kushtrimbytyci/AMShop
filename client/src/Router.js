import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from './screens/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PrivRoute from './components/PrivRoute';
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import AdminUserListScreen from './screens/AdminUserListScreen';
import AdminProductsListScreen from './screens/AdminProductsListScreen';
import SearchScreen from './screens/SearchScreen';
import AdminViewAllOrders from './screens/AdminViewAllOrders';
import {connect} from 'react-redux';


const Router = ({user}) => {
  return (
    <>
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <PrivRoute exact path='/shipping' component={ShippingScreen}/>
            <PrivRoute exact path='/payment' component={PaymentMethodScreen}/>
            <PrivRoute exact path='/placeorder' component={PlaceOrderScreen}/>
            <PrivRoute exact path='/profile' component={ProfileScreen}/>
            {user.user?.role==='admin'&&<PrivRoute exact path='/admin/userlist' component={AdminUserListScreen}/>}
            {user.user?.role==='admin'&&<PrivRoute exact path='/admin/productslist' component={AdminProductsListScreen}/>}
            {user.user?.role==='admin'&&<PrivRoute exact path='/admin/vieworders' component={AdminViewAllOrders}/>}
            <PrivRoute exact path='/orders/:id' component={OrderDetailsScreen}/>
            <Route exact path='/search/:keyword' component={SearchScreen}/>
            <Route exact path='/product/:id' component={ProductScreen}/>
            <Route exact path='/cart/:id?' component={CartScreen}/>
            <Route exact path='/login' component={LoginScreen}/>
            <Route exact path='/register' component={RegisterScreen}/>
            <Route exact path="/" component={HomeScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
    </>
  );
};

const mapStateToProps = state =>{
  return {
    user:state.user
  }
}

export default connect(mapStateToProps)(Router);
