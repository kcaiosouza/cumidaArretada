import Link from "next/link";

export default function MyPage() {
  return (
    <>
    <header className="fixed w-full">
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <Link href="#" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Cumida Arretada</span>
                </Link>
                <div className="flex items-center lg:order-2">
                    <Link href="/login" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Fazer Login</Link>
                </div>
            </div>
        </nav>
    </header>

    <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white mb-0">Cumida Arretada</h1>
                <span className="font-light text-[20px]">Powered by: Unifacisa</span>
                <p className="max-w-2xl mt-3 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Participe do Concurso Gastronômico "Cumida Arretada" e explore a riqueza dos sabores nordestinos! Esse evento celebra a culinária típica da região, reunindo chefs talentosos e amantes da boa comida. Venha saborear pratos incríveis, repletos de tradição e inovação, e vote no seu favorito. Não perca essa experiência gastronômica única!</p>
                <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <Link href="/ranking" className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Ver ranking
                    </Link> 
                </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            </div>                
        </div>
    </section>
    <section className="bg-white dark:bg-gray-900">
    </section>
    <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
            <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Vantagens de Participar do Cumida Arretada</h2>
                    <p className="mb-8 font-light lg:text-xl">Participe do "Cumida Arretada" e transforme sua paixão pela gastronomia em uma trajetória de sucesso!</p>
                    <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Melhore a reputação e visibilidade do seu estabelecimento.</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Inspire-se com novas técnicas e tendências culinárias.</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Descubra a riqueza e diversidade da culinária regional</span>
                        </li>
                    </ul>
                    <p className="mb-8 font-light lg:text-xl">Venha aprender, saborear e se encantar com pratos que contam histórias e celebram a cultura nordestina. Não perca essa oportunidade de enriquecer seu conhecimento gastronômico e vivenciar uma verdadeira festa dos sentidos!</p>
                </div>
            </div>
        </div>
      </section>
    <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
            <div className="text-center">
                <Link href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                    Cumida Arretada
                </Link>
                <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2024 Cumida Arretada™. Direitos Reservados!
                </span>
            </div>
        </div>
    </footer>
    </>
  );
}