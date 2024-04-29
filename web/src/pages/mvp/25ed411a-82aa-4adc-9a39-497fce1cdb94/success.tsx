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
            <div className="flex flex-col w-full justify-center items-center">
                <h1 className="font-bold text-[21px]">Obrigado pela avaliação</h1>
                <span className="font-light italic text-[16px]">Para ganhar cupons e outros benefícios no maior São João do Mundo, complete seu cadastro acessando o e-mail informado.</span>
            </div>
            <div>
                <span className="text-[120px]">🎉</span>
            </div>
            <Link href="/" className="bg-[#FF7F63] w-full h-12 rounded-full text-white font-semibold text-[15px] flex justify-center items-center">
                <span>
                    Ganhar prêmios
                </span>
            </Link>
        </div>
    </main>
  );
}
