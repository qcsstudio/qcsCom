import React from 'react';

const ListComp = ({listData}) => {
 
  return (
    <div className="w-full lg:w-[40%] hidden lg:block">
      <div className="grid grid-cols-1 gap-3">
        {listData.map((service, index) => (
          <div key={index} className="py-2">
            <h3 className="text-lg md:text-xl font-medium text-gray-900">{service}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComp;
