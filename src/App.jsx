import { Route, Routes } from 'react-router'
import Dashboard from './Pages/Dashboard'
import RootLayout from './RootLayout'
import Profile from './Pages/Profile'

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default App
