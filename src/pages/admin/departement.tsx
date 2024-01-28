import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {MdOutlineDeleteForever} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';


const AjouteDepartement = () => {
    const [departements, setDepartements] = useState([]);
    const [departementToAdd, setDepartementToAdd] = useState('');
    const [existingDepartementToUpdate, setExistingDepartementToUpdate] = useState('');
    const [newDepartementToUpdate, setNewDepartementToUpdate] = useState('');
    const [departementToDelete, setDepartementToDelete] = useState('');
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [toogle, setToogle] = useState(false);
    const [toogleUpdate, setToogleUpdate] = useState(false);

    const [editingDepartement, setEditingDepartement] = useState({
        ID_D: null,
        DEPARTEMENT: '',
        ID_R: null,
    });

    useEffect(() => {
        axios
            .get('http://localhost:3000/regions')
            .then((response) => {
                setRegions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching regions:', error);
            });
        axios
            .get('http://localhost:3000/departements')
            .then((response) => {
                setDepartements(response.data);
            })
            .catch((error) => {
                console.error('Error fetching departements:', error);
            });
    }, []);

    const handleAddDepartement = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/addOrUpdateDepartement', {
                existingDepartement: '',
                newDepartement: departementToAdd,
                regionId: selectedRegion,
            });
            console.log('Département ajouté avec succès');
            const response = await axios.get('http://localhost:3000/departements');
            setDepartements(response.data);
            setDepartementToAdd('');
            setSelectedRegion('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du département:', error);
        }
    };

    const handleUpdateDepartement = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                existingDepartement: existingDepartementToUpdate,
                newDepartement: editingDepartement.DEPARTEMENT,
                regionId: selectedRegion,
            };
            console.log(updateData)
            await axios.post('http://localhost:3000/addOrUpdateDepartement', updateData);

            const response = await axios.get('http://localhost:3000/departements');
            setDepartements(response.data);
            setExistingDepartementToUpdate(''); // Clear existing departement after successful update
            setToogleUpdate(false);
        } catch (error) {
            console.error('Error updating département:', error);
        }
    };


    const handleEditDepartement = (departement) => {
        setEditingDepartement(departement);
        setExistingDepartementToUpdate(departement.DEPARTEMENT);
        setSelectedRegion(departement.ID_R);
        setToogleUpdate(true);
        setToogle(false);
    };

    const handleDeleteDepartement = async (departement) => {
        console.log(departement)
        if (!window.confirm("Are you sure you want to delete this département?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/deleteDepartement/${departement.ID_D}`);
            console.log('Département deleted successfully');
            const response = await axios.get('http://localhost:3000/departements');
            setDepartements(response.data);
        } catch (error) {
            console.error('Error deleting département:', error);
        }
    };

    return (
        <>
            <button
                className={' bg-blackwhite border-2 border-bluewhite w-full p-2 rounded mb-2 text-white capitalize right-0'}
                onClick={() => setToogle(!toogle)}
            >
                Ajouter un département
            </button>

            {toogle && (
                <form
                    onSubmit={handleAddDepartement}  // Use onSubmit for form submission
                    className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Ajouter un département
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Département :
                            <input
                                type="text"
                                value={departementToAdd}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartementToAdd(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                                required
                            />
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
                        <button
                            type="submit"
                            onClick={handleAddDepartement}
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Ajouter le département
                        </button>
                    </div>
                </form>
            )}
            {toogleUpdate && (
                <form
                    onSubmit={handleUpdateDepartement}  // Use onSubmit for form submission
                    className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Modifier le département
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Département :
                            <input
                                type="text"
                                value={editingDepartement.DEPARTEMENT}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingDepartement({
                                    ...editingDepartement,
                                    DEPARTEMENT: e.target.value
                                })}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            />
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
                        <button
                            type="submit"
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Mettre à jour le département
                        </button>
                    </div>
                </form>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-bluewhite ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Département
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Région
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {departements.length > 0 ? departements.map((item) => (
                        <tr key={item.ID_D}
                            className="bg-blackwhite border-b border-bluewhite dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.DEPARTEMENT}
                            </th>
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {regions.find((region) => region.ID_R === item.ID_R)?.REGION || 'Unknown Region'}
                            </td>
                            <td className="flex items-center px-6 py-4">
                                <button className="font-medium text-blue-600 text-xl"
                                        onClick={() => handleEditDepartement(item)}>
                                    <FaRegEdit/>
                                </button>
                                <button className="font-medium text-red-600 ms-3 text-xl"
                                        onClick={() => handleDeleteDepartement(item)}>
                                    <MdOutlineDeleteForever/>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr className="bg-gray-800">
                            <td colSpan="3" className="px-6 py-4 text-center font-medium text-gray-900">
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

export default AjouteDepartement;
