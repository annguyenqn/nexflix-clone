import React, { useCallback, useEffect, useState } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import MobileMenu from './MobileMenu';
import NavbarItem from "./NavbarItem"
import AccountMenu from './AccountMenu';
//Định vị vị trí của thanh navber
const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setshowMobileMenu] = useState(false);
    const [showAccountMenu, setAccountMenu] = useState(false);
    const [showBackGround, setShowBackGround] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackGround(true);
            } else {
                setShowBackGround(false);
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const toogleMobileMenu = useCallback(() => {
        setshowMobileMenu((current) => !current)
    }, [])
    const toogleAccountMenu = useCallback(() => {
        setAccountMenu((current) => !current)
    }, [])
    return (
        <nav className="w-full fixed z-40">
            <div className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
          ${showBackGround ? ' bg-zinc-900 bg-opacity-90' : ' '}
            
    `}>
                <img className="h-4 lg:h-7" src="/images/logo.png"></img>
                <div className="
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
            ">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by languages" />
                </div>
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch />
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell />
                    </div>
                    <div className='flex flex-row items-center gap-2 cursor-pointer relative '>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                            <img src="/images/default-blue.png"></img>
                        </div>
                        <BsChevronDown onClick={toogleAccountMenu} className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
            <div onClick={toogleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                <MobileMenu visible={showMobileMenu} />
            </div>
        </nav>
    )
}
export default Navbar