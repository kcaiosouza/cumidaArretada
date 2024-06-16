export default function Ranking() {
    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cumida Arretada</span>
                    </a>
                </div>
            </nav>

            <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-24">
                <div className="bg-gray-100 py-2 px-4">
                    <h2 className="text-xl font-semibold text-gray-800">Top Restaurantes</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                    <li className="flex items-center py-4 px-6">
                        <span className="text-gray-700 text-lg font-medium mr-4">1.</span>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-800">Emily Jones</h3>
                                <p className="text-gray-600 text-base">1234 points</p>
                            </div>
                    </li>
                    <li className="flex items-center py-4 px-6">
                        <span className="text-gray-700 text-lg font-medium mr-4">1.</span>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-800">Emily Jones</h3>
                                <p className="text-gray-600 text-base">1234 points</p>
                            </div>
                    </li>
                    <li className="flex items-center py-4 px-6">
                        <span className="text-gray-700 text-lg font-medium mr-4">1.</span>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-800">Emily Jones</h3>
                                <p className="text-gray-600 text-base">1234 points</p>
                            </div>
                    </li>
                    <li className="flex items-center py-4 px-6">
                        <span className="text-gray-700 text-lg font-medium mr-4">1.</span>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-800">Emily Jones</h3>
                                <p className="text-gray-600 text-base">1234 points</p>
                            </div>
                    </li>
                </ul>
            </div>
        </>
    )
}