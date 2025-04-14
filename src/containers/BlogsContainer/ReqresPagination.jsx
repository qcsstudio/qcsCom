'use client'
import React, { useEffect, useState } from 'react';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';

const ReqresPagination = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMiddle, setShowMiddle] = useState(false);    

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://reqres.in/api/users?page=${page}&per_page=1`);
        const data = await res.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchUsers();
  }, [page]);

  const getPagination = () => {
    const pages = [];

    if (totalPages <= 6 || showMiddle) {

      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }


    pages.push(1, 2);
    pages.push('ellipsis');
    pages.push(totalPages - 1, totalPages);

    return pages;
  };

  const handleEllipsisClick = () => {
    setShowMiddle(true);
  };

  return (
    <div className="p-4 w-[85%] mx-auto ">
      <div className=' w-[138px] mx-auto my-6 '>
        <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
          <img src='/images/Images/servicesLogo.png' />
          <span className=' font-semibold text-sm mt-1 '>Blogs</span>
        </h4>
      </div>
      <h1 className="text-4xl font-semibold text-center mb-4">Beyond the Canvas Stories from QuantumCrafter Studio</h1>
      <div className='flex gap-5'>
        <div className='w-[75%] h-[500px] p-2 rounded border border-gray-200 grid grid-cols-1 lg:grid-cols-2  gap-6 auto-rows-fr'>
          {users.map((user, index) => {
            return (
              <div key={index} className='bg-[#F5F7F9] h-[350px] p-2  rounded'>
                <div className='w-full h-60 rounded-lg bg-[#D9D9D9]'>
                </div>
                <div>
                  <h1 className='text-xl font-medium'>{user.head}</h1>
                  <p className='text-base text-[#202124]'>{user.para}</p>
                </div>
                <li key={user.id} className="flex items-center gap-2 mb-2">
                  <img src={user.avatar} alt={user.first_name} className="w-10 h-10 rounded-full" />
                  <span>{user.first_name} {user.last_name}</span>
                </li>
                <button className='bg-[#000000] text-white text-base font-medium  py-2 w-full rounded'>Read More</button>
              </div>
            );
          })}

        </div>
        <div className='w-[25%] h-40 bg-[#F5F7F9]'></div>
      </div>



      {/* buttons */}

      <div className="flex  gap-2 mt-6 flex-wrap justify-center">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="p-2 border rounded disabled:bg-[#C4CDD5]"
        >
          <FaLessThan />
        </button>

        {getPagination().map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <button
                key={index}
                onClick={handleEllipsisClick}
                className="p-2 border rounded cursor-pointer"
              >
                ...
              </button>
            );
          }

          return (
            <button
              key={index}
              onClick={() => setPage(item)}
              className={`p-1 px-3 border rounded ${page === item ? 'border-blue-800 border-2 text-blue-800 font-bold' : ''
                }`}
            >
              {item}
            </button>
          );
        })}

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="p-2 border rounded disabled:opacity-50"
        >
          <FaGreaterThan />
        </button>
      </div>
    </div>
  );
};

export default ReqresPagination;

