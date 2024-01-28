import React, {SyntheticEvent, useContext, useState} from 'react';
import axios from 'axios';
import {FaLinkedin, FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter, FaSquareYoutube} from 'react-icons/fa6';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../../App.tsx";
import Navbar from '../../components/navbar.tsx';
import TimeDate from "../../components/timeanddate.tsx";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const contextvalue = useContext(userContext)
    const {setUser} = contextvalue

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            const token = response.data.token;
            const userLogin = response.data.user;

            if (token && userLogin.isAdmin) {
                localStorage.setItem('token', token);
                setUser(userLogin);
                localStorage.setItem('user', JSON.stringify(userLogin))
                console.log('Token set:', token);
                navigate('/Dashboard')

            } else if (token && userLogin.active_statue) {
                localStorage.setItem('token', token);
                setUser(userLogin);
                localStorage.setItem('user', JSON.stringify(userLogin))
                console.log('Token set:', token);
                navigate('/formulaire');
            } else if (!token) {
                localStorage.clear()
                location.reload()
                console.error('Token not received in the response:', response);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            <Navbar logindesplay={false}/>
            <div
                style={{maxWidth: '1000px'}}
                className={
                    'grid grid-cols-2 grid-rows-2 px-10 mt-16 gap-6 m-auto h-full items-center'
                }
            >

                <div className={'row-start-1 col-start-1 row-span-2'}>
                    <div className={'flex items-center'}>
                        <div
                            className={
                                'bg-ministiere bg-contain w-9/12 h-28 bg-no-repeat'
                            }
                        >
                        </div>
                    </div>
                    <div className={'flex gap-2 text-gray-500 mb-10'}>
                        <a
                            className={
                                ' transition-all hover:-mt-1 hover:text-blue-600 shadow-2xl'
                            }
                            href={'https://www.facebook.com/miciengov?_rdc=1&_rdr'}
                        >
                            <FaSquareFacebook/>
                        </a>
                        <a
                            className={
                                ' transition-all hover:-mt-1 hover:text-blue-800'
                            }
                            href={'https://www.linkedin.com/company/miicen/'}
                        >
                            <FaLinkedin/>
                        </a>
                        <a
                            className={
                                ' transition-all hover:-mt-1 hover:text-red-600'
                            }
                            href={'https://www.youtube.com/c/IndustrieMaroc'}
                        >
                            <FaSquareYoutube/>
                        </a>
                        <a
                            className={
                                ' transition-all hover:-mt-1 hover:text-black'
                            }
                            href={'https://twitter.com/mcinetgov_ma'}
                        >
                            <FaSquareXTwitter/>
                        </a>
                        <a
                            className={
                                ' transition-all hover:-mt-1 hover:text-rose-400'
                            }
                            href={'https://www.instagram.com/mcinet.gov.ma/'}
                        >
                            <FaSquareInstagram/>
                        </a>
                    </div>
                    <TimeDate/>
                </div>
                <form
                    onSubmit={(e) => handleLogin(e)}
                    className={
                        'col-start-2 row-start-1 row-span-2 w-9/12 m-auto bg-secend px-4 py-2 rounded-xl hover:shadow transition-all duration-300 '
                    }
                >
                    <p
                        className={
                            'capitalize text-xl font-bold py-8 text-primary tracking-wider text-center '
                        }
                    >
                        Authentification
                    </p>
                    <hr className={'bg-black'}/>
                    <div className={'mt-4'}>
                        <p
                            className={
                                'mb-2 font-bold tracking-widest '
                            }
                            style={{fontSize: '13px'}}
                        >
                            Email :
                        </p>
                        <input
                            className={
                                'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500 '
                            }
                            required
                            type={'email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={'mt-4'}>
                        <p
                            className={
                                'mb-2 font-bold tracking-widest '
                            }
                            style={{fontSize: '13px'}}
                        >
                            Mot de passe :
                        </p>
                        <input
                            className={
                                'w-full h-10 rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500 '
                            }
                            required
                            type={'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type={'submit'}
                        className={
                            'mt-6 mb-4 text-center w-full py-1 text-primary border-primary border-2 rounded capitalize hover:text-white hover:bg-primary transition-all duration-500 font-medium tracking-wide '
                        }
                    >
                        se connecter
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
