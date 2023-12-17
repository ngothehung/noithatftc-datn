// @ts-nocheck
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import BannerNineteen from "../../wrappers/banner/BannerNineteen";
import TabProductFourteen from "../../wrappers/product/TabProductFourteen";
import BlogFeaturedThree from "../../wrappers/blog-featured/BlogFeaturedThree";
import BannerTwenty from "../../wrappers/banner/BannerTwenty";
import HeroSliderTwentyTwo from "../../wrappers/hero-slider/HeroSliderTwentyTwo";
import { getSlidesByFilters } from "../../services/shop/slider-service";
import { getCategories, getProductsByFilter } from "../../services";
import CategoryTwoSlider from "../../wrappers/slider/CategoryTwoSlider";

const HomeCakeShop = () => {

	const [slides, setSlides] = useState(null);
	const [products, setProducts] = useState(null);
	const [categories, setCategories] = useState(null)
	const [params, setParams] = useState({
		is_hot: null,
		is_sale: null,
		page: 1,
		page_size: 8,
		status: 1
	});

	useState(() => {
		getSlidesByFilters({page: 1, page_size:20, status: 1}, setSlides);
		getCategories( {page: 1, page_size: 5, status: 1}, setCategories );
	}, []);

	useEffect(() => {
		getProductsByFilter(params, setProducts);
	}, [params])

  return (
    <Fragment>
      <MetaTags>
        <title>Home</title>
        <meta
          name="description"
          content="Cửa hàng Nội thất home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* hero slider */}
		{slides && <HeroSliderTwentyTwo slides={slides}/>}

        {/* banner */}
        {/* <BannerNineteen spaceTopClass="pt-100" spaceBottomClass="pb-80" /> */}
        {/* feature icon */}
		
        <FeatureIconFour
          bgImg="/assets/img/bg/shape.png"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50"
          spaceBottomClass="pb-40"
        />
		{categories?.length > 0 && <CategoryTwoSlider categoryData={categories}/>} 
        {/* tab product */}
        <TabProductFourteen
          category="cakes"
		  products={products}
		  setParams={setParams}
		  params={params}
          spaceBottomClass="pb-100"
          spaceTopClass="pt-50"
        />
        {/* banner */}
        {/* <BannerTwenty categories={categories} /> */}
        {/* blog featured */}
        {/* <BlogFeaturedThree spaceTopClass="pt-70" spaceBottomClass="pb-70" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeCakeShop;
