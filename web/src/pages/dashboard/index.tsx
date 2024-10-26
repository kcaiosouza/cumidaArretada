import { useRef } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next"
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { destroyCookie, parseCookies } from "nookies";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

interface Review {
    id: number;
    user_id: string;
    restaurant_id: string;
    rating: number;
    waiting_time: boolean;
    service: boolean;
    temperature: boolean;
    ingredient: boolean;
    flavor: boolean;
    presentation: boolean;
    inovation: boolean;
    created_at: string;
}

interface Summary {
    numberArretado: number;
    numberMassa: number;
    numberMarromeno: number;
    numberPeba: number;
    numberPaia: number;
    totalVotes: number;
    mediaVotes: number;
}

export default function Dashboard({infoPage}:any) {
    const { user } = useAuth();
    const qrCodeRef = useRef(null);

    const handleDownload = async () => {
        if (qrCodeRef.current === null) return;
    
        const dataUrl = await toPng(qrCodeRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `qrcode_${(user?.name)?.replaceAll(" ", "_")}.png`;
        link.click();
      };
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
                        <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">{(infoPage[0].totalVotes * 30).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                        <h3 className="text-base font-light text-gray-500 dark:text-gray-400">Valor médio de vendas</h3>
                    </div>
                    <div className="flex items-center justify-end flex-1 text-base font-medium text-green-500 dark:text-green-400">
                        0%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"></path>
                        </svg>
                    </div>
                    </div>
                    <div id="main-chart"></div>
                </div>
                
                </div>
                <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="w-full">
                    <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">Número de Avaliações</h3>
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{infoPage[0].totalVotes}</span>
                    <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                        <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                        </svg>
                        0% 
                        </span>
                        Do último mês
                    </p>
                    </div>
                    <div className="w-full" id="new-products-chart"></div>
                </div>
                <div className="items-center flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="flex w-full items-start justify-start">
                        <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">Seu QRCode</h3>
                    </div>
                    <div className="w-full justify-center flex" ref={qrCodeRef}>
                    { user?.id ? 
                    <QRCode
                        size={256}
                        style={{ height: "180px", maxWidth: "auto", width: "auto" }}
                        value={`https://cumidaarretada.vercel.app/vote/${user.id}`}
                        viewBox={`0 0 183 183`}
                    />
                    : "" }
                    </div>
                    <div className="w-full" id="new-products-chart">
                        <button onClick={handleDownload} className="w-full mt-8 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Download</button>
                    </div>
                </div>
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="w-full">
                    <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">Avaliação média</h3>
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{infoPage[0].mediaVotes ? (infoPage[0].mediaVotes).toFixed(2) : "0"}</span>
                    <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                        <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                        </svg>
                        0% 
                        </span>
                        Do último mês
                    </p>
                    </div>
                    <div className="w-full" id="week-signups-chart"></div>
                </div>
                </div>
                <div className="p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="w-full">
                    <h3 className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Votos por nota</h3>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">😍 {infoPage[0].numberArretado}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: `${(infoPage[0].numberArretado * 100)/infoPage[0].totalVotes}%`}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">🙂 {infoPage[0].numberMassa}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: `${(infoPage[0].numberMassa * 100)/infoPage[0].totalVotes}%`}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">😐 {infoPage[0].numberMarromeno}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: `${(infoPage[0].numberMarromeno * 100)/infoPage[0].totalVotes}%`}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">🙁 {infoPage[0].numberPeba}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: `${(infoPage[0].numberPeba * 100)/infoPage[0].totalVotes}%`}}></div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-16 text-sm font-medium dark:text-white">😡 {infoPage[0].numberPaia}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style={{width: `${(infoPage[0].numberPaia * 100)/infoPage[0].totalVotes}%`}}></div>
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

    const {data : votesUser}:any = await api.get(`/votes/${authToken}`)

    function summarizeReviews(reviews: Review[]): Summary[] {
        const summary: Summary = {
            numberArretado: 0,
            numberMassa: 0,
            numberMarromeno: 0,
            numberPeba: 0,
            numberPaia: 0,
            totalVotes: 0,
            mediaVotes: 0
        };
    
        reviews.forEach(review => {
            switch (review.rating) {
                case 5:
                    summary.numberArretado += 1;
                    break;
                case 4:
                    summary.numberMassa += 1;
                    break;
                case 3:
                    summary.numberMarromeno += 1;
                    break;
                case 2:
                    summary.numberPeba += 1;
                    break;
                case 1:
                    summary.numberPaia += 1;
                    break;
            }
            summary.totalVotes += 1;
            summary.mediaVotes += review.rating;
        });
    
        summary.mediaVotes = summary.mediaVotes / summary.totalVotes;
    
        return [summary];
    }
    
    const result = summarizeReviews(votesUser);

    return {
      props: {
        infoPage: result
      }
    }
  }