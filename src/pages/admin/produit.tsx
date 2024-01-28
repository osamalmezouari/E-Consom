import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {MdOutlineDeleteForever} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';

const ProduitCrud = () => {
    const [produits, setProduits] = useState([]);
    const [newProduit, setNewProduit] = useState('');
    const [existingProduitToUpdate, setExistingProduitToUpdate] = useState('');
    const [anotherNewProduitToUpdate, setAnotherNewProduitToUpdate] = useState('');
    const [toogle, setToogle] = useState(false);
    const [toogleUpdate, setToogleUpdate] = useState(false);

    const [editingProduit, setEditingProduit] = useState({
        ID_P: null,
        PRODUIT: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3000/getProduits')
            .then(response => {
                setProduits(response.data);
            })
            .catch(error => console.error('Error fetching produits:', error));
    }, []);

    const handleAddProduit = async () => {
        try {
            await axios.post('http://localhost:3000/addOrUpdateProduit', {
                existingProduit: '',
                newProduit: newProduit,
            });
            console.log('Produit added successfully');
            const response = await axios.get('http://localhost:3000/getProduits');
            setProduits(response.data);
        } catch (error) {
            console.error('Error adding produit:', error);
        }
    };

    const handleUpdateProduit = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                existingProduit: existingProduitToUpdate,
                newProduit: editingProduit.PRODUIT,
            };
            await axios.post('http://localhost:3000/addOrUpdateProduit', updateData);

            const response = await axios.get('http://localhost:3000/getProduits');
            setProduits(response.data);
            setExistingProduitToUpdate('');
            setToogleUpdate(false);
        } catch (error) {
            console.error('Error updating produit:', error);
        }
    };
    const handleEditProduit = (produit) => {
        setEditingProduit(produit);
        setExistingProduitToUpdate(produit.PRODUIT);
        setToogleUpdate(true);
        setToogle(false);
    };

    const handleDeleteProduit = async (produit) => {
        console.log(produit.produitid);
        if (!window.confirm("Are you sure you want to delete this produit?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/deleteProduit/${produit.produitid}`);
            console.log('Produit deleted successfully');
            const response = await axios.get('http://localhost:3000/getProduits');
            setProduits(response.data);
        } catch (error) {
            console.error('Error deleting produit:', error);
        }
    };

    return (
        <>
            <button
                className={' bg-blackwhite border-2 border-bluewhite w-full p-2 rounded mb-2 text-white capitalize right-0'}
                onClick={() => setToogle(!toogle)}
            >
                Ajouter un produit
            </button>

            {toogle && (
                <form onSubmit={(e) => e.preventDefault()}
                      className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Ajouter un produit
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Produit :
                            <input
                                type="text"
                                value={newProduit}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewProduit(e.target.value)}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            />
                        </label>
                        <button
                            type="submit"
                            onClick={handleAddProduit}
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Ajouter le produit
                        </button>
                    </div>
                </form>
            )}
            {toogleUpdate && (
                <form onSubmit={(e) => e.preventDefault()}
                      className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                    <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                        Modifier le produit
                    </p>
                    <div className={'mt-4 grid grid-cols-3 gap-3'}>
                        <label className={'col-start-2'}>
                            Produit :
                            <input
                                type="text"
                                value={editingProduit.PRODUIT}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingProduit({
                                    ...editingProduit,
                                    PRODUIT: e.target.value
                                })}
                                className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            />
                        </label>
                        <button
                            type="submit"
                            onClick={handleUpdateProduit}
                            className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                            Mettre à jour le produit
                        </button>
                    </div>
                </form>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-bluewhite ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Produit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {produits.length > 0 ? produits.map((item) => (
                        <tr key={item.ID_P}
                            className="bg-blackwhite border-b border-bluewhite dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.PRODUIT}
                            </th>
                            <td className="flex items-center px-6 py-4">
                                <button className="font-medium text-blue-600 text-xl"
                                        onClick={() => handleEditProduit(item)}>
                                    <FaRegEdit/>
                                </button>
                                <button className="font-medium text-red-600 ms-3 text-xl"
                                        onClick={() => handleDeleteProduit({
                                            produitname: item.PRODUIT,
                                            produitid: item.ID_P
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

export default ProduitCrud;
