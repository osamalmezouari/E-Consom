import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactApexChart from 'react-apexcharts';

const ConsomationChart = () => {
    const [allConsomData, setAllConsomData] = useState([]);
    const [consomData, setConsomData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        PRODUIT: 'All',
        ANNEE: 'All',
    });
    const [productOptions, setProductOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [series, setSeries] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:3000/getProduits')
            .then(response => {
                setProductOptions(response.data);
            })
            .catch(error => console.error('Error fetching produits:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/getAnnees')
            .then(response => {
                setYearOptions(response.data);
            })
            .catch(error => console.error('Error fetching years:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/departements')
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching departements:', error);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:3000/getadminConsoomData/${selectedDepartment}`)
            .then((res) => {
                const resData = res.data;
                setAllConsomData(resData);
                setConsomData(resData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [selectedDepartment, filters.ANNEE]);

    const applyFilters = () => {
        setIsLoading(true);

        let apiUrl = `http://localhost:3000/getadminConsoomData/${selectedDepartment}`;

        const params = {
            annee: filters.ANNEE,
        };

        if (filters.PRODUIT && filters.PRODUIT !== 'All') {
            params.produit = filters.PRODUIT;
        }

        const queryParams = new URLSearchParams(params).toString();
        if (queryParams) {
            apiUrl += `?${queryParams}`;
        }

        axios.get(apiUrl)
            .then((res) => {
                const resData = res.data;
                setConsomData(resData);
                const newChartOptions = {
                    xaxis: {
                        categories: resData.map(item => item.MOIS),
                    },
                    yaxis: {
                        title: {
                            text: 'MNTCONS',
                        },
                    },
                };

                const newSeries = filters.PRODUIT === 'All'
                    ? productOptions.map(product => ({
                        name: product.PRODUIT,
                        data: resData
                            .filter(item => item.ID_P === product.ID_P)
                            .map(item => ({x: item.MOIS, y: Number(item.MNT_CONS)})),
                    }))
                    : [
                        {
                            name: filters.PRODUIT,
                            data: resData.map(item => ({x: item.MOIS, y: Number(item.MNT_CONS)})),
                        },
                    ];

                setChartOptions(newChartOptions);
                setSeries(newSeries);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    useEffect(() => {
        applyFilters();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center my-4">
                    <div className="mr-2">
                        <select
                            onChange={handleFilterChange}
                            name="PRODUIT"
                            value={filters.PRODUIT}
                            className="p-2 border rounded outline-none border-primary text-primary hover:text-white hover:bg-primary transition-all duration-500 ease-in"
                        >
                            <option value="All">tout les produits</option>
                            {productOptions.map(option => (
                                <option key={option.ID_P} value={option.PRODUIT}>{option.PRODUIT}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mr-2">
                        <select
                            onChange={handleFilterChange}
                            name="ANNEE"
                            value={filters.ANNEE}
                            className="p-2 border rounded outline-none border-primary text-primary hover:text-white hover:bg-primary transition-all duration-500 ease-in"
                        >
                            <option hidden={true}>choisir un annee</option>
                            {yearOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mr-2">
                        <select
                            onChange={handleDepartmentChange}
                            name="DEPARTMENT"
                            value={selectedDepartment}
                            className="p-2 border rounded outline-none border-primary text-primary hover:text-white hover:bg-primary transition-all duration-500 ease-in"
                        >
                            <option value="">Choose Department</option>
                            {departments.map(department => (
                                <option key={department.ID_D}
                                        value={department.ID_D}>{department.DEPARTEMENT}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-300 transition-all duration-500 ">Confirmer
                    </button>
                </div>
            </form>
            {isLoading ? (
                <div role="status">
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div style={{maxWidth: '1200px'}} className={'m-auto'}>
                    <ReactApexChart options={chartOptions} series={series} type="area" height={350}/>
                </div>
            )}
        </>
    );
};

export default ConsomationChart;
