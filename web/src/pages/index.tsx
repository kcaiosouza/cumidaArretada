import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import { parseCookies, setCookie } from "nookies";
import { useForm } from 'react-hook-form';
import ReactInputMask from "react-input-mask";

export default function MyPage() {
    const {register, handleSubmit} = useForm();
  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
    <a className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
        <span>Cumida Arretada</span>  
    </a>
    <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(async (data) => {
            await api.post("/restaurant/login", data).then((result) => {
                if(result.data.success == true){
                    setCookie(undefined, "CumidaArretada.AuthToken", result.data.user.id, {
                        maxAge: 60 * 60 * 24 * 30, // 30 dias
                    })

                    location.href = "/dashboard"
                }
            })
        })}>
            <div>
                <label htmlFor="cnpj" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CNPJ</label>
                <ReactInputMask {...register("cnpj")} mask="99.999.999/9999-99" maskChar="" type="text" name="cnpj" id="cnpj" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="00.000.000/0000-00" required/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                <input {...register("password")} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required/>
            </div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:focus:ring-orange-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                </div>
                <div className="ml-3 text-sm">
                <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Remember me</label>
                </div>
            </div>
            <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 sm:w-auto dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Entrar</button>
        </form>
    </div>
</div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "CumidaArretada.AuthToken" : authToken } = parseCookies(ctx);

    if(authToken) {
        return {
            redirect: {
                destination: '/dashboard',
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