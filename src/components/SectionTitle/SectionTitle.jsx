import React from 'react';

const SectionTitle = ({heading}) => {
    return (
        <div>
            <h1 className="text-center mt-10 mb-6 font-bold text-2xl text-stone-900 border-b-primary-c">{heading}</h1>
        </div>
    );
};

export default SectionTitle;