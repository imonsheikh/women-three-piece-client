import React from 'react';

const Poster = () => {
    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-2'>
            <div className='border-r-4 border-blue-800 flex justify-center items-center gap-4 bg-blue-100 px-[12px] py-10'>
                <div className=''>
                 <img className='min-w-16 h-16' src="https://img.icons8.com/?size=100&id=23095&format=png&color=000000" alt="" /> 
                </div>
                <div className='text-start'>
                 <h1 className='text-xl'> ক্যাশ অন ডেলিভারি</h1>
                 <p className='text-sm'>বাংলাদেশজুড়ে নিশ্চিন্তে পেমেন্ট, আগে পণ্য হাতে, তারপর মূল্য পরিশোধ!</p>
                </div>
            </div>
            <div className='border-r-4 border-green-800 flex justify-center items-center gap-4 bg-green-100 px-[12px] '>
                <div className=''>
                 <img className='min-w-16 h-16' src="https://img.icons8.com/?size=100&id=KUOOh6X0AfY4&format=png&color=000000" alt="" /> 
                </div>
                <div className='text-start'>
                 <h1 className='text-xl'>ইজি রিটার্ন</h1>
                 <p className='text-sm'>পণ্য নিয়ে ঝামেলা? কোনো চিন্তা নেই! সহজ ও দ্রুত রিটার্ন গ্যারান্টি।</p>
                </div>
            </div>
            <div className='border-r-4 border-red-800 flex justify-center items-center gap-4 bg-red-100 px-[12px] '>
                <div className=''>
                 <img className='min-w-16 h-16' src="https://img.icons8.com/?size=100&id=42906&format=png&color=000000" alt="" /> 
                </div>
                <div className='text-start'>
                 <h1 className='text-xl'>সুপার ফাস্ট ডেলিভারি</h1>
                 <p className='text-sm'>ঢাকায় মাত্র ২৪ ঘণ্টায়, দেশের যেকোনো প্রান্তে মাত্র ৪৮ ঘণ্টায় পণ্য পৌঁছে যাবে!</p>
                </div>
            </div>
            <div className='border-r-4 border-yellow-800 flex justify-center items-center gap-4 bg-yellow-100 px-[12px] '>
                <div className=''>
                 <img className='min-w-16 h-16' src="https://img.icons8.com/?size=100&id=42934&format=png&color=000000" alt="" /> 
                </div>
                <div className='text-start'>
                 <h1 className='text-xl'>২৪/৭ কাস্টমার কেয়ার</h1>
                 <p className='text-sm'>দিন-রাত যেকোনো সময়, যেকোনো সমস্যায় আমরা আছি আপনার পাশে!!</p>
                </div>
            </div>
          
        </div>
    );
};

export default Poster;