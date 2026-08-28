import React from 'react';
import HeroBannerSection from '../HeroBannerSection/HeroBannerSection';
import RecentProductSection from '../RecentProductSection/RecentProductSection';

const latestProducts=fetch('http://localhost:4000/latest-products').then(res=>res.json());
const HomeSection = () => {
    //console.log(latestProducts);

    return (
        <div>
            <HeroBannerSection></HeroBannerSection>
            <RecentProductSection latestProducts={latestProducts}></RecentProductSection>
        </div>
    );
};

export default HomeSection;