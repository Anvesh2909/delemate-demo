'use client'
import React from "react";


const handleClick = () => {
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${+917569279104}?text=${'DELETE'}`;
    // Open WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');
  };

const page  = ()=>
    
{
    return(
        <button onClick={handleClick}   className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ">
         Request Account Deletion
      </button>
    )
}

export default page;