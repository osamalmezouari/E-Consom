import "../index.css"
import {NavLink, useNavigate} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import {createContext, useEffect, useState} from "react";
import {FaChartBar, FaTable} from "react-icons/fa";
import Supportalert from "./alerts/supportalert.tsx";
import {ImNewTab} from "react-icons/im";

interface PropsType {
    logindesplay: boolean;
}

export const Alertcontext = createContext()

const Navbar: React.FC<PropsType> = ({logindesplay}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const [toogleAlert, settoogleAlert] = useState<boolean>(false)

    const handleClick = () => {
        localStorage.clear()
        window.location.reload();
    };
    const HandleTableClick = () => {
        navigate('/Table')
    }
    const HandleChartClick = () => {
        navigate('/Chart')
    }
    const HandlefromClick = () => {
        navigate('/formulaire')
    }
    useEffect(() => {
        const targettimeout = setTimeout(() => {
            settoogleAlert(false)
        }, 5000)
        return () => clearTimeout(targettimeout)
    }, [toogleAlert]);

    return (
        <div className={'flex justify-between m-auto pt-5 mb-5'}
             style={{maxWidth: "1200px"}}
        >
            <div className={'flex gap-1 text-2xl text-primary font-mono capitalize items-center'}>
                <div className="bg-logo bg-contain bg-no-repeat w-10 h-14"></div>
                <p className={'text-center text-blue-600 -mt-4'} style={{fontFamily: "inherit"}}>E-consom</p>
            </div>
            <div className={'flex gap-4 items-center capitalize'}>
                {!token ?
                    <p className={'normal-case px-4 py-1 text-gray-400 hover:text-primary hover:-mt-2.5 transition-all duration-300 ease-linear cursor-pointer'}
                       onClick={() => settoogleAlert(!toogleAlert)}
                    >

                        probleme de conexion ?
                    </p> : ''
                }
                {logindesplay ?
                    <NavLink
                        to={'/'} // Update the correct route for login
                        className={' px-6 py-2 rounded-full capitalize bg-primary text-white hover:-mt-2.5 transition-all duration-300 ease-linear '}
                    >
                        login
                    </NavLink>
                    : ""
                }
                {token ?
                    <div className={'flex justify-between w-full gap-3'}>.
                        <div
                            onClick={HandlefromClick}
                            className={'text-bluewhite text-2xl  cursor-pointer  transition-all duration-300 ease-linear hover:text-primary '}
                        >
                            <ImNewTab/>
                        </div>
                        <div
                            className={'text-bluewhite text-2xl cursor-pointer  transition-all duration-300 ease-linear hover:text-primary '}
                            onClick={HandleTableClick}
                        >
                            <FaTable/>
                        </div>
                        <div
                            className={'text-bluewhite text-2xl cursor-pointer  transition-all duration-300 ease-linear hover:text-primary '}
                            onClick={HandleChartClick}
                        >
                            <FaChartBar/>
                        </div>
                        <div
                            onClick={handleClick}
                            className={'text-bluewhite text-2xl  cursor-pointer  transition-all duration-300 ease-linear hover:text-primary '}
                        >
                            <MdLogout/>
                        </div>
                    </div>

                    : ''
                }
                <Alertcontext.Provider value={{toogleAlert, settoogleAlert}}>
                    <Supportalert/>
                </Alertcontext.Provider>

            </div>
        </div>
    );
};

export default Navbar;
