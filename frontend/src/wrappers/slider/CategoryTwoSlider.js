import PropTypes, { any } from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import CategoryTwoSingle from "../../components/category/CategoryTwoSingle.js";
import SectionTitleFour from "../../components/section-title/SectionTitleFour.js";
import { propTypes } from "react-bootstrap/esm/Image.js";

const CategoryTwoSlider = ({ spaceTopClass, spaceBottomClass, categoryData }) => {
  // swiper slider settings
  const settings = {
    loop: false,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    breakpoints: {
      992: {
        slidesPerView: 4
      },
      576: {
        slidesPerView: 3
      },
      320: {
        slidesPerView: 1
      }
    }
  };
  return (
    <div
      className={`collections-area my-4 ${spaceTopClass ? spaceTopClass : ""}  ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        {/* section title */}
        <SectionTitleFour titleText="Hot Categories" spaceBottomClass="mb-40" />
        <div className="collection-wrap">
          <div className="collection-active">
            <Swiper {...settings}>
              {categoryData &&
                categoryData.map((single, key) => {
                  return (
                    <CategoryTwoSingle
                      data={single}
                      key={key}
                      sliderClass="swiper-slide"
                    />
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryTwoSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  categoryData: any
};

export default CategoryTwoSlider;
