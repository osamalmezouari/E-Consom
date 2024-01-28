import {TbShieldLock} from "react-icons/tb";
import {FaBars, FaCloudDownloadAlt, FaTable} from "react-icons/fa";
import './dashboard.css'
import {LuCalendar, LuUserSquare} from "react-icons/lu";
import {FaMountainCity} from "react-icons/fa6";
import {RiLuggageDepositFill} from "react-icons/ri";
import {BsBuildingGear, BsDatabaseFillGear} from "react-icons/bs";
import {BiLogoProductHunt} from "react-icons/bi";
import {HiOutlineChartSquareBar} from "react-icons/hi";
import {useState} from "react";
import {Outlet} from "react-router";
import {useNavigate} from "react-router-dom";
import Notification from "../../../components/notification.tsx";
import {CiLogout} from "react-icons/ci";

const Dashboard = () => {
    const [sidebar, setsidebar] = useState(false)
    const navigate = useNavigate()
    return <>
        <div className={'fixed'}>
            <div
                className={'relative bg-blackwhite w-screen p-8 h-16 flex justify-between items-center overflow-y-hidden'}>
                <div className={'text-3xl text-white cursor-pointer'}>
                    <div className={'flex items-center gap-3'}>
                        <TbShieldLock/>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
            <div className={'fixed w-screen p-3 bg-white flex items-center gap-10 text-gray shadow-xl'}>
                <div className={'cursor-pointer '} onClick={() => setsidebar(!sidebar)}>
                    <FaBars/>
                </div>
                <div className={'tracking-widest'}>
                    {window.location.pathname.replace(/%20/g, ' ')}
                </div>
            </div>
        </div>
        <Notification/>
        <div
            className={'sidebar h-full fixed top-28 px-2 py-2 pt-5 left-0 w-48 -z-10 bg-neutral-50 transition-all duration-500 '}
            style={sidebar ? {left: "0px"} : {left: "-250px"}}
        >
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 text-blackwhite items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite  hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard')}
            >
                <div className={'text-2xl'}>
                    <LuUserSquare/>
                </div>
                <p>utilisateur</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard/annee')}
            >
                <div className={'text-2xl'}>
                    <LuCalendar/>
                </div>
                <p>Annee</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard/departement')}
            >
                <div className={'text-2xl'}>
                    <RiLuggageDepositFill/>
                </div>
                <p>departement</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard/region')}
            >
                <div className={'text-2xl'}>
                    <FaMountainCity/>
                </div>
                <p>region</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard/donnes de consommation')}
            >
                <div className={'text-2xl w-2/12'}>
                    <BsDatabaseFillGear/>
                </div>
                <p>donnees de consommation</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard/operateur')}
            >
                <div className={'text-2xl'}>
                    <BsBuildingGear/>
                </div>
                <p>operateur</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard/produit')}
            >
                <div className={'text-2xl'}>
                    <BiLogoProductHunt/>
                </div>
                <p>produit</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500  '}
                onClick={() => navigate('/dashboard/AdminTable')}
            >
                <div className={'text-2xl'}>
                    <FaTable/>
                </div>
                <p>tables</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500  '}
                onClick={() => navigate('/dashboard/AdminChart')}
            >
                <div className={'text-2xl'}>
                    <HiOutlineChartSquareBar/>
                </div>
                <p>charts</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => navigate('/dashboard/Excel')}
            >
                <div className={'text-2xl'}>
                    <FaCloudDownloadAlt/>
                </div>
                <p>excel</p>
            </div>
            <div
                className={'flex gap-3 mb-5 px-5 py-5 pt-3 pb-3 items-center bg-neutral-300 rounded  hover:bg-white border-2 border-transparent hover:text-bluewhite hover:border-bluewhite cursor-pointer capitalize transition-all duration-500 '}
                onClick={() => {
                    navigate('/')
                    localStorage.clear()
                    window.location.reload();
                }}
            >
                <div className={'text-2xl'}>
                    <CiLogout/>
                </div>
                <p>déconnexion</p>
            </div>
        </div>
        <div className={'content absolute w-full p-16 -z-20'}
             style={{top: '112px'}}
        >
            <Outlet/>
        </div>
    </>
}
export default Dashboard