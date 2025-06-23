import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientSlider from '../ClientSlider/ClientSlider';
import Benefits from '../Benefits/benefits';
import BeMerChant from '../BeMerChant/BeMerChant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientSlider></ClientSlider>
            <Benefits></Benefits>
            <BeMerChant></BeMerChant>
        </div>
    );
};

export default Home;