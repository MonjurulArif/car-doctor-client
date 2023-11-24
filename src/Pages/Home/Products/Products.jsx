// import React from 'react';

import ProductCard from "./ProductCard";

const Products = () => {
    return (
        <div>
            <div className=" text-center mb-16">
                <h3 className="text-xl font-bold text-[#FF3811] mb-2">Popular Products</h3>
                <h1 className="text-4xl font-bold mb-4">Browse Our Products</h1>
                <p>
                    The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable.{" "}
                </p>
            </div>
            <ProductCard></ProductCard>
        </div>
    );
};

export default Products;
