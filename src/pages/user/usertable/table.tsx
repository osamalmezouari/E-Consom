import React, {useContext, useEffect, useState} from "react";
import Navbar from "../../../components/navbar.tsx";
import {userContext} from "../../../App.tsx";
import axios from "axios";
import './table.css'

const Table = () => {
    const contextValue = useContext(userContext);
    const [allData, setAllData] = useState([]);
    const [consomData, setConsomData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [produits, setProduits] = useState([]);
    const [annees, setAnnees] = useState<number[]>([]);
    const [filters, setFilters] = useState({
        ID_P: '',
        ANNEE: '',
        PRODUIT: '',
    });
    const {user} = contextValue;

    useEffect(() => {
        axios.get('http://localhost:3000/getProduits')
            .then(response => setProduits(response.data))
            .catch(error => console.error('Error fetching produits:', error));

        axios.get('http://localhost:3000/getAnnees')
            .then(response => {
                console.log(response.data);
                setAnnees(response.data);
            })
            .catch(error => console.error('Error fetching annees:', error));
    }, []);

    useEffect(() => {
        setIsLoading(true);

        const apiUrl = `http://localhost:3000/getuserConsomData/${user.ID_D.toString()}?produit=${filters.PRODUIT}&annee=${filters.ANNEE}`;

        axios.get(apiUrl)
            .then((res) => {
                const resData = res.data;
                console.log(apiUrl);
                setAllData(resData);
                setConsomData(resData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [user.ID_D, filters.PRODUIT, filters.ANNEE]);

    const handlerChange = (e) => {
        const {name, value} = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <Navbar logindesplay={false}/>

            <div className="relative overflow-x-auto max-w-6xl m-auto ">
                <form>
                    <div className="py-10 flex gap-5">
                        <div className={'row-start-2 col-start-2 col-span-2'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> Produit </p>
                            <select
                                required
                                onChange={(e) => handlerChange(e)}
                                name="PRODUIT"
                                value={filters.PRODUIT}
                                style={{fontSize: '12px'}}
                                className={' w-full h-8 capitalize bg-secend outline-0 pl-3 caret-primary rounded border-transparent hover:border-orange transition-all duration-500 '}
                            >
                                <option value="" hidden={true}></option>
                                {produits.map((produit: any) => (
                                    <option key={produit.ID_P} value={parseInt(produit.ID_P)}>
                                        {produit.PRODUIT}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={'row-start-3 col-start-3 col-span-2'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> annee </p>
                            <select
                                required
                                onChange={(e) => handlerChange(e)}
                                name="ANNEE"
                                value={filters.ANNEE}
                                style={{fontSize: '12px'}}
                                className={'w-full h-8 capitalize bg-secend outline-0 pl-3 caret-primary rounded border border-transparent hover:border-orange transition-all duration-500'}
                            >
                                <option value="" hidden={true}></option>
                                {annees.map((annee) => (
                                    <option key={annee} value={parseInt(annee)}>
                                        {annee}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
                {isLoading ? (
                    <p className="text-center text-gray-600 dark:text-white">Loading...</p>
                ) : (
                    <table
                        className=" table rounded-2xl w-full mb-20 text-white text-left rtl:text-right bg-blackwhite ">
                        <thead className="text-white uppercase bg-bluewhite ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Mois
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Montant de Consommation
                            </th>
                            <th scope="col" className="px-6 py-3">
                                debut_periode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                fin_periode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Année
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Produit
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {consomData.length > 0 ? (
                            consomData.map((item) => (
                                <tr key={item.id} className="bg-gray-800">
                                    <td className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.MOIS}
                                    </td>
                                    <td className="px-6 py-1 text-center">
                                        {item.MNT_CONS}
                                    </td>
                                    <td className="px-6 py-1">
                                        {item.debut_periode}
                                    </td>
                                    <td className="px-6 py-1">
                                        {item.fin_periode}
                                    </td>
                                    <td className="px-6 py-1">
                                        {item.ANNEE}
                                    </td>
                                    <td className="px-6 py-1">
                                        {item.PRODUIT}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-gray-800">
                                <td colSpan="6"
                                    className="px-6 py-4 text-center font-medium text-gray-900 ">
                                    Aucune donnée disponible
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Table;
