import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientSlider from '../ClientSlider/ClientSlider';
import Benefits from '../Benefits/benefits';
import BeMerChant from '../BeMerChant/BeMerChant';
import BookingCard from '../BookingCard/BookingCard';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <BookingCard></BookingCard>
            <Services></Services>
            <ClientSlider></ClientSlider>
            <Benefits></Benefits>
            <BeMerChant></BeMerChant>
        </div>
    );
};

export default Home;