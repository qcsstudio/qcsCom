import React from 'react';

const clientimage = [
  "/images/Clients/EAA.jpg",
  "/images/Clients/Etisha.png",
  "/images/Clients/PBA.jpg",
  "/images/Clients/Udey.jpg",
  "/images/Clients/accountsly.png"
];

const ClientSlidenew = () => {
  return (
    <div className="flex overflow-x-auto">
      {clientimage.map((image, index) => (
        <div
          key={index}
          className="h-16 md:h-20 w-30 mx-3 my-3 flex items-center justify-center rounded-lg flex-shrink-0"
        >
          <img src={image} alt="clientimage" className="h-full object-contain" />
        </div>
      ))}
    </div>
  );
};

export default ClientSlidenew;
