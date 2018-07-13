import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

//Components
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import {Link} from "react-router-dom";

import routes from './routes';

class App extends Component {
  constructor() {
    super();

    this.state = {
      inventory: [],
      selectedProduct : {}
    };

    this.getProduct = this.getProduct.bind(this);
    this.setSelectedProduct = this.setSelectedProduct.bind(this);
  }

  componentDidMount() {
    axios.get("/api/inventory").then(res => {
      this.setState({
        inventory: res.data
      });
    });
  }

  getProduct() {
    axios.get("/api/inventory").then(res => {
      this.setState({
        inventory: res.data
      });
    });
  }
 
  setSelectedProduct(product) {

    this.setState({
      selectedProduct : product
    });
  }
  

  render() {
    console.log(this.state.selectedProduct);
    
    return (
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/form">Form</Link>

        {routes}
        <Dashboard
          inventory={this.state.inventory}
          getRequestFn={this.getProduct}
          setSelectedFn={this.setSelectedProduct}
        />
        <Form 
        getRequestFn={this.getProduct} 
        selectedProduct={this.state.selectedProduct}
        />
        <Header />
      </div>
    );
  }
}

export default App;
