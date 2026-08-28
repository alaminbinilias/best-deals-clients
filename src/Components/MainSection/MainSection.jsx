import React from 'react';
import NavSection from '../NavSection/NavSection';
import { Outlet } from 'react-router';
import HeroBannerSection from '../HeroBannerSection/HeroBannerSection';
import FooterSection from '../FooterSection/FooterSection';

const MainSection = () => {
    //console.log(import.meta.env.VITE_APIKEY);
    return (
        <div className='min-h-svh flex flex-col'>
            <NavSection></NavSection>
            <div className='h-full flex-1'>
                <Outlet></Outlet>
            </div>
                <FooterSection></FooterSection>
        </div>
    );
};

export default MainSection;