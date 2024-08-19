import { createBrowserRouter } from 'react-router-dom'
import WebDefaultLayout from './components/WebDefaultLayout/WebDefaultLayout'
import Error from './components/Error/Error'
import Login from './views/Login/Login'
import ViewProgramLayout from './components/ViewProgramLayout/ViewProgramLayout'
import SectionA from './views/EditorSection/SectionA/SectionA'
import SectionB from './views/EditorSection/SectionB/SectionB'
import SectionC from './views/EditorSection/SectionC/SectionC'
import SectionD from './views/EditorSection/SectionD/SectionD'
import SectionE from './views/EditorSection/SectionE/SectionE'
import SectionG from './views/EditorSection/SectionG/SectionG'
import SectionH from './views/EditorSection/SectionH/SectionH'
import Authorization from './views/LecturerManage/Authorization/Authorization'
import Responsibility from './views/LecturerManage/Responsibility/Responsibility'
import EducationManage from './views/EducationProgram/EducationMain/EducationManage'
import EducationSearch from './views/EducationProgram/EducationMain/EducationSearch'

const router = createBrowserRouter([
    {
        path: '/',
        element: <WebDefaultLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/program/search',
                element: <EducationSearch/>
            },
            {
                path: '/program/manage',
                element: <EducationManage/>
            },
            {
                path: "/view/program/:id",
                element: <ViewProgramLayout/>
            },
            {
                path: "/edit/program",
                children: [
                    {
                        path: "/edit/program/sectionA/:id",
                        element: <SectionA/>
                    },
                    {
                        path: "/edit/program/sectionB/:id",
                        element: <SectionB/>
                    },
                    {
                        path: "/edit/program/sectionC/:id",
                        element: <SectionC/>
                    },
                    {
                        path: "/edit/program/sectionD/:id",
                        element: <SectionD/>
                    },
                    {
                        path: "/edit/program/sectionE/:id",
                        element: <SectionE/>
                    },
                    {
                        path: "/edit/program/sectionG/:id",
                        element: <SectionG/>
                    },
                    {
                        path: "/edit/program/sectionH/:id",
                        element: <SectionH/>
                    },
                ]
            },
            {
                path: "/authorization",
                element: <Authorization/>
            },
            {
                path: "/responsibility",
                element: <Responsibility/>
            },
        ]
    },
    {
        path: '/error',
        element: <Error/>
    },
    {
        path: '*',
        element: <Error/>
    }
])

export default router