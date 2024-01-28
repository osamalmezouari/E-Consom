import React from 'react';
import ExcelJS from 'exceljs';

const DownloadExcel = () => {
    const toogle = () => {
        console.log('helloo')
    }
    const downloadExcel = async () => {
        console.log('Download button clicked');
        try {
            const tableData = [
                {
                    DElEGAT_CREDIT: '//',
                    DOTAION_DEFINITIVE: '//',
                    CONSOMAT: '66951',
                    '1 TRI': '15411,00',
                    '2 TRI': '15455,00',
                    '3 TRI': '14947,00',
                    '4 TRI': '//',
                    TOTAL_DPCI: '45813,00',
                    CAISE_REGION: '//',
                    OBSERVATION: 'lorem lorem ipsum lorem ipsum'
                },
            ];

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');

            const headers = Object.keys(tableData[0]);
            worksheet.addRow(headers);

            tableData.forEach(row => {
                const values = headers.map(header => row[header]);
                worksheet.addRow(values);
            });

            const blob = await workbook.xlsx.writeBuffer();
            const url = URL.createObjectURL(new Blob([blob], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tableData.xlsx');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error creating and downloading Excel file:', error);
        }
    };


    return (
        <>
            <div className="flex justify-center">
                <button
                    className="download-button transform active:scale-95 bg-blue-400 hover:bg-green-400 text-white px-16 py-6 rounded-lg font-bold tracking-widest w-4/12"
                    onClick={() => {
                        downloadExcel()
                        toogle()
                    }}
                >
                    <div className="flex justify-center items-center relative">
                        <div className="svg-container">
                            <svg className="download-icon" width="18" height="22" viewBox="0 0 18 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path className="download-arrow" d="M13 9L9 13M9 13L5 9M9 13V1" stroke="#F2F2F2"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
                                    stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className="download-loader text-white hidden"></div>
                            <svg className="check-svg hidden" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.1071 7.9071C15.4976 7.51658 15.4976 6.88341 15.1071 6.49289C14.7165 6.10237 14.0834 6.10237 13.6929 6.49289L8.68568 11.5001L7.10707 9.92146C6.71655 9.53094 6.08338 9.53094 5.69286 9.92146C5.30233 10.312 5.30233 10.9452 5.69286 11.3357L7.97857 13.6214C8.3691 14.0119 9.00226 14.0119 9.39279 13.6214L15.1071 7.9071Z"
                                      fill="white"/>
                            </svg>
                        </div>
                        <div className="button-copy pl-2 leading-none uppercase">TELECHARGER L'EXCEL</div>
                    </div>
                </button>
            </div>
            <table className={'mt-10 w-full'}>
                <thead>
                {/*headers here */}
                <tr className={'border-2'}>
                    <th scope="col" className="px-2 py-3 border-2">EAU</th>
                    <th scope="col" className="px-2 py-3 border-2">DElEGAT_CREDIT</th>
                    <th scope="col" className="px-2 py-3 border-2">DOTAION_DEFINITIVE</th>
                    <th scope="col" className="px-2 py-3 border-2">CONSOMAT</th>
                    {/*each tri is total of he is related month*/}
                    <th scope="col" className="px-2 py-3 border-2">1 TRI</th>
                    <th scope="col" className="px-2 py-3 border-2">2 TRI</th>
                    <th scope="col" className="px-2 py-3 border-2">3 TRI</th>
                    <th scope="col" className="px-2 py-3 border-2">4 TRI</th>
                    <th scope="col" className="px-2 py-3 border-2">TOTAL_DPCI</th>
                    <th scope="col" className="px-2 py-3 border-2">CAISE_REGION</th>
                    <th scope="col" className="px-2 py-3 border-2">OBSERVATION</th>
                </tr>
                </thead>
                <tbody>
                {/*departement of region here */}
                <tr className={'border-2 text-center'}>
                    <td className={'border-2 px-2'}>casa</td>
                    <td className={'border-2 px-2'}>//</td>
                    <td className={'border-2 px-2'}>//</td>
                    <td className={'border-2 px-2'}>66951</td>
                    <td className={'border-2 px-2'}>15411,00</td>
                    <td className={'border-2 px-2'}>15455,00</td>
                    <td className={'border-2 px-2'}>14947,00</td>
                    <td className={'border-2 px-2'}>//</td>
                    <td className={'border-2 px-2'}>45813,00</td>
                    <td className={'border-2 px-2'}>//</td>
                    <td className={'border-2 px-2'}>lorem lorem ipsum lorem ipsum</td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default DownloadExcel;



