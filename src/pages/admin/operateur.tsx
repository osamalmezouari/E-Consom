import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {MdOutlineDeleteForever} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';

const OperateurCrud = () => {
    const [operateurs, setOperateurs] = useState([]);
    const [newOperateur, setNewOperateur] = useState('');
    const [operateurToUpdate, setOperateurToUpdate] = useState('');
    const [toogle, setToogle] = useState(false);
    const [toogleUpdate, setToogleUpdate] = useState(false);


    const [editingOperateur, setEditingOperateur] = useState({
        ID_O: null,
        OPERATEUR: '',
    });

    const [operateurOptions, setOperateurOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getOperateurs')
            .then(response => {
                setOperateurs(response.data);
                setOperateurOptions(response.data);
            })
            .catch(error => console.error('Error fetching operateurs:', error));
    }, []);

    const handleAddOperateur = async () => {
        try {
            await axios.post('http://localhost:3000/addOrUpdateOperateur', {
                existingOperateur: '',
                newOperateur: newOperateur,
            });
            console.log('Operateur added successfully');
            const response = await axios.get('http://localhost:3000/getOperateurs');
            setOperateurs(response.data);
        } catch (error) {
            console.error('Error adding operateur:', error);
        }
    };

    const handleUpdateOperateur = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/addOrUpdateOperateur', {
                existingOperateur: operateurToUpdate,
                newOperateur: editingOperateur.OPERATEUR,
            });
            const response = await axios.get('http://localhost:3000/getOperateurs');
            setOperateurs(response.data);
            setOperateurToUpdate('');
            setToogleUpdate(false);
        } catch (error) {
            console.error('Error updating operateur:', error);
        }
    };

    const handleEditOperateur = (operateur) => {
        setEditingOperateur(operateur);
        setOperateurToUpdate(operateur.OPERATEUR);
        setToogleUpdate(true);
        setToogle(false); 
    };

    const handleDeleteOperateur = async (operateurNameAndId) => {
        console.log(operateurNameAndId);
        if (!window.confirm("Are you sure you want to delete this operateur?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/deleteOperateur/${operateurNameAndId.operateurid}`);
            console.log('Operateur deleted successfully');
            const response = await axios.get('http://localhost:3000/getOperateurs');
            setOperateurs(response.data);
        } catch (error) {
            console.error('Error deleting operateur:', error);
        }
    };

    return (
        <>
            <button
                className={' bg-blackwhite border-2 border-bluewhite w-full p-2 rounded mb-2 text-white capitalize right-0'}
                onClick={() => setToogle(!toogle)}
            >
                Ajouter un operateur
            </button>
            {toogle && (
                <form onSubmit={(e) => e.preventDefault()}
                      className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Ajouter un operateur
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Operateur :
                            <input
                                type="text"
                                value={newOperateur}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewOperateur(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            />
                        </label>
                        <button
                            type="submit"
                            onClick={handleAddOperateur}
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Ajouter l'operateur
                        </button>
                    </div>
                </form>
            )}
            {toogleUpdate && (
                <form onSubmit={(e) => e.preventDefault()}
                      className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Modifier l'operateur
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Operateur :
                            <select
                                value={editingOperateur.OPERATEUR}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setEditingOperateur({
                                    ...editingOperateur,
                                    OPERATEUR: e.target.value
                                })}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            >
                                {operateurOptions.map((option) => (
                                    <option key={option.ID_O} value={option.OPERATEUR}>
                                        {option.OPERATEUR}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button
                            type="submit"
                            onClick={handleUpdateOperateur}
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Mettre à jour l'operateur
                        </button>
                    </div>
                </form>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-bluewhite ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Operateur
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {operateurs.length > 0 ? operateurs.map((item) => (
                        <tr key={item.ID_O}
                            className="bg-blackwhite border-b border-bluewhite dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.OPERATEUR}
                            </th>
                            <td className="flex items-center px-6 py-4">
                                <button className="font-medium text-blue-600 text-xl"
                                        onClick={() => {
                                            handleEditOperateur(item)
                                            setToogleUpdate(!toogleUpdate)
                                        }}>
                                    <FaRegEdit/>
                                </button>
                                <button className="font-medium text-red-600 ms-3 text-xl"
                                        onClick={() => handleDeleteOperateur({
                                            operateurname: item.OPERATEUR,
                                            operateurid: item.ID_O
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

export default OperateurCrud;

