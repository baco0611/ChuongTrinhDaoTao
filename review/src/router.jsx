import { createBrowserRouter } from 'react-router-dom'
import WebDefaultLayout from './components/WebDefaultLayout/WebDefaultLayout'
import Error from './components/Error/Error'
import Login from './views/Login/Login'
import SearchProgram from './views/EducationProgram/SearchProgram/SearchProgram'
import ManageProgram from './views/EducationProgram/ManageProgram/ManageProgram'
// import SectionA from './views/EditorSection/SectionA/SectionA'
// import SectionB from './views/EditorSection/SectionB/SectionB'
// import SectionC from './views/EditorSection/SectionC/SectionC'
// import SectionD from './views/EditorSection/SectionD/SectionD'
// import SectionE from './views/EditorSection/SectionE/SectionE'
// import SectionG from './views/EditorSection/SectionG/SectionG'
// import SectionH from './views/EditorSection/SectionH/SectionH'

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
                element: <SearchProgram/>
            },
            {
                path: '/program/manage',
                element: <ManageProgram/>
            },
            // {
            //     path: '/list',
            //     element: <ListSection/>
            // },
            // {
            //     path: '/edit/sectionA/:id',
            //     element: <SectionA/>
            // },
            // {
            //     path: '/edit/sectionB/:id',
            //     element: <SectionB/>
            // },
            // {
            //     path: '/edit/sectionC/:id',
            //     element: <SectionC/>
            // },
            // {
            //     path: '/edit/sectionD/:id',
            //     element: <SectionD/>
            // },
            // {
            //     path: '/edit/sectionE/:id',
            //     element: <SectionE/>
            // },
            // {
            //     path: '/edit/sectionG/:id',
            //     element: <SectionG/>
            // },
            // {
            //     path: '/edit/sectionH/:id',
            //     element: <SectionH/>
            // },
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