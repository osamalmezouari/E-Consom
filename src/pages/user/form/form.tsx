import React, {ChangeEvent, createContext, FormEvent, useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {userContext} from "../../../App.tsx";
import dayjs from 'dayjs';
import Navbar from "../../../components/navbar.tsx";
import Alreadyexist from "../../../components/alerts/exist.tsx";
import Datasend from "../../../components/alerts/send.tsx";
import Monthempty from "../../../components/alerts/monthempty.tsx";

export const ExistAlert = createContext()

const Form = (props: PropsData) => {
    const contextvalue = useContext(userContext);
    const {user, setmerciacces} = contextvalue;
    const navigate = useNavigate();
    const {Data, setData} = props;

    const [userDepartment, setUserDepartment] = useState<string>("");
    const [userRegion, setUserRegion] = useState<string>("");
    const [operateurs, setOperateurs] = useState([]);
    const [produits, setProduits] = useState([]);
    const [annees, setAnnees] = useState<number[]>([]);
    const [allMonths, setAllMonths] = useState<string[]>([]);
    const [tri, selectedtri] = useState('')
    const monthref = useRef('')
    const [existalert, setexistalert] = useState(false)
    const [datasend, setdatasend] = useState(false)
    const [monthvide, setMonthvide] = useState<number[]>([]);
    const anneeref = useRef(0)
    const prdouitref = useRef(0)


    useEffect(() => {
        axios.get(`http://localhost:3000/getUserInfo/${user.user_id}`)
            .then((response) => {
                const userData = response.data;
                setUserDepartment(userData.DEPARTEMENT);
                setUserRegion(userData.REGION);
            })
            .catch((error) => {
                console.error("Error fetching user department and region:", error);
            });

        axios.get('http://localhost:3000/getOperateurs')
            .then(response => {
                setOperateurs(response.data);
            })
            .catch(error => console.error('Error fetching operateurs:', error));

        axios.get('http://localhost:3000/getProduits')
            .then(response => setProduits(response.data))
            .catch(error => console.error('Error fetching produits:', error));

        axios.get('http://localhost:3000/getAnnees')
            .then(response => {
                setAnnees(response.data);
            })
            .catch(error => console.error('Error fetching annees:', error));
    }, [user.ID_D]);
    useEffect(() => {
        axios.get(`http://localhost:3000/getMonths/${anneeref.current.value}/${prdouitref.current.value}/${user.ID_D}`)
            .then(response => {
                setAllMonths(response.data[0]);
                console.log(allMonths)
            })
            .catch(error => console.error('Error fetching months:', error));
    }, [anneeref.current.value, prdouitref.current.value, user.ID_D, user.user_id]);

    useEffect(() => {
        if (monthref.current.value == 1 || monthref.current.value == 2 || monthref.current.value == 3) {
            selectedtri('1ere Trimestre')
        } else if (monthref.current.value == 4 || monthref.current.value == 5 || monthref.current.value == 6) {
            selectedtri('2eme Trimestre')
        } else if (monthref.current.value == 7 || monthref.current.value == 8 || monthref.current.value == 9) {
            selectedtri('3eme Trimestre')
        } else if (monthref.current.value == 10 || monthref.current.value == 11 || monthref.current.value == 12) {
            selectedtri('4eme Trimestre')
        } else {
            selectedtri('')
        }

    }, [monthref.current.value]);

    const handlerChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(produits)
        console.log(allMonths)
        console.log(Data)
        const {name, value} = e.target;
        setData((prevState) => ({
            ...prevState,
            ID_D: user.ID_D,
            user_id: user.user_id,
            DATEEFFET: dayjs().format('YYYY-MM-DD'),
            [name]: value,
        }));
    };

    const handlerSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (Data?.ID_M == allMonths[0].ID_M) {
                await axios.post('http://localhost:3000/consommation', Data);
                setdatasend(true);
                console.log('data send succes')
            } else {
                const generatedMonths = [];
                for (let i = allMonths[0].ID_M; i < Data?.ID_M; i++) {
                    generatedMonths.push(i);
                }
                setMonthvide(generatedMonths);
                console.log(monthvide);
            }
            setTimeout(() => {
                location.reload();
            }, 2000);
        } catch (error) {
            console.error('Sending Data failed:', error);
            setexistalert(true);
        }
    };
    useEffect(() => {
        console.log(monthvide);
    }, [monthvide]);

    useEffect(() => {
        const targettimeout = setTimeout(() => {
            setexistalert(false)
        }, 5000)
        return () => clearTimeout(targettimeout)
    }, [existalert]);
    useEffect(() => {
        const targettimeout = setTimeout(() => {
            setdatasend(false)
        }, 5000)
        return () => clearTimeout(targettimeout)
    }, [datasend]);
    return (
        <>
            <ExistAlert.Provider
                value={{existalert, setexistalert, datasend, setdatasend, monthvide, setMonthvide, allMonths}}>
                <Alreadyexist/>
                <Datasend/>
                <Monthempty/>
            </ExistAlert.Provider>

            <Navbar logindesplay={false}/>
            <div className={'max-w-4xl m-auto h-full '}>
                <div className={'grid place-items-center place mt-10'}>
                    <form
                        onSubmit={(e) => handlerSubmit(e)}
                        className={'grid grid-rows-8 grid-cols-4 h-full gap-3 bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300 w-9/12 '}
                        style={{gridTemplateRows: '60px 60px 60px 1fr'}}
                    >
                        <p className={'capitalize text-xl font-bold py-2 text-primary col-span-2 '}>entrer
                            les
                            donnes </p>

                        <div className={'row-start-5 col-start-1 col-span-2'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> consomation</p>
                            <input
                                required
                                onChange={(e) => handlerChange(e)}
                                name={'MNT_CONS'}
                                type={'number'}
                                style={{fontSize: '12px'}}
                                step="0.1"
                                min="1"
                                max="2000000"
                                className={'text-primary w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-all duration-500 font-bold '}
                            />
                        </div>

                        <div className={'row-start-2 col-start-3 col-span-2'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> Produit </p>
                            <select
                                ref={prdouitref}
                                required
                                onChange={(e) => handlerChange(e)}
                                name={'ID_P'}
                                style={{fontSize: '12px'}}
                                className={'text-primary w-full h-8 font-bold capitalize outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-all duration-500 '}
                            >
                                <option value="" hidden={true}></option>
                                {produits.map((produit: any) => (
                                    <option key={produit.ID_P} value={parseInt(produit.ID_P)}>
                                        {produit.PRODUIT}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={'row-start-2 col-span-2 '}>
                            <p className={'font-bold tracking-widest row-start-5 mb-2 capitalize'}
                               style={{fontSize: '13px'}}> operateur </p>
                            <select
                                required
                                onChange={(e) => handlerChange(e)}
                                name={'ID_O'}
                                style={{fontSize: '12px'}}
                                className={'text-primary w-full h-8 font-bold capitalize outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-all duration-500 '}
                            >
                                <option value="" hidden={true}></option>
                                {operateurs.map((operateur: any) => (
                                    <option key={operateur.ID_O} value={parseInt(operateur.ID_O)}>
                                        <p>{operateur.OPERATEUR}</p>
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={'row-start-3 col-start-1'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> annee </p>
                            <select
                                ref={anneeref}
                                required
                                onChange={(e) => handlerChange(e)}
                                name={'ANNEE'}
                                style={{fontSize: '12px'}}
                                className={'text-primary w-full h-8 capitalize font-bold outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-all duration-500'}
                            >
                                <option value="" hidden={true}></option>
                                {annees.map((annee) => (
                                    <option key={annee} value={parseInt(annee)} onClick={(e) => {
                                        selectedanne(e)
                                    }}>
                                        {annee}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={'row-start-3 col-start-2 '}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> mois </p>
                            <select
                                required
                                onChange={(e) => handlerChange(e)}
                                name={'ID_M'}
                                ref={monthref}
                                style={{fontSize: '12px'}}
                                className={'text-primary w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-all duration-500 '}
                            >
                                <option value="" hidden={true}></option>
                                {(allMonths.length > 0) ? allMonths.map((month: string) => (
                                    <option className={'flex gap-3'} key={month.ID_M} value={parseInt(month.ID_M)}>
                                        {month.MOIS}
                                    </option>
                                )) : ''
                                }
                            </select>
                        </div>
                        <div className={'row-start-3 col-start-3 col-span-2'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> Trimestre </p>
                            <input
                                type={'text'}
                                disabled={true}
                                style={{fontSize: '12px'}}
                                value={tri ? tri : ''}
                                className={'text-primary bg-bluewhite text-white font-bold w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent cursor-not-allowed'}
                            />
                        </div>

                        <div className={'row-start-4 col-start-1 col-span-2'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> debut_periode </p>
                            <input
                                required
                                pattern={'^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\\d{4}$'}
                                onChange={(e) => handlerChange(e)}
                                type={'text'}
                                placeholder={'DD/MM/YYYY'}
                                name={'debut_periode'}
                                style={{fontSize: '12px'}}
                                className={'text-primary font-bold w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-all duration-500 '}
                            />
                        </div>

                        <div className={'row-start-4 col-start-3 col-span-2'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> fin_periode </p>
                            <input
                                required
                                pattern={'^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\\d{4}$'}
                                placeholder={'DD/MM/YYYY'}
                                onChange={(e) => handlerChange(e)}
                                type={'text'}
                                name={'fin_periode'}
                                style={{fontSize: '12px'}}
                                className={'text-primary font-bold w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-all duration-500 '}
                            />
                        </div>
                        <div className={'row-start-5 col-start-3'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> Departement </p>
                            <input
                                type={'text'}
                                disabled={true}
                                style={{fontSize: '12px'}}
                                value={userDepartment}
                                className={'text-primary bg-bluewhite text-white font-bold w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent cursor-not-allowed'}
                            />
                        </div>
                        <div className={'row-start-5 col-start-4'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> Region </p>
                            <input
                                type={'text'}
                                disabled={true}
                                style={{fontSize: '12px'}}
                                value={userRegion}
                                className={'text-primary bg-bluewhite text-white font-bold w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent cursor-not-allowed'}
                            />
                        </div>
                        <div className={'row-start-1 col-start-4 col-span-1'}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}></p>
                            <input
                                type={'text'}
                                disabled={true}
                                style={{fontSize: '12px'}}
                                value={dayjs().format('YYYY-MM-DD')}
                                className={'text-primary w-full bg-secend text-center text-primary font-bold h-8 capitalize outline-0 caret-primary rounded border border-transparent cursor-not-allowed'}
                            />
                        </div>
                        <div className={'row-start-6 col-start-1 col-span-4 '}>
                            <p className={'font-bold tracking-widest mb-2 capitalize'}
                               style={{fontSize: '13px'}}> observation </p>
                            <textarea
                                style={{minHeight: '100px', maxHeight: '100px', fontSize: '12px'}}
                                maxLength="200"
                                onChange={(e) => handlerChange(e)}
                                name={'OBSERVATION'}
                                className={'text-primary pt-1 w-full h-8 capitalize outline-0 pl-3 caret-primary rounded border border-transparent hover:border-primary transition-border-primary duration-100 p-1 '}
                            />
                        </div>

                        <button
                            type={'submit'}
                            className={'row-start-7 col-span-4 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide '}
                        >
                            envoyer
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;

