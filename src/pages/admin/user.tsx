import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {MdOutlineDeleteForever} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';
import {FaCircleXmark} from 'react-icons/fa6';
import {IoShieldCheckmark} from "react-icons/io5";

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({});
    const [userIdToUpdate, setUserIdToUpdate] = useState('');
    const [departments, setDepartments] = useState([]);
    const [toogle, settoogle] = useState(false)
    const [toogleupdate, settoogleupdate] = useState(false)

    const [editingUser, setEditingUser] = useState({
        user_id: null,
        email: "",
        password: "",
        delegate_par: "",
        nom_prenom: "",
        isAdmin: false,
        active_statue: false,
        tele: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));

        axios.get('http://localhost:3000/departements')
            .then(response => {
                setDepartments(response.data);
                console.log(departments)
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);

    const handleAddUser = async () => {
        try {
            await axios.post('http://localhost:3000/users', newUser);
            console.log('User added successfully');
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/users/${userIdToUpdate}`, editingUser);
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
            setUserIdToUpdate('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const getDepartmentName = (departmentId) => {
        const matchingDepartment = departments.find(department => department.ID_D === departmentId);
        return matchingDepartment ? matchingDepartment.DEPARTEMENT : 'Unknown Department';
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setUserIdToUpdate(user.user_id);
    };

    const handleDeleteUser = async (userIdToDelete) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/users/${userIdToDelete}`);
            console.log('User deleted successfully');
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    return (
        <>
            <button
                className={' bg-blackwhite border-2 border-bluewhite w-full p-2 rounded mb-2 text-white capitalize right-0'}
                onClick={() => settoogle(!toogle)}
            > Ajouter un utilisateur
            </button>
        {toogleupdate && (
            <form onSubmit={(e) => e.preventDefault()}
                className={' mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
                <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                    Modifier l'utilisateur
                </p>
                <div className={'mt-4 grid grid-cols-3 gap-3'}>

                    <label className={'col-start-2'}>
                        Email :
                        <input
                            type="text"
                            value={editingUser.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingUser({
                                ...editingUser,
                                email: e.target.value
                            })}
                            className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                        />
                    </label>
                    <label className={'col-start-3 row-start-1'}>
                        Mot de passe :
                        <input
                            type="text"
                            value={editingUser.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingUser({
                                ...editingUser,
                                password: e.target.value
                            })}
                            className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                        />
                    </label>
                    <label>
                        Délégué par :
                        <input
                            type="text"
                            value={editingUser.delegate_par}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingUser({
                                ...editingUser,
                                delegate_par: e.target.value
                            })}
                            className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                        />
                    </label>
                    <label className={'col-start-1 row-start-1'}>
                        Nom et Prénom :
                        <input
                            type="text"
                            value={editingUser.nom_prenom}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingUser({
                                ...editingUser,
                                nom_prenom: e.target.value
                            })}
                            className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                        />
                    </label>
                    <label className={'flex items-center gap-3'}>
                        Admin
                        <input
                            type="checkbox"
                            checked={editingUser.isAdmin}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingUser({
                                ...editingUser,
                                isAdmin: e.target.checked
                            })}
                            className={' outline-0 caret-primary hover:border-primary transition-all duration-500'}
                        />
                    </label>
                    <label className={'flex items-center gap-3'}>
                        User
                        <input
                            type="checkbox"
                            checked={editingUser.active_statue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingUser({
                                ...editingUser,
                                active_statue: e.target.checked
                            })}
                            className={' outline-0 caret-primary hover:border-primary transition-all duration-500'}
                        />
                    </label>
                    <label className={'row-start-2 col-start-1'}>
                        Téléphone :
                        <input
                            type="text"
                            value={editingUser.tele}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingUser({
                                ...editingUser,
                                tele: e.target.value
                            })}
                            className={' w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                        />
                    </label>
                    <label className={'row-start-2 col-start-2'}>
                        ID_D :
                        <select
                            value={editingUser.ID_D}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setEditingUser({
                                ...editingUser,
                                ID_D: e.target.value
                            })}
                            className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                            >
                            <option value="" disabled>Select a department</option>
                            {departments.map(department => (
                                <option key={department.ID_D} value={department.ID_D}>
                                    {department.DEPARTEMENT}
                                </option>
                                ))}
                        </select>
                    </label>
                    <button
                        type="submit"
                        onClick={handleUpdateUser}
                        className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                        >
                        Mettre à jour l'utilisateur
                    </button>
                </div>
            </form>
            )}
        {toogle && <form onSubmit={(e) => e.preventDefault()}
            className={'mt-5 w-6/12 w-60vw m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300'}>
            <p className={'mb-2 font-bold tracking-widest '} style={{fontSize: '13px'}}>
                Ajouter un utilisateur
            </p>
            <div className={'mt-4 grid grid-cols-3 gap-3'}>
                <label className={'col-start-2'}>
                    Email :
                    <input
                        type="text"
                        value={newUser.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUser({
                            ...newUser,
                            email: e.target.value
                        })}
                        className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                    />
                </label>
                <label className={'col-start-3 row-start-1'}>
                    Mot de passe :
                    <input
                        type="text"
                        value={newUser.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUser({
                            ...newUser,
                            password: e.target.value
                        })}
                        className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                    />
                </label>
                <label>
                    Délégué par :
                    <input
                        type="text"
                        value={newUser.delegate_par}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUser({
                            ...newUser,
                            delegate_par: e.target.value
                        })}
                        className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                    />
                </label>
                <label className={'col-start-1 row-start-1'}>
                    Nom et Prénom :
                    <input
                        type="text"
                        value={newUser.nom_prenom}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUser({
                            ...newUser,
                            nom_prenom: e.target.value
                        })}
                        className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                    />
                </label>
                <label className={'flex items-center gap-3'}>
                    Admin
                    <input
                        type="checkbox"
                        checked={newUser.isAdmin}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUser({
                            ...newUser,
                            isAdmin: e.target.checked
                        })}
                        className={' outline-0 caret-primary hover:border-primary transition-all duration-500'}
                    />
                </label>
                <label className={'flex items-center gap-3'}>
                    User
                    <input
                        type="checkbox"
                        checked={newUser.active_statue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUser({
                            ...newUser,
                            active_statue: e.target.checked
                        })}
                        className={' outline-0 caret-primary hover:border-primary transition-all duration-500'}
                    />
                </label>
                <label className={'row-start-2 col-start-1'}>
                    Téléphone :
                    <input
                        type="text"
                        value={newUser.tele}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUser({
                            ...newUser,
                            tele: e.target.value
                        })}
                        className={' w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                    />
                </label>
                < label className={'row-start-2 col-start-2'}>
                    ID_D :
                    <select
                        value={newUser.ID_D}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewUser({
                            ...newUser,
                            ID_D: e.target.value
                        })}
                        className={'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500'}
                        >
                        <option value="" hidden>Select a department</option>
                        {departments.map(department => (
                            <option key={department.ID_D} value={department.ID_D}>
                                {department.DEPARTEMENT}
                            </option>
                            ))}
                    </select>
                </label>
                <button
                    type="submit"
                    onClick={handleAddUser}
                    className={'row-start-4 col-span-3 mt-2 mb-2 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide'}
                    >
                    Ajouter l'utilisateur
                </button>
            </div>
        </form>}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-bluewhite ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom et Prénom
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Département
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Délégué par
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telephone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Admin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? users.map((item) => (
                        <tr key={item.user_id}
                            className="bg-blackwhite border-b border-bluewhite dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {item.nom_prenom}
                            </th>
                            <td className="px-6 py-4 text-white">
                                {item?.email}
                            </td>
                            <td className="px-6 py-4 text-white">
                                {getDepartmentName(item.ID_D)}
                            </td>
                            <td className="px-6 py-4 text-white">
                                {item.delegate_par}
                            </td>
                            <td className="px-6 py-4 text-white">
                                {item.tele}
                            </td>
                            <td className="px-6 py-4 text-white text-center">
                                {item.active_statue ?
                                    <p className={'text-green-500 text-xl'}><IoShieldCheckmark/></p> :
                                    <p className={'text-red-500 text-xl'}><FaCircleXmark/></p>}
                            </td>
                            <td className="px-6 py-4 text-white">
                                {item.isAdmin ? <p className={'text-green-500 text-xl'}><IoShieldCheckmark/></p> :
                                    <p className={'text-red-500 text-xl'}><FaCircleXmark/></p>}
                            </td>
                            <td className="flex items-center px-6 py-4">
                                <button className="font-medium text-blue-600 text-xl"
                                        onClick={() => {
                                            handleEditUser(item)
                                            settoogleupdate(!toogleupdate)
                                        }}>
                                    <FaRegEdit/>
                                </button>
                                <button className="font-medium text-red-600 ms-3 text-xl"
                                        onClick={() => handleDeleteUser(item.user_id)}>
                                    <MdOutlineDeleteForever/>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr className="bg-gray-800">
                            <td colSpan="8" className="px-6 py-4 text-center font-medium text-gray-900">
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

export default UserCrud;

