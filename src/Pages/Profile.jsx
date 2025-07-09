import { Link, useOutletContext } from 'react-router'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Profile = () => {
    const user = useOutletContext()
    return (
        <section className="container px-1 sm:mx-auto sm:px-4">
            <div className="my-4">
                <Link to="/">
                    <span className="flex items-center text-xl font-medium text-slate-700">
                        <FaArrowLeftLong className="mr-2 inline text-sm" />{' '}
                        Welcome, {user.name}
                    </span>
                </Link>
            </div>
            <div className="bg-base-100 p-6 shadow-md">
                <div className="my-4 flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[50%] bg-gray-100">
                        <p className="text-2xl font-medium text-slate-700">
                            {user?.name
                                ?.split(' ')
                                .reduce((res, word) => (res += word[0]), '')}
                        </p>
                    </div>
                    <div>
                        <h1 className="font-medium text-slate-700">
                            {user?.name}
                        </h1>
                        <p className="text-sm text-slate-400">{user?.email}</p>
                    </div>
                </div>

                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <li>
                        <span className="text-slate-500">User ID</span>
                        <p className="user-data">{user.id}</p>
                    </li>
                    <li>
                        <span className="text-slate-500">Name</span>
                        <p className="user-data">{user.name}</p>
                    </li>
                    <li>
                        <span className="text-slate-500">Email ID</span>
                        <p className="user-data">{user.email}</p>
                    </li>
                    <li>
                        <span className="text-slate-500">Address</span>
                        <p className="user-data truncate">
                            {`${user?.address?.city} ${user?.address?.street} ${user?.address?.suite} ${user?.address?.zipcode}`}
                        </p>
                    </li>
                    <li>
                        <span className="text-slate-500">Phone</span>
                        <p className="user-data">{user.phone}</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Profile
