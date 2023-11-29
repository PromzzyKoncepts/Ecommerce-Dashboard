import React, { useState } from 'react';
import AphiaLogo from '../assets/aphiaLogo.png';
import { LayoutDashboard, ShoppingCart, BadgeDollarSign, Settings2, HelpCircleIcon, LogOut } from 'lucide-react';
import ArrowRightLeft from '../assets/icons/arrow-right-left.svg';
import { motion } from 'framer-motion';


const navLinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Products",
        icon: ShoppingCart,
    },
    {
        name: "Orders",
        icon: BadgeDollarSign,
    },
    {
        name: "Settings",
        icon: Settings2,
    },
    {
        name: "Help Center",
        icon: HelpCircleIcon,
    },
    {
        name: "Logout",
        icon: LogOut,
    },
];

const variants = {
    expanded: { width: "15%" },
    nonExpanded: { width: "8%" }
}

const NavigationBar = () => {
    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.div
            animate={isExpanded ? 'expanded' : 'nonExpanded'}
            variants={variants}
            className='px-5 py-12 flex flex-col border border-r-1 w-1/5 h-screen relative'>
            <div className='flex space-x-2 items-center'>
                <img className='w-32' src={AphiaLogo} alt='AphiaLogo' />
            </div>

            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className='w-5 h-5 bg-amber-500 rounded-full absolute -right-[10.5px] top-12'>
                <img className='w-[12px] mt-1 ml-1' src={ArrowRightLeft} alt='arrlr' />
            </div>

            <div className='mt-10 flex flex-col space-y-8 text-black'>
                {navLinks.map((item, index) => (
                    <div
                        key={index}
                        className={`flex space-x-3 p-2 rounded ${activeNavIndex === index ? "bg-amber-500 text-white font-semibold" : "hover:text-amber-500"}`}
                    >
                        <item.icon className={isExpanded ? "" : "ml-4"} />
                        <span className={isExpanded ? "block" : "hidden"}>{item?.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default NavigationBar;
