import React, { Component } from 'react';
import axios from 'axios';

//Components
import Product from '../Product/Product';
import Header from '../Header/Header';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            inventory: [],
            // selectedProduct: {}
        };

        this.getProucts = this.getProucts.bind(this);
        // this.setSelectedProduct = this.setSelectedProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    componentDidMount() {
        this.getProucts();
    }

    getProucts() {
        axios.get("/api/inventory").then(res => {
            this.setState({
                inventory: res.data
            });
        });
    }

    // setSelectedProduct(product) {
    //     this.setState({
    //         selectedProduct: product
    //     });
    // }

    removeProduct(id) {
        axios.delete(`/api/product/${id}`).then(res => {
            this.getProucts();
        });
    }

    render() {
        const mappedProducts = this.state.inventory.map((product, i) => {
            return (
                <Product
                    key={i}
                    id={product.id}
                    image={product.img}
                    name={product.name}
                    price={product.price}
                    removeRequestFn={this.removeProduct}
                    // setSelectedFn={this.setSelectedProduct}
                />);
        })
        return (
            <div>
                <Header />
                <div>
                    {mappedProducts}
                </div>
            </div>

        );
    }
}

export default Dashboard;