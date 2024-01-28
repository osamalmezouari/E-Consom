import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FaRegEdit} from 'react-icons/fa';

const AjouteDonneConsom = () => {
    const [donneConsomData, setDonneConsomData] = useState([]);
    const [selectedDonneConsom, setSelectedDonneConsom] = useState(null);
    const [toogle, setToogle] = useState(false);

    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [produits, setProduits] = useState([]);
    const [selectedProduit, setSelectedProduit] = useState('');
    const [depCredit, setDepCredit] = useState('');
    const [dotaDefinitive, setDotaDefinitive] = useState('');
    const [commission, setCommission] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3000/regions")
            .then((response) => {
                setRegions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching regions:", error);
            });

        axios.get("http://localhost:3000/emptyYears")
            .then((response) => {
                setYears(response.data);
            })
            .catch((error) => {
                console.error("Error fetching years:", error);
            });


        axios.get("http://localhost:3000/getProduits")
            .then((response) => {
                setProduits(response.data);
            })
            .catch((error) => {
                console.error("Error fetching produits:", error);
            });

        axios.get("http://localhost:3000/DonneConsomData")
            .then((response) => {
                setDonneConsomData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching donneconsom data:", error);
            });
    }, []);

    const handleAddOrUpdateDonneConsom = async (e) => {
        e.preventDefault();

        try {
            const data = selectedDonneConsom
                ? {
                    ...selectedDonneConsom,
                    ANNEE: selectedYear || selectedDonneConsom.ANNEE, // Use existing value if not provided
                    ID_R: selectedRegion,
                    DEPAT_CREDIT: depCredit,
                    DOTA_DEFINITIVE: dotaDefinitive,
                    COMISSION: commission,
                    ID_P: selectedProduit,
                }
                : {
                    ANNEE: selectedYear,
                    ID_R: selectedRegion,
                    DEPAT_CREDIT: depCredit,
                    DOTA_DEFINITIVE: dotaDefinitive,
                    COMISSION: commission,
                    ID_P: selectedProduit,
                };

            if (selectedDonneConsom) {
                data.ID_DC = selectedDonneConsom.ID_DC;
            }

            await axios.post(selectedDonneConsom ? `http://localhost:3000/updateDonneConsom/${data.ID_DC}` : "http://localhost:3000/addDonneConsom", data);

            console.log("DonneConsom added or updated successfully");
            const response = await axios.get("http://localhost:3000/DonneConsomData");
            console.log("Updated donneconsom data:", response.data);
            setDonneConsomData(response.data);
            setSelectedDonneConsom(null);
            setDepCredit("");
            setDotaDefinitive("");
            setCommission("");
            setSelectedProduit("");
            setSelectedYear("");
            setSelectedRegion("");
        } catch (error) {
            console.error("Erreur lors de l'ajout ou de la mise à jour de DonneConsom:", error);
        }
    };

    const handleEditDonneConsom = (donneconsom) => {
        setSelectedDonneConsom(donneconsom);
        setDepCredit(donneconsom.DEPAT_CREDIT);
        setDotaDefinitive(donneconsom.DOTA_DEFINITIVE);
        setCommission(donneconsom.COMISSION);
        setSelectedProduit(donneconsom.ID_P);
        setSelectedYear(donneconsom.ANNEE);
        setSelectedRegion(donneconsom.ID_R);
        setToogle(true);
    };

    return (
        <>
            <button
                className={' bg-blackwhite border-2 border-bluewhite w-full p-2 rounded mb-2 text-white capitalize right-0'}
                onClick={() => setToogle(!toogle)}
            >
                {selectedDonneConsom ? 'Mettre à jour DonneConsom' : 'Ajouter DonneConsom'}
            </button>

            {toogle && (
                <form
                    onSubmit={handleAddOrUpdateDonneConsom}
                    className={' mt-5 mb-3 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        {selectedDonneConsom ? 'Mettre à jour DonneConsom' : 'Ajouter DonneConsom'}
                    </p>
                    <div className={'mt-4 grid grid-cols-3 grid-rows-3 gap-3'}>
                        <label className={'col-start-1'}>
                            Année:
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            >
                                <option value="" disabled>
                                    Sélectionnez une année
                                </option>
                                {years.map((year) => (
                                    <option key={year.ANNEE} value={year.ANNEE}>
                                        {year.ANNEE}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={'col-start-2'}>
                            Sélectionner la Région :
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            >
                                <option value="" disabled>
                                    Sélectionnez une région
                                </option>
                                {regions.map((region) => (
                                    <option key={region.ID_R} value={region.ID_R}>{region.REGION}</option>
                                ))}
                            </select>
                        </label>
                        <label className={'col-start-1 row-start-2'}>
                            Département Crédit:
                            <input
                                type="number"
                                value={depCredit}
                                onChange={(e) => setDepCredit(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                                required
                            />
                        </label>
                        <label className={'col-start-3 row-start-2'}>
                            Dota Définitive:
                            <input
                                type="number"
                                value={dotaDefinitive}
                                onChange={(e) => setDotaDefinitive(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                                required
                            />
                        </label>
                        <label className={'col-start-2 row-start-2'}>
                            Commission:
                            <input
                                type="number"
                                value={commission}
                                onChange={(e) => setCommission(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                                required
                            />
                        </label>
                        <label className={'col-start-3 row-start-1'}>
                            Sélectionner le Produit:
                            <select
                                value={selectedProduit}
                                onChange={(e) => setSelectedProduit(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            >
                                <option value="" disabled>
                                    Sélectionnez un produit
                                </option>
                                {produits.map((produit) => (
                                    <option key={produit.ID_P} value={produit.ID_P}>
                                        {produit.PRODUIT}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button
                            type="submit"
                            className={'row-start-3 col-span-3 mt-2 text-center w-full h-10 py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            {selectedDonneConsom ? 'Modifier la donnée de consommation.' : 'Ajouter une Donnée de Consommation'}
                        </button>
                    </div>
                </form>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                    <thead className="text-xs text-white uppercase bg-bluewhite ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Année
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Région
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Département Crédit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dota Définitive
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Commission
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Produit
                        </th>
                        <th scope={'col'} className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {donneConsomData.length > 0 ? donneConsomData.map((item) => (
                        <tr key={item.ID_DC}
                            className="bg-blackwhite border-b border-bluewhite dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.ANNEE}
                            </th>
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {regions.find((region) => region.ID_R === item.ID_R)?.REGION || 'Unknown Region'}
                            </td>
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.DEPAT_CREDIT}
                            </td>
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.DOTA_DEFINITIVE}
                            </td>
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.COMISSION}
                            </td>
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {produits.find((produit) => produit.ID_P === item.ID_P)?.PRODUIT || 'Unknown Produit'}
                            </td>
                            <td className="flex items-center px-6 py-4">
                                <button className="font-medium text-blue-600 text-xl"
                                        onClick={() => handleEditDonneConsom(item)}>
                                    <FaRegEdit/>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr className="bg-gray-800">
                            <td colSpan="7" className="px-6 py-4 text-center font-medium text-gray-900">
                                Aucune donnée disponible
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AjouteDonneConsom;
