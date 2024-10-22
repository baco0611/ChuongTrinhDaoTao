import { createBrowserRouter, Navigate } from 'react-router-dom'
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
import EditProgramLayout from './components/EditProgramLayout/EditProgramLayout'
import UserManage from './views/LecturerManage/UserManage/UserManage'
import GraduationRequirement from './views/Dictionary/GraduationRequirement/GraduationRequirement'
import ConditionalCertification from './views/Dictionary/ConditionalCertification/ConditionalCertification'
import User from './views/User/User'
import InsertUser from './views/InsertUser/InsertUser'
import FieldManage from './views/FieldManage/FieldManage'

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
                path: '/program',
                element: <Navigate to={"/program/search"}/>
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
                path: '/program/field',
                element: <FieldManage/>
            },
            {
                path: "/view/program/:id",
                element: <ViewProgramLayout/>
            },
            {
                path: "/edit/program",
                element: <EditProgramLayout/>,
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
                path: "/user",
                element: <User/>
            },
            {
                path: "/user/authorization",
                element: <Authorization/>
            },
            {
                path: "/user/responsibility",
                element: <Responsibility/>
            },
            {
                path: '/user/manage',
                element: <UserManage/>
            },
            {
                path: '/dictionary/graduation',
                element: <GraduationRequirement/>
            },
            {
                path: '/dictionary/certification',
                element: <ConditionalCertification/>
            }
        ]
    },
    {
        path: '/user/insert',
        element: <InsertUser/>
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