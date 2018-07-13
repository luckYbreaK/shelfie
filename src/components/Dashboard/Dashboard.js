import React, { Component } from 'react';
import axios from 'axios';

//Components
import Product from '../Product/Product';

class Dashboard extends Component {
    constructor() {
        super();

        this.removeProduct = this.removeProduct.bind(this);
    }

    removeProduct(id) {
        axios.delete(`/api/product/${id}`).then( res => {
            this.props.getRequestFn();
        });
    }

    render() {
        const mappedProducts = this.props.inventory.map((product, i) => {
            return (
                <Product
                    key={i}
                    id={product.id}
                    image={product.img}
                    name={product.name}
                    price={product.price}
                    removeRequestFn={this.removeProduct}
                    setSelectedFn={this.props.setSelectedFn}
                />);
        })
        return (
                <div style={{ display: "flex", displayWrap: "wrap"}}>
                Dashboard
                {mappedProducts}
            </div>

        );
    }
}

export default Dashboard;