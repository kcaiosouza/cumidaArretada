import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google';
import Link from "next/link";
import { GetServerSideProps } from "next";
import { api } from "@/services/api";
import ReactInputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

interface VotePageProps {
    slug: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });
  

export default function Identify({slug, restaurantInfo}: any) {
  const {register, handleSubmit} = useForm();
  const router = useRouter();
//   console.log(router.query)

  const formRef = useRef<HTMLFormElement>(null);

    const sendForm = () => {
        if (formRef.current) {
          formRef.current.submit();
        }
      };

  return (
    <main className={`bg-white h-screen w-full ${poppins.className}`}>
        <div className="flex flex-col justify-between items-center h-full px-5 py-12 md:hidden">
            <div className="flex flex-[1] flex-col w-full justify-start items-start">
                <Link className="font-bold text-[17px]" href={{
                        pathname: './vote',
                        query: { slug },
                      }}
                    > &lt; Voltar</Link>
            </div>
            <form className="flex flex-[3] flex-col justify-between" ref={formRef} onSubmit={handleSubmit((data) => {
                api.post(`/vote/${slug}`, {
                    userId: data.cpf,
                    rating: Number(router.query?.vote),
                    waitingTime: router.query.tempoEspera ? true : false,
                    service: router.query.atendimento ? true : false,
                    temperature: router.query.temperaturaPrato ? true : false,
                    ingredient: router.query.ingredientes ? true : false,
                    flavor: router.query.sabor ? true : false,
                    presentation: router.query.apresentacao ? true : false,
                    inovation: router.query.inovacaoCriatividade ? true : false,
                }).then((data) => {
                    if(data.data?.success == true){
                        router.push(`/vote/${slug}/success`)
                    }else{
                        router.push(`/vote/${slug}/areadyVote`)
                    }
                })
            })}>
                <div>
                <div>
                    <h1 className="font-bold text-[20px]">Identificação:</h1>
                    <span className="font- text-[17px]">Para finalizar, informe suas credenciais</span>
                </div>
                <div className="pt-6">
                    <div className="flex flex-col justify-between w-full mb-1">
                        <label htmlFor="tempoEspera">Nome:</label>
                        <input {...register("name", { required: true })} required className="border-2 rounded-md" type="text"/>
                    </div>
                    <div className="flex flex-col justify-between w-full mb-1">
                        <label htmlFor="tempoEspera">E-mail:</label>
                        <input {...register("email")} required className="border-2 rounded-md" type="email"/>
                    </div>
                    <div className="flex flex-col justify-between w-full mb-1">
                        <label htmlFor="tempoEspera">CPF:</label>
                        <ReactInputMask {...register("cpf")} mask={"999.999.999-99"} required maskChar="" minLength={14} className="border-2 rounded-md" type="text"/>
                    </div>
                </div>
                </div>
                <div className="bg-[#FF7F63] w-full h-12 rounded-full text-white font-semibold text-[15px] flex justify-center items-center">
                    <input type="submit" value="Me Identificar" />
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