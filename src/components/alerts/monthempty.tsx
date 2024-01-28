import React, {useContext} from "react";
import {FaXmark} from "react-icons/fa6";
import {ExistAlert} from "../../pages/user/form/form.tsx";


const Monthempty = () => {
    const {monthvide, setMonthvide, allMonths} = useContext(ExistAlert)
    return <>
        <div
            className={' moddle px-2 border-red-400 text-black font-bold normal-case tracking-widest navbar text-center bg-secend border-2 grid-rows-3 rounded absolute left-2.5 grid transition-all duration-500 hover:shadow-xl hover:cursor-pointer hover:shadow-red-100'}
            style={monthvide.length > 0 ? {top: '10%'} : {top: '-10%'}}
        >
            <p className={'icon-x hover:bg-red-400 transition-all duration-600 ease-in absolute right-1 top-1 border-red-500 bg-red-500 p-1 text-white cursor-pointer'}
               onClick={() => setMonthvide([])}
            >
                <FaXmark/>
            </p>
            <p className={'text-center text-blue-500 row-start-2'}>
                {monthvide.length === 1 ? 'enter le mois precedant' : 'enter les mois precedants'}
                {monthvide.length > 0 && monthvide.map(item => (
                    <p className={'text-black'}></p>
                ))}
            </p>
        </div>
    </>
}
export default Monthempty