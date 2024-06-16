import { useAuth } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next"
import { destroyCookie, parseCookies } from "nookies";

export default function Dashboard() {
    const { user } = useAuth();
    return(
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{user?.name}</span>
                    </span>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" onClick={() => {
                            destroyCookie(null, "CumidaArretada.AuthToken")
                            location.href = "/"
                        }} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Sair</button>
                    </div>
                </div>
            </nav>

            <div className="px-4 pt-24">
                <div className="grid gap-4 xl:grid-cols-1 2xl:grid-cols-1">
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                    <div className="flex-shrink-0">
                        <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">$45,385</span>
                        <h3 className="text-base font-light text-gray-500 dark:text-gray-400">Valor médio de vendas</h3>
                    </div>
                    <div className="flex items-center justify-end flex-1 text-base font-medium text-green-500 dark:text-green-400">
                        12.5%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    </div>
                    <div id="main-chart"></div>
                    
                    <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                    <div>
                        <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" type="button" data-dropdown-toggle="weekly-sales-dropdown">MAIS (EM BREVE) <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                        
                    </div>
                    <div className="flex-shrink-0">
                        <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-orange-700 sm:text-sm hover:bg-gray-100 dark:text-orange-500 dark:hover:bg-gray-700">
                        Detalhar (EM BREVE)
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                    </div>
                    </div>
                </div>
                
                </div>
                <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="w-full">
                    <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">Número de Avaliações</h3>
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">2,340</span>
                    <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                        <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                        </svg>
                        12.5% 
                        </span>
                        Do último mês
                    </p>
                    </div>
                    <div className="w-full" id="new-products-chart"></div>
                </div>
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="w-full">
                    <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">Avaliação média</h3>
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">2,340</span>
                    <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                        <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                        </svg>
                        3,4% 
                        </span>
                        Do último mês
                    </p>
                    </div>
                    <div className="w-full" id="week-signups-chart"></div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="w-full">
                    <h3 className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Votos por nota</h3>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">😍 98</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: "18%"}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">🙂 105</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: "15%"}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">😐 33</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: "60%"}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">🙁 25</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: "30%"}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">😡 15</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: "30%"}}></div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "CumidaArretada.AuthToken" : authToken } = parseCookies(ctx);

    if(!authToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
      props: {
        // variaveis aqui
      }
    }
  }