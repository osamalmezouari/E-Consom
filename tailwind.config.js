/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                "primary": '#0061ff',
                'blackwhite': '#0e1726',
                'gray': '#515365'
            },
            colors: {
                "primary": '#0061ff',
                'secend': '#f9fbfd',
                'orange': '#F59526',
                'whitecoffe': '#D7C9C1',
                'bluewhite': '#5BBCE3',
                'blackwhite': '#0e1726',
                //'black': '#0e1726',
                'gray': '#515365',
                //'graywhite': '#888ea8'
                'graywhite': '#f9fbfd'
            },
            backgroundImage: {
                'logo': "url(src/assets/images/water2.png)",
                'calandericon': "url(https://assets-global.website-files.com/61a6a6cae0915e1a66f08845/61a92c087181ad420ec0260d_icon-1-webinar-landingly-template.svg)",
                'watchicon': "url(https://assets-global.website-files.com/61a6a6cae0915e1a66f08845/61a92c0815ee217abbcfa09c_icon-2-webinar-landingly-template.svg)",
                'assest': "url(https://assets-global.website-files.com/61a6a6cae0915e1a66f08845/61a7bfb3cbad4f755b8818d3_bg-dots-landingly-template.svg)",
                'ministiere': 'url(https://www.mcinet.gov.ma/themes/custom/mcinet/assets/image/logo-mic-2022-fr.png)',
                'thanks': 'url(https://assets-global.website-files.com/61a6a6cae0915e1a66f08845/61ae4d79bab51c50e04b356e_image-thanks-page-landingly-template.svg)',
                'llogo': 'url(src/assets/images/logoo.png)',
                'profile': 'url(https://designreset.com/cork/html/src/assets/img/profile-30.png)'
            }
        },
    },
    plugins: [],
};

