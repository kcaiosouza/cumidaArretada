import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });
  

export default function Success() {
  return (
    <main className={`bg-white h-screen w-full ${poppins.className}`}>
        <div className="flex flex-col justify-between items-center h-full px-5 py-12 md:hidden">
            <div className="flex flex-col w-full justify-center items-center">
                <h1 className="font-bold text-[21px]">Obrigado pela avaliação</h1>
                <span className="font-light italic text-[16px] text-center">Sua avaliação foi enviada para o restaurante, e ela será levada em consideração para melhorar o estabelecimento.</span>
            </div>
            <div>
                <span className="text-[120px]">🎉</span>
            </div>
            <span></span>
        </div>
    </main>
  );
}
