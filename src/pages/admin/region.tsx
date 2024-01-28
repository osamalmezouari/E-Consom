import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {MdOutlineDeleteForever} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';

const RegionCrud = () => {
    const [regions, setRegions] = useState([]);
    const [newRegion, setNewRegion] = useState('');
    const [regionToUpdate, setRegionToUpdate] = useState('');
    const [toogle, setToogle] = useState(false);
    const [toogleUpdate, setToogleUpdate] = useState(false);

    const [editingRegion, setEditingRegion] = useState({
        ID_R: null,
        REGION: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3000/regions')
            .then(response => {
                setRegions(response.data);
            })
            .catch(error => console.error('Error fetching regions:', error));
    }, []);

    const handleAddRegion = async () => {
        try {
            await axios.post('http://localhost:3000/addOrUpdateRegion', {
                existingRegion: '',
                newRegion: newRegion,
            });
            console.log('Region added successfully');
            const response = await axios.get('http://localhost:3000/getRegions');
            setRegions(response.data);
        } catch (error) {
            console.error('Error adding region:', error);
        }
    };

    const handleUpdateRegion = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/addOrUpdateRegion', {
                existingRegion: regionToUpdate,
                newRegion: editingRegion.REGION,
            });
            const response = await axios.get('http://localhost:3000/getRegions');
            setRegions(response.data);
            setRegionToUpdate('');
            setToogleUpdate(false);
        } catch (error) {
            console.error('Error updating region:', error);
        }
    };

    const handleEditRegion = (region) => {
        setEditingRegion(region);
        setRegionToUpdate(region.REGION);
        setToogleUpdate(true);
        setToogle(false); // Close the add form
    };

    const handleDeleteRegion = async (region) => {
        console.log(region.regionid);
        if (!window.confirm("Are you sure you want to delete this region?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/deleteRegion/${region.regionid}`);
            console.log('Region deleted successfully');
            const response = await axios.get('http://localhost:3000/getRegions');
            setRegions(response.data);
        } catch (error) {
            console.error('Error deleting region:', error);
        }
    };

    return (
        <>
            <button
                className={' bg-blackwhite border-2 border-bluewhite w-full p-2 rounded mb-2 text-white capitalize right-0'}
                onClick={() => setToogle(!toogle)}
            >
                Ajouter une région
            </button>

            {/* Add Region Form */}
            {toogle && (
                <form onSubmit={(e) => e.preventDefault()}
                      className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Ajouter une région
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Région :
                            <input
                                type="text"
                                value={newRegion}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewRegion(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            />
                        </label>
                        <button
                            type="submit"
                            onClick={handleAddRegion}
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Ajouter la région
                        </button>
                    </div>
                </form>
            )}
            {toogleUpdate && (
                <form onSubmit={(e) => e.preventDefault()}
                      className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Modifier la région
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Région :
                            <input
                                type="text"
                                value={editingRegion.REGION}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingRegion({
                                    ...editingRegion,
                                    REGION: e.target.value
                                })}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            />
                        </label>
                        <button
                            type="submit"
                            onClick={handleUpdateRegion}
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Mettre à jour la région
                        </button>
                    </div>
                </form>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-bluewhite ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Région
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {regions.length > 0 ? regions.map((item) => (
                        <tr key={item.ID_R}
                            className="bg-blackwhite border-b border-bluewhite dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.REGION}
                            </th>
                            <td className="flex items-center px-6 py-4">
                                <button className="font-medium text-blue-600 text-xl"
                                        onClick={() => handleEditRegion(item)}>
                                    <FaRegEdit/>
                                </button>
                                <button className="font-medium text-red-600 ms-3 text-xl"
                                        onClick={() => handleDeleteRegion({
                                            regionname: item.REGION,
                                            regionid: item.ID_R
                                        })}>
                                    <MdOutlineDeleteForever/>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr className="bg-gray-800">
                            <td colSpan="2" className="px-6 py-4 text-center font-medium text-gray-900">
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

export default RegionCrud;
