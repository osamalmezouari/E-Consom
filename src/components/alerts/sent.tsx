import {useContext} from "react";
import {FaXmark} from "react-icons/fa6";
import {ExistAlert} from "../../pages/user/form/form.tsx";


const Datasend = () => {
    const {datasend, setdatasend} = useContext(ExistAlert)
    return <>
        <div
            className={' moddle text-black font-bold normal-case tracking-widest navbar px-10 text-center h-12 bg-secend border-2 border-green-500 grid-rows-3 rounded absolute left-2.5 grid transition-all duration-500 hover:shadow-xl hover:cursor-pointer hover:shadow-green-100'}
            style={datasend ? {top: '10%'} : {top: '-10%'}}
        >
            <p className={'icon-x hover:bg-green-400 transition-all duration-600 ease-in absolute right-1 top-1 border-green-500 bg-green-500 p-1 text-white cursor-pointer'}
               onClick={() => setdatasend(!datasend)}
            >
                <FaXmark/>
            </p>
            <p className={'text-center text-blue-500 row-start-2'}>
                <p className={'text-black'}>donnee envouye avec succes</p>
            </p>
        </div>
    </>
}
export default Datasend