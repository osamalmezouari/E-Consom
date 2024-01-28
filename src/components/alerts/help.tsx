import {Alertcontext} from "../navbar.tsx";
import {useContext} from "react";
import {FaXmark} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";
import {FiPhoneCall} from "react-icons/fi";

const Supportalert = () => {
    const {toogleAlert, settoogleAlert} = useContext(Alertcontext)
    return <>
        <div
            className={' moddle text-black font-bold normal-case tracking-widest navbar py-8 px-20 text-center w-1/4 h-1/6 bg-secend border-2 rounded-xl absolute left-2.5 grid transition-all duration-500 hover:shadow-xl hover:cursor-pointer hover:shadow-blue-100'}
            style={toogleAlert ? {top: '10%'} : {top: '-10%'}}
        >
            <p className={'icon-x hover:bg-blue-400 transition-all duration-600 ease-in absolute right-1 top-1 border-primary bg-blue-500 p-1 text-white cursor-pointer'}
               onClick={() => settoogleAlert(!toogleAlert)}
            >
                <FaXmark/>
            </p>
            <p className={'flex items-center gap-5 text-blue-500'}><MdEmail/> <p
                className={'text-black'}>support@gmail.com</p></p>
            <p className={'flex items-center gap-5 text-blue-500'}><FiPhoneCall/> <p
                className={'text-black'}> +212 66 66 66 66</p></p>
        </div>
    </>
}
export default Supportalert