import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });
  

export default function AreadyVote() {
  return (
    <main className={`bg-white h-screen w-full ${poppins.className}`}>
        <div className="flex flex-col justify-between items-center h-full px-5 py-12 md:hidden">
            <div className="flex flex-col w-full justify-center items-center">
                <h1 className="font-bold text-[21px]">Você já avaliou esse restaurante</h1>
                <span className="font-light italic text-[16px] text-center">Você já realizou uma avaliação anteriormente nesse mesmo restaurante. Obrigado por utilizar o Cumida Arretada</span>
            </div>
            <div>
                <span className="text-[120px]">🤷‍♂️</span>
            </div>
            <span></span>
        </div>
    </main>
  );
}
