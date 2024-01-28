import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";

const Ajouteanne: React.FC = () => {
    const [yearToAdd, setYearToAdd] = useState("");
    const [annees, setAnnees] = useState<number[]>([]);


    const handleAddYear = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/addOrUpdateYear', {newYear: yearToAdd});
            console.log('Année ajoutée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'année :', error);
        }
    };
    useEffect(() => {
        axios.get('http://localhost:3000/getAnnees')
            .then(response => {
                setAnnees(response.data);
                console.log(annees)
            })
            .catch(error => console.error('Error fetching annees:', error));
    }, []);
    return (
        <div className={'flex items-center gap-10'}>
            <form
                onSubmit={handleAddYear}
                className={
                    'w-full h-full col-start-2 row-start-1 row-span-2 bg-blackwhite text-white px-4 py-2 rounded-xl hover:shadow transition-all duration-300 '
                }
            >
                <div className={'mt-4'}>
                    <p
                        className={'mb-2 font-thin  tracking-widest capitalize'}
                    >
                        Ajouter une année
                    </p>
                    <input
                        type="number"
                        value={yearToAdd}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setYearToAdd(e.target.value)}
                        className={
                            'w-full h-10 text-black rounded mt-2 outline-0 pl-3 caret-primary border border-transparent hover:border-primary transition-all duration-500 '
                        }
                    />
                    <button
                        type="submit"
                        className={
                            'mt-2 mb-2 text-center w-full py-1 text-bluewhite border-bluewhite border-2 rounded capitalize hover:text-white hover:bg-bluewhite transition-all duration-500 font-medium tracking-wide '
                        }
                    >
                        Ajouter une année
                    </button>
                </div>
            </form>
            <div
                className={'mt-10 font-thin w-full text-white col-start-2 row-start-1 row-span-2 m-auto bg-blackwhite px-4 py-4 rounded-xl hover:shadow transition-all duration-300 '}>
                <p className={'mt-2 mb-6 capitalize tracking-widest'}>
                    listes des années :
                </p>
                <div className={'mt-2 p-4 rounded flex justify-between gap-2 flex-wrap'}>
                    {
                        annees.length && annees.map((item) => {
                            return <p
                                className={'text-center text-black w-48 bg-white border-2 border-bluewhite p-2 rounded mb-2'}>{item}</p>
                        })
                    }

                </div>
            </div>
        </div>

    );
};

export default Ajouteanne;
