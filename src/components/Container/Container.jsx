import React from 'react';

const Container = ({children}) => {
    return (
        <div className='lg:w-9/12 w-full min-h-screen '>
            {children}
        </div>
    );
};

export default Container;