import {useContext} from "react";
import {FaXmark} from "react-icons/fa6";
import {ExistAlert} from "../../pages/user/form/form.tsx";


const Alreadyexist = () => {
    const {existalert, setexistalert} = useContext(ExistAlert)
    return <>
        <div
            className={' moddle border-red-400 text-black font-bold normal-case tracking-widest navbar px-20 text-center w-1/4 h-12 bg-secend border-2 grid-rows-3 rounded absolute left-2.5 grid transition-all duration-500 hover:shadow-xl hover:cursor-pointer hover:shadow-red-100'}
            style={existalert ? {top: '10%'} : {top: '-10%'}}
        >
            <p className={'icon-x hover:bg-red-400 transition-all duration-600 ease-in absolute right-1 top-1 border-red-500 bg-red-500 p-1 text-white cursor-pointer'}
               onClick={() => setexistalert(!existalert)}
            >
                <FaXmark/>
            </p>
            <p className={'text-center text-blue-500 row-start-2'}>
                <p className={'text-black'}>Deja exist</p>
            </p>
        </div>
    </>
}
export default Alreadyexist