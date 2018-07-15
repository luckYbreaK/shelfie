import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header/Header';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            price: 0,
            imgurl: ""
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleImageURLChange = this.handleImageURLChange.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    componentDidMount() {
        if(this.props.location.pathname !== "/add") {
            this.getProduct(); 
        }
    }

    handleNameChange(val) {
        this.setState({
            name: val
        });
    }

    handlePriceChange(val) {
        this.setState({
            price: parseInt(val, 10)
        });
    }

    handleImageURLChange(val) {
        this.setState({
            imgurl: val
        });
    }

    handleClick() {
        if (this.props.location.pathname === "/add") {
            const { name, price, imgurl } = this.state
            axios.post("/api/product", { name: name, price: price, img: imgurl }).then(() => {
                this.getProduct();
                this.clearInputs();
            });
        } else {
            const { name, price, imgurl } = this.state
            axios.put(`/api/product/${this.props.match.params.id}?name=${name}&price=${price}&img=${imgurl}`).then(() => {
                this.getProduct();
                this.clearInputs();
            });
        }
    }

    clearInputs() {
        this.setState({
            name: "",
            price: 0,
            imgurl: ""
        });
    }

    getProduct() {
        axios.get(`/api/product/${this.props.match.params.id}`).then(res => { 
            this.setState({
                name: res.data[0].name ? res.data[0].name : "",
                price: res.data[0].price ? res.data[0].price : 0,
                imgurl: res.data[0].img ? res.data[0].img : ""
            });
        });
    }


    componentDidUpdate(prevProp) {
        if (this.props.location.pathname !== prevProp.location.pathname) {
            this.setState({
                name: "",
                price: 0,
                imgurl: ""
            });
        }
    }

    render() {
        // console.log(this.props);
        const toggleButton = this.props.location.pathname === "/add" ? "Add to Inventory" : "Save Changes";
        return (
            <div>
                <Header />
                <h1>Form</h1>
                Image URL:
                <input
                    type="text"
                    value={this.state.imgurl}
                    onChange={(e) => this.handleImageURLChange(e.target.value)}
                />
                <br />
                Product Name:
                <input
                    type="text"
                    value={this.state.name}
                    onChange={(e) => this.handleNameChange(e.target.value)}
                />
                <br />
                Price:
                <input
                    type="text"
                    value={this.state.price}
                    onChange={(e) => this.handlePriceChange(e.target.value)}
                />
                <br />
                <Link to="/add"><button onClick={this.clearInputs}>Cancel</button></Link>
                <Link to="/"><button onClick={this.handleClick}>{toggleButton}</button></Link>
            </div>
        );
    }
}

export default Form;