import React from 'react';

const Title = ({children}) => {
    return (
        <div className='text-2xl font-semibold'>
            {children}
        </div>
    );
};

export default Title;