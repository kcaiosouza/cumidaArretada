import RatingStart from "@/components/svgStartVote";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import { Poppins } from 'next/font/google';
import Link from "next/link";
import { useRef } from 'react';


interface VotePageProps {
    slug: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });
  

export default function Vote({slug}:any) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = () => {
        if (formRef.current) {
          formRef.current.submit();
        }
      };
  return (
    <main className={`bg-white h-screen w-full ${poppins.className}`}>
        <div className="flex flex-col justify-between items-center h-full pt-20 px-5 pb-12 md:hidden">
            <form ref={formRef} action="./identify" method="GET" className="flex flex-[3] flex-col justify-between">
            <div>

                <div>
                    <h1 className="font-bold text-[20px]">Experiência geral:</h1>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="paia" className="flex flex-col justify-center items-center">
                                <span className="text-[35px]">😡</span>
                                <span className="leading-[20px]">Paia</span>
                            </label>
                            <input required name="vote" id="paia" type="radio" value={1}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="peba" className="flex flex-col justify-center items-center">
                                <span className="text-[35px]">🙁</span>
                                <span className="leading-[20px]">Peba</span>
                            </label>
                            <input required name="vote" id="peba" type="radio" value={2}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="marromeno" className="flex flex-col justify-center items-center">
                                <span className="text-[35px]">😐</span>
                                <span className="leading-[20px]">Marromeno</span>
                            </label>
                            <input required name="vote" id="marromeno" type="radio" value={3}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="massa" className="flex flex-col justify-center items-center">
                                <span className="text-[35px]">🙂</span>
                                <span className="leading-[20px]">Massa</span>
                            </label>
                            <input required name="vote" id="massa" type="radio" value={4}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="arretado" className="flex flex-col justify-center items-center">
                                <span className="text-[35px]">😍</span>
                                <span className="leading-[20px]">Arretado</span>
                            </label>
                            <input required name="vote" id="arretado" type="radio" value={5}/>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <h2 className="font-semibold text-[18px] my-2">O que tu gostou?</h2>
                    <div className="flex justify-between w-full mb-1">
                        <label htmlFor="tempoEspera">Tempo de espera</label>
                        <input type="checkbox" id="tempoEspera" name="tempoEspera"/>
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
            </div>
                <div className="bg-[#FF7F63] w-full h-12 rounded-full text-white font-semibold text-[15px] flex justify-center items-center">
                    <input value="Enviar avaliação" type="submit" />
                </div>
            </form>
        </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<VotePageProps> = async (context) => {
    const { slug } = context.params as { slug: string; };

    const { data: restaurantInfo } = await api.get(`/restaurant/${slug}`)
  
    return {
      props: {
        slug,
        restaurantInfo: restaurantInfo.restaurant
      },
    };
  }