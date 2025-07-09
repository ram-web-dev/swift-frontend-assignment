import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router'
import logo from './images/logo.svg'

const RootLayout = () => {
    const [user, setUser] = useState({})
    const fetchUser = async () => {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        )
        const users = await response.json()
        setUser(users[0])
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div>
            <header className="bg-slate-800 py-4">
                <nav className="container flex items-center justify-between px-1 sm:mx-auto sm:px-4">
                    <Link to="/">
                        <img src={logo} alt="swift logo" />
                    </Link>

                    <Link className="flex items-center gap-2" to="/profile">
                        <div className="flex h-10 w-10 items-center justify-center rounded-4xl bg-white font-medium text-slate-600">
                            <p>
                                {user?.name
                                    ?.split(' ')
                                    .reduce(
                                        (res, word) => (res += word[0]),
                                        ''
                                    )}
                            </p>
                        </div>
                        <p className="text-white">{user?.name}</p>
                    </Link>
                </nav>
            </header>
            <main>
                <Outlet context={user} />
            </main>
        </div>
    )
}

export default RootLayout
