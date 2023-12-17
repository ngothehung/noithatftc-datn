import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { buildImage } from "../../services";

const CategoryTwoSingle = ({ data, sliderClass }) => {
  return (
    <div className={`collection-product ${sliderClass ? sliderClass : ""}`}>
      <div className="collection-img">
        <Link to={`/shop?category_id=${data.id}`}>
          <img 
		  className="image-cover" 
		  src={buildImage(data.avatar)} 
		  alt={data.name} />
        </Link>
      </div>
      <div className="collection-content text-center">
        <span>{data.subtitle}</span>
        <h4>
          <Link to={process.env.PUBLIC_URL + data.link}>{data.name}</Link>
        </h4>
      </div>
    </div>
  );
};

CategoryTwoSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default CategoryTwoSingle;
