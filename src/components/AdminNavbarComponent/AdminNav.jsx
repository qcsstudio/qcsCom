import React from 'react'
import navImage from '../../../public/images/Images/Nave.png'
import logo from '../../../public/images/Images/logoNav.png'
import notification from '../../../public/images/Images/notification.png'
import profile from '../../../public/images/Images/profilePic.png'
import search from '../../../public/images/Images/search-normal.png'
import downArrow from '../../../public/images/Images/arrow-down.png'
import Image from 'next/image'
import '../../app/globals.css'

const AdminNav = () => {
    return (
        <div className='flex justify-between items-center align-center px-[40px] py-[20px]'>
            <div className='flex justify-center align-center items-center gap-[20px] '>
                <Image className='h-[17px] w-[24px]' src={navImage} alt='navbar' />
                <Image className='h-[40px] w-[200px]' src={logo} alt='navbar' />
            </div>
            <div className='flex'>
                <input className=' h-[36px] w-[560px] rounded-[8px] bg-[#F5F6F7] pl-[40%] search-field' type="text" placeholder= "Search" />
            </div>
            <div className='flex justify-center align-center items-center gap-[20px]'>
                <Image className='h-[20px] w-[20px]' src={notification} alt='navbar' />
                <Image className='h-[40px] w-[40px]' src={profile} alt='navbar' />
                <div className='flex flex-col'>
                    <p>Natashia Bunny</p>
                    <p>natasiabunny@gmail.com</p>
                </div>
                <div>
                    <Image className='h-[20px] w-[20px]' src={downArrow} alt='navbar' />
                </div>
            </div>
        </div>
    )
}

export default AdminNav