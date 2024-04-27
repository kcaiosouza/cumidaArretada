import RatingStart from "@/components/svgStartVote";
import { Poppins } from 'next/font/google';
import Link from "next/link";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });
  

export default function Identify() {
  return (
    <main className={`bg-white h-screen w-full ${poppins.className}`}>
        <div className="flex flex-col justify-between items-center h-full px-5 py-12 md:hidden">
            <div className="flex flex-col w-full justify-start items-start">
                <Link href="./" className="font-bold text-[17px]"> &lt; Voltar</Link>
            </div>
            <form>
                <div>
                    <h1 className="font-bold text-[20px]">Identificação:</h1>
                    <span className="font- text-[17px]">Para finalizar, informe suas credenciais</span>
                </div>
                <div className="pt-6">
                    <h2 className="font-semibold text-[18px] my-2">O que tu gostou?</h2>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="tempoEspera">Tempo de espera</label>
                        <input type="text"/>
                    </div>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="atendimento">Atendimento</label>
                        <input type="checkbox" id="atendimento" name="atendimento"/>
                    </div>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="temperaturaPrato">Temperatura do prato</label>
                        <input type="checkbox" id="temperaturaPrato" name="temperaturaPrato"/>
                    </div>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="ingredientes">Ingredientes</label>
                        <input type="checkbox" id="ingredientes" name="ingredientes"/>
                    </div>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="sabor">Sabor</label>
                        <input type="checkbox" id="sabor" name="sabor"/>
                    </div>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="apresentacao">Apresentação</label>
                        <input type="checkbox" id="apresentacao" name="apresentacao"/>
                    </div>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="inovacaoCriatividade">Inovação e Criatividade</label>
                        <input type="checkbox" id="inovacaoCriatividade" name="inovacaoCriatividade"/>
                    </div>
                </div>
            </form>
            <Link href="./indentify" className="bg-[#FF7F63] w-full h-12 rounded-full text-white font-semibold text-[15px] flex justify-center items-center">
                <span>
                    Enviar avaliação
                </span>
            </Link>
        </div>
    </main>
  );
}
