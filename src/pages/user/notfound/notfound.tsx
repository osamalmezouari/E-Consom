import {Link} from "react-router-dom";

const Notfound = () => {
    return <div>
        <div className={' text-center text-cyan capitalize '}>
            <p className={' m-auto mt-24 mb-12 font-bold tracking-wider text-6xl w-4/12 h-max text-center'}> 404 page not found</p>
            <Link to={'/'} className={' py-2 px-2 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}>
                conecter-vous
            </Link>
        </div>
    </div>
}
export default Notfound