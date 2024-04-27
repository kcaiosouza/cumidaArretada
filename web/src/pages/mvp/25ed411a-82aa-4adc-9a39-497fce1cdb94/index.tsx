import RatingStart from "@/components/svgStartVote";
import { Poppins } from 'next/font/google';
import Link from "next/link";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });
  

export default function Index() {
  return (
    <main className={`bg-white h-screen w-full ${poppins.className}`}>
        <div className={`hidden text-black md:flex`}>
            Avaliação de Restaurantes está disponível apenas para dispositivos móveis
        </div>
        <div className="flex flex-col justify-between items-center h-full px-5 py-12 md:hidden">
            <div className="flex flex-col w-full justify-start items-start">
                <h1 className="font-bold text-[21px]">Bem vindo ao<br/>Cumida Arretada.</h1>
                <span className="font-light italic text-[16px]">Avalie o que você achou do<br/>restaurante NOME DO RESTAURANTE.</span>
            </div>
            <div>
                <RatingStart/>
            </div>
            <Link href="./25ed411a-82aa-4adc-9a39-497fce1cdb94/vote" className="bg-[#FF7F63] w-full h-12 rounded-full text-white font-semibold text-[15px] flex justify-center items-center">
                <span>
                    Começar Avaliação
                </span>
            </Link>
        </div>
    </main>
  );
}