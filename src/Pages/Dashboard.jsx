import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'

const Dashboard = () => {
    const intialSortState = JSON.parse(localStorage.getItem('sortState')) || {
        postId: 0,
        name: 0,
        email: 0,
    }
    const intialPaginationState = JSON.parse(
        localStorage.getItem('paginationState')
    ) || {
        currentPage: 1,
        pageLimit: 10,
    }
    const intialSearchInput =
        JSON.parse(localStorage.getItem('searchInput')) || ''
    const [comments, setComments] = useState([])
    const [sortState, setSortState] = useState(intialSortState)
    const [paginationState, setPaginationState] = useState(
        intialPaginationState
    )
    const [searchInput, setSearchInput] = useState(intialSearchInput)

    const { currentPage, pageLimit } = paginationState

    const sortAndFilterComments = () => {
        const result = [...comments]
        for (let key in sortState) {
            if (sortState[key] > 0) {
                if (key === 'postId') {
                    if (sortState[key] === 1) {
                        result.sort((a, b) => a.postId - b.postId)
                    } else if (sortState[key] === 2) {
                        result.sort((a, b) => b.postId - a.postId)
                    }
                } else {
                    if (sortState[key] === 1) {
                        result.sort((a, b) => a[key].localeCompare(b[key]))
                    } else if (sortState[key] === 2) {
                        result.sort((a, b) => b[key].localeCompare(a[key]))
                    }
                }
            }
        }
        if (searchInput) {
            return result.filter(
                (ele) =>
                    ele.name.includes(searchInput) ||
                    ele.email.includes(searchInput) ||
                    ele.body.includes(searchInput)
            )
        }
        return result
    }

    const sortedAndFilterdComments = sortAndFilterComments()

    const start = (currentPage - 1) * pageLimit

    const end = start + pageLimit
    const maxPages = Math.ceil(sortedAndFilterdComments.length / pageLimit)

    const fetchComments = async () => {
        const apiURL = 'https://jsonplaceholder.typicode.com/comments'
        const response = await fetch(apiURL)
        const comments = await response.json()
        setComments(comments)
    }
    useEffect(() => {
        fetchComments()
    }, [])

    const handleSortClick = (e) => {
        const key = e.currentTarget.name
        setSortState((prevState) => {
            const newState = {
                name: 0,
                email: 0,
                postId: 0,
                [key]: (prevState[key] + 1) % 3,
            }
            localStorage.setItem('sortState', JSON.stringify(newState))
            return newState
        })
    }
    const handleLeftPageClick = () => {
        setPaginationState((prevState) => {
            const prevPage = prevState.currentPage
            const newState = {
                ...prevState,
                currentPage: prevPage > 1 ? prevPage - 1 : 1,
            }
            localStorage.setItem('paginationState', JSON.stringify(newState))
            return newState
        })
    }
    const handleRightPageClick = () => {
        setPaginationState((prevState) => {
            const prevPage = prevState.currentPage
            const newState = {
                ...prevState,
                currentPage: prevPage < maxPages ? prevPage + 1 : maxPages,
            }
            localStorage.setItem('paginationState', JSON.stringify(newState))
            return newState
        })
    }
    const handlePageLimitChange = (e) => {
        const newState = {
            currentPage: 1,
            pageLimit: parseInt(e.target.value),
        }
        setPaginationState(newState)
        localStorage.setItem('paginationState', JSON.stringify(newState))
    }
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value)

        setPaginationState((prevState) => {
            const newState = {
                ...prevState,
                currentPage: 1,
            }

            localStorage.setItem('paginationState', JSON.stringify(newState))
            return newState
        })
        localStorage.setItem('searchInput', JSON.stringify(e.target.value))
    }

    const renderPages = () => {
        if (currentPage % 2 !== 0) {
            if (currentPage === maxPages) {
                return (
                    <>
                        <div className="border-1 border-black px-2">
                            {currentPage}
                        </div>
                        <div className="px-2">-</div>
                    </>
                )
            } else {
                return (
                    <>
                        <div className="border-1 border-black px-2">
                            {currentPage}
                        </div>
                        <div className="px-2">{currentPage + 1}</div>
                    </>
                )
            }
        }
        return (
            <>
                <div className="px-2">{currentPage - 1}</div>{' '}
                <div className="border-1 border-black px-2">{currentPage}</div>
            </>
        )
    }

    return (
        <section className="container px-1 sm:mx-auto sm:px-4">
            <div className="my-4 flex w-full items-center gap-4 rounded-md px-4 py-2 shadow-sm sm:ml-auto sm:max-w-sm">
                <FaSearch className="text-lg text-gray-300" />
                <input
                    className="w-full text-gray-600 outline-none"
                    type="search"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    placeholder="Search name, email, comment"
                />
            </div>
            <div className="mb-4">
                <button
                    type="button"
                    name="postId"
                    onClick={handleSortClick}
                    className="sort-btn"
                >
                    <span>Sort Post ID</span>
                    <span className="ml-2 inline-flex flex-col">
                        <span
                            className={`text-[10px] ${sortState.postId === 1 ? 'text-slate-800' : 'text-slate-400'}`}
                        >
                            <IoIosArrowUp />
                        </span>
                        <span
                            className={`text-[10px] ${sortState.postId === 2 ? 'text-slate-800' : 'text-slate-400'}`}
                        >
                            <IoIosArrowDown />
                        </span>
                    </span>
                </button>
                <button
                    type="button"
                    name="name"
                    onClick={handleSortClick}
                    className="sort-btn mx-2"
                >
                    <span>Sort Name</span>
                    <span className="ml-2 inline-flex flex-col">
                        <span
                            className={`text-[10px] ${sortState.name === 1 ? 'text-slate-800' : 'text-slate-400'}`}
                        >
                            <IoIosArrowUp />
                        </span>
                        <span
                            className={`text-[10px] ${sortState.name === 2 ? 'text-slate-800' : 'text-slate-400'}`}
                        >
                            <IoIosArrowDown />
                        </span>
                    </span>
                </button>
                <button
                    type="button"
                    name="email"
                    onClick={handleSortClick}
                    className="sort-btn"
                >
                    <span>Sort Email</span>{' '}
                    <span className="ml-2 inline-flex flex-col">
                        <span
                            className={`text-[10px] ${sortState.email === 1 ? 'text-slate-800' : 'text-slate-400'}`}
                        >
                            <IoIosArrowUp />
                        </span>
                        <span
                            className={`text-[10px] ${sortState.email === 2 ? 'text-slate-800' : 'text-slate-400'}`}
                        >
                            <IoIosArrowDown />
                        </span>
                    </span>
                </button>
            </div>

            <table className="w-full table-fixed rounded text-left text-slate-700 shadow-sm">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="px-6 py-4 text-nowrap">Post ID</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="truncate px-6 py-4">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAndFilterdComments
                        .slice(start, end)
                        .map((comment) => (
                            <tr
                                key={comment.id}
                                className="border-b border-gray-200 bg-white"
                            >
                                <td className="px-6 py-4 font-medium text-nowrap text-gray-900">
                                    {comment.postId}
                                </td>
                                <td className="truncate px-6 py-4 font-medium text-nowrap text-gray-900">
                                    {comment.name}
                                </td>
                                <td className="truncate px-6 py-4 font-medium text-nowrap text-gray-900">
                                    {comment.email}
                                </td>
                                <td className="truncate px-6 py-4 font-medium text-nowrap text-gray-900">
                                    {comment.body}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="mx-auto my-4 flex w-fit items-center gap-4 text-sm font-semibold text-slate-600 sm:mx-0 sm:ml-auto">
                <p>
                    {start + 1}-{end} of {sortedAndFilterdComments.length}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        className="text-xl hover:bg-gray-100 disabled:opacity-30"
                        disabled={currentPage <= 1}
                        type="button"
                        onClick={handleLeftPageClick}
                    >
                        <MdOutlineKeyboardArrowLeft />
                    </button>
                    {renderPages()}
                    <button
                        type="button"
                        className="text-xl hover:bg-gray-100 disabled:opacity-30"
                        disabled={currentPage >= maxPages}
                        onClick={handleRightPageClick}
                    >
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>
                <select
                    className="rounded border-1 border-gray-200 p-1 shadow-sm"
                    name="limit"
                    value={paginationState.pageLimit}
                    onChange={handlePageLimitChange}
                >
                    <option value={10}>10 / Page</option>
                    <option value={50}>50 / Page</option>
                    <option value={100}>100 / Page</option>
                </select>
            </div>
        </section>
    )
}

export default Dashboard
