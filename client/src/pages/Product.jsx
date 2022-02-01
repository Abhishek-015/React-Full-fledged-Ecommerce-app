import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getProduct, productStar } from "../utils/product";
import SingleProduct from "../component/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star)
    }
  });

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.log(newRating, name);
    productStar(name, newRating, user.token)
      .then((res) => {
        console.log("rating clicked", res.data);
        loadSingleProduct();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        </div>
        <div className="row">
          <div className="col text-center py-5">
            <hr />
            <h4>Related Products</h4>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
