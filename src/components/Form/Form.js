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
            imgurl: "",
            selectedProduct: null
        });
    }

    handleAddClick() {
        if (this.state.selectedProduct === null) {
            const { name, price, imgurl } = this.state
            axios.post("/api/product", { name: name, price: price, img: imgurl }).then(() => {
                this.props.getRequestFn();
                this.clearInputs();
            });
        } else {
            axios.put(`/api/product/${this.state.selectedProduct.id}?name=${this.state.selectedProduct.name}&price=${this.state.selectedProduct.price}&img=${this.state.selectedProduct.img}`).then(() => {
                this.props.getRequestFn();
                this.clearInputs();
                
            });
        }

    }

    handleSaveClick() {
        
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


        const toggleButton = this.state.selectedProduct === null ? "Add to Inventory" : "Save Changes";
        console.log(this.state.selectedProduct);

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
                        // this.state.selectedProduct === null ?
                        this.handleAddClick
                        //  : this.handleSaveClick
                    }
                >{toggleButton}</button>
            </div>
        );
    }
}

export default Form;