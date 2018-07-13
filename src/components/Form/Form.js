import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            price: 0,
            imgurl: "",
            selectedProduct: null
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleImageURLChange = this.handleImageURLChange.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
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

    clearInputs() {
        this.setState({
            name: "",
            price: 0,
            imgurl: ""
        });
    }

    handleAddClick() {
        const { name, price, imgurl } = this.state
        axios.post("/api/product", { name: name, price: price, img: imgurl }).then(() => {
            this.props.getRequestFn();
            this.clearInputs();
        });
    }

    handleSaveClick() {
        const { id, name, price, img } = this.state.selectedProduct
        axios.put(`/api/product/${id}?name=${name}?price=${price}?img=${img}`).then(() => {
            this.props.getRequestFn();
            this.clearInputs();
        });
    }

    componentDidUpdate(prevProp) {
        if (this.props.selectedProduct !== prevProp.selectedProduct) {
            this.setState({
                selectedProduct: this.props.selectedProduct,
                name: this.props.selectedProduct.name,
                price: this.props.selectedProduct.price,
                imgurl: this.props.selectedProduct.img
            });
        }
    }

    render() {
        console.log(this.state.selectedProduct);

        const toggleButton = this.state.selectedProduct === null ? "Add to Inventory" : "Save Changes";
        return (
            <div>Form
                <br />
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
                <button onClick={this.clearInputs}>Cancel</button>
                <button
                    onClick=
                    {
                        toggleButton === "Add to Inventory" ?
                        this.handleAddClick : this.handleSaveClick
                    }
                >{toggleButton}</button>
            </div>
        );
    }
}

export default Form;