import React from 'react';
import { Carousel } from 'react-responsive-carousel'; 
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <div>

            <Carousel interval={1500} infiniteLoop={true} showArrows={true}  autoPlay={true} >
                <div className='h-[600px]'>
                 <img
                 className='h-full' 
                 src='https://img.freepik.com/free-vector/flat-design-minimal-boutique-sale-background_23-2149337460.jpg?t=st=1741709539~exp=1741713139~hmac=d2b969d77854f3ee4b61795321ca2ecc2f4301a8b036f37dd3fee97c1ecbb1bc&w=996' />
                </div>
                <div>
                 <img 
                 src='https://img.freepik.com/free-psd/fashion-sales-landing-page-template_23-2148903811.jpg?ga=GA1.1.730881773.1732964507&semt=ais_hybrid' />
                </div>
                <div>
                 <img 
                 src='https://img.freepik.com/free-vector/fashion-sale-landing-page_23-2148580993.jpg?ga=GA1.1.730881773.1732964507&semt=ais_hybrid' />
                </div>
                <div>
                 <img 
                 src='https://img.freepik.com/free-psd/shopping-sale-banner-with-photo_23-2148750918.jpg?t=st=1741710092~exp=1741713692~hmac=4b4d277d868b09f8916af85075df9246e1f0a97f1636e004d27629d407e3ca23&w=996' />
                </div>
                <div>
                 <img 
                 src='https://static.vecteezy.com/system/resources/previews/006/890/137/non_2x/fashion-illustration-fashionable-women-is-wearing-brown-and-holding-shopping-bags-free-vector.jpg' />
                </div>
          
     
            </Carousel>
        </div>
    );
};

export default Banner;