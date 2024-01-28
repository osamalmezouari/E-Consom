import React, {useEffect, useState} from "react";
import axios from "axios";

const ConsomationTable = () => {
    const [allData, setAllData] = useState([]);
    const [departements, setDepartements] = useState([]);
    const [produits, setProduits] = useState([]);
    const [annees, setAnnees] = useState([]);
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        DEPARTEMENT: "",
        PRODUIT: "",
        ANNEE: "",
        REGION: "",
    });

    useEffect(() => {
        fetchData({});

        axios
            .get("http://localhost:3000/departements")
            .then((response) => setDepartements(response.data))
            .catch((error) => console.error("Error fetching departements:", error));

        axios
            .get("http://localhost:3000/getProduits")
            .then((response) => setProduits(response.data))
            .catch((error) => console.error("Error fetching produits:", error));

        axios
            .get("http://localhost:3000/getAnnees")
            .then((response) => setAnnees(response.data))
            .catch((error) => console.error("Error fetching annees:", error));

        axios
            .get("http://localhost:3000/getRegions")
            .then((response) => setRegions(response.data))
            .catch((error) => console.error("Error fetching regions:", error));
    }, []);


    const fetchData = async (filters) => {
        setIsLoading(true);

        try {
            let apiUrl = "http://localhost:3000/getAllConsommationData";

            const {DEPARTEMENT, PRODUIT, ANNEE, REGION} = filters;

            if (DEPARTEMENT || PRODUIT || ANNEE || REGION) {
                apiUrl = `http://localhost:3000/getFilteredData/${DEPARTEMENT}/${PRODUIT}/${ANNEE}/${REGION}`;
            }

            const res = await axios.get(apiUrl);

            const resData = res.data;

            const detailedData = await Promise.all(
                resData.map(async (item) => {
                    const [departement, produit, mois, region] = await Promise.all([
                        fetchDetailsById("departement", item.ID_D),
                        fetchDetailsById("produit", item.ID_P),
                        fetchDetailsById("mois", item.ID_M),
                        fetchRegionForDepartement(item.ID_D),
                    ]);

                    return {
                        ...item,
                        Departement: departement.DEPARTEMENT,
                        Produit: produit.PRODUIT,
                        Mois: mois.MOIS,
                        Region: region.REGION,
                    };
                })
            );

            setAllData(detailedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const {name, value} = e.target;

        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchData(filters);
    };

    useEffect(() => {
        fetchData(filters);
    }, [filters.DEPARTEMENT, filters.PRODUIT, filters.ANNEE, filters.REGION]);

    const fetchDetailsById = async (type, id) => {
        const response = await axios.get(`http://localhost:3000/get${type}ById/${id}`);
        return response.data;
    };

    const fetchRegionForDepartement = async (departementId) => {
        const response = await axios.get(`http://localhost:3000/getRegionForDepartement/${departementId}`);
        return response.data;
    };


    return (
        <>
            <div className="relative overflow-x-auto max-w-6xl m-auto">
                <form onSubmit={handleFilterSubmit}>
                    <div className="py-10 flex gap-5 items-center">
                        <div className="row-start-2 col-start-2 col-span-2">
                            <p className="font-bold tracking-widest mb-2 capitalize"
                               style={{fontSize: '13px'}}> Department </p>
                            <select
                                required={true}
                                onChange={(e) => handleFilterChange(e)}
                                name="DEPARTEMENT"
                                value={filters.DEPARTEMENT}
                                style={{fontSize: '12px'}}
                                className="w-full h-8 capitalize bg-secend outline-0 pl-3 caret-primary rounded border-transparent hover:border-orange transition-all duration-500"
                            >
                                <option value="" hidden={true}></option>
                                {departements.map((departement) => (
                                    <option key={departement.ID_D} value={departement.ID_D}>
                                        {departement.DEPARTEMENT}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="row-start-3 col-start-3 col-span-2">
                            <p className="font-bold tracking-widest mb-2 capitalize"
                               style={{fontSize: '13px'}}> Product </p>
                            <select
                                required={true}
                                onChange={(e) => handleFilterChange(e)}
                                name="PRODUIT"
                                value={filters.PRODUIT}
                                style={{fontSize: '12px'}}
                                className="w-full h-8 capitalize bg-secend outline-0 pl-3 caret-primary rounded border border-transparent hover:border-orange transition-all duration-500"
                            >
                                <option value="" hidden={true}></option>
                                {produits.map((produit) => (
                                    <option key={produit.ID_P} value={produit.ID_P}>
                                        {produit.PRODUIT}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="row-start-4 col-start-4 col-span-2">
                            <p className="font-bold tracking-widest mb-2 capitalize"
                               style={{fontSize: '13px'}}> Year </p>
                            <select
                                required={true}
                                onChange={(e) => handleFilterChange(e)}
                                name="ANNEE"
                                value={filters.ANNEE}
                                style={{fontSize: '12px'}}
                                className="w-full h-8 capitalize bg-secend outline-0 pl-3 caret-primary rounded border border-transparent hover:border-orange transition-all duration-500"
                            >
                                <option value="" hidden={true}></option>
                                {annees.map((annee) => (
                                    <option key={annee} value={annee}>
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
                        className="table rounded-2xl w-full mb-20 text-white text-left bg-blackwhite">
                        <thead className="text-white uppercase bg-bluewhite">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Mois
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Montant de Consommation
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Année
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Produit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Region
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Departement
                            </th>
                            <th scope="col" className="px-6 py-3">
                                debut_periode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                fin_periode
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {allData.length > 0 ? (
                            allData.map((item) => (
                                <tr key={item.id}
                                    className="bg-gray-800 border-2 border-bluewhite">
                                    <td className="px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {item.Mois}
                                    </td>
                                    <td className="px-6 py-1 text-center">{item.MNT_CONS}</td>
                                    <td className="px-6 py-1">{item.ANNEE}</td>
                                    <td className="px-6 py-1">{item.Produit}</td>
                                    <td className="py-1">{item.Region}</td>
                                    <td className="px-6 py-1">{item.Departement}</td>
                                    <td className="px-6 py-1">{item.DEBUT_PERIODE}</td>
                                    <td className="px-6 py-1">{item.FIN_PERIODE}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-gray-800">
                                <td colSpan="8" className="px-6 py-4 text-center font-medium text-gray-900 ">
                                    No data available
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

export default ConsomationTable;

