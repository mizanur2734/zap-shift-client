import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientSlider from '../ClientSlider/ClientSlider';
import Benefits from '../Benefits/benefits';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientSlider></ClientSlider>
            <Benefits></Benefits>
        </div>
    );
};

export default Home;