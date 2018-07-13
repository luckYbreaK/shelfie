import React from 'react';

function Product(props) {
    const {id, name, price, image} = props
    return (
        <div style={{ display: "flex" }}>
            {/* display product info, comes from App.js */}
            <img
                src={image === "" ?
                    "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg" :
                    image
                }
                style={{ height: "150px", width: "150px" }}
            />
            <p>{name}</p>
            <p>${price}</p>
            <button onClick={() => props.removeRequestFn(id)}>Delete</button>
            <button onClick={ () => props.setSelectedFn({id: id, name: name, price: price, img: image})}>Edit</button>

        </div>
    );
}

export default Product;