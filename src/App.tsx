import {createContext, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/login";
import Form from "./pages/user/form/form";
import Ajouteanne from "./pages/admin/ajouteanne.tsx";
import Notfound from "./pages/user/notfound/notfound";
import Protectedfrom from "./protectedroutes/protectedform";
import AjouteDepartement from "./pages/admin/ajoutedepartement.tsx";
import Ajouteregion from "./pages/admin/ajouteregion.tsx";
import AjouteOperateur from "./pages/admin/Ajouteoperateur.tsx";
import Ajouteproduit from "./pages/admin/ajouteproduit.tsx";
import Ajoutedataconsom from "./pages/admin/ajoutedataconsom.tsx";
import Ajouteuser from "./pages/admin/ajouteuser.tsx";
import Table from "./pages/user/usertable/table.tsx";
import Chart from "./pages/user/userChart/chart.tsx";
import Protectedcharts from "./protectedroutes/protectedcharts.tsx";
import Protectedtable from "./protectedroutes/protectedtable.tsx";
import Dashboard from "./pages/admin/dashboard/dashboard.tsx";
import ConsomationTable from "./pages/admin/consomationTable.tsx";
import ConsomationChart from "./pages/admin/consomationChart.tsx";
import DoawlandExcel from "./pages/admin/doawlandExcel.tsx";
import Protectedadmin from "./protectedroutes/protectedadmin.tsx";


export const userContext = createContext({});

const localuser = localStorage.getItem('user')

function App() {
    const [user, setUser] = useState(JSON.parse(localuser) || {});
    const [merciacces, setmerciacces] = useState(false)
    const contextuserValues = {
        user,
        setUser,
        merciacces,
        setmerciacces
    };

    const [data, setData] = useState({});

    return (
        <>
            <userContext.Provider value={contextuserValues}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Login/>}/>
                        <Route
                            path={"/formulaire"}
                            element={
                                <Protectedfrom>
                                    <Form Data={data} setData={setData}/>
                                </Protectedfrom>
                            }
                        >
                        </Route>
                        <Route path={'Table'} element={
                            <Protectedtable>
                                <Table/>
                            </Protectedtable>}>
                        </Route>
                        <Route path={'chart'} element={
                            <Protectedcharts>
                                <Chart/>
                            </Protectedcharts>}>
                        </Route>
                        <Route path={'/Dashboard'} element={<Protectedadmin><Dashboard/></Protectedadmin>}>
                            <Route path={'annee'} element={<Ajouteanne/>}/>
                            <Route path={'operateur'} element={<AjouteOperateur/>}/>
                            <Route path={'departement'} element={<AjouteDepartement/>}/>
                            <Route path={'region'} element={<Ajouteregion/>}/>
                            <Route path={'produit'} element={<Ajouteproduit/>}/>
                            <Route path={'donnes de consommation'} element={<Ajoutedataconsom/>}/>
                            <Route index element={<Ajouteuser/>}/>
                            <Route path={'AdminTable'} element={<ConsomationTable/>}/>
                            <Route path={'AdminChart'} element={<ConsomationChart/>}/>
                            <Route path={'Excel'} element={<DoawlandExcel/>}/>
                        </Route>
                        <Route path={"*"} element={<Notfound/>}/>
                    </Routes>
                </BrowserRouter>
            </userContext.Provider>
        </>
    );
}

export default App;
