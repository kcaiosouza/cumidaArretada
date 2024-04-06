import { GetStaticProps } from "next";

export default function Home() {
  return (
    <main>
      <header className="bg-gradient-to-br from-white from-25% to-[#FF7F63] h-screen w-full">
        <nav className="flex h-20 max-h-20 flex-row w-full justify-between items-center">
          <img src="/vercel.svg" alt="Logo" width={100} height={"auto"}/>
          <div>
            <a href="#aboutProject">Sobre o projeto</a>
            <button className="rounded-lg border-[2px] border-[#fff] px-2 py-1 text-[#fff] font-semibold">Acessar plataforma</button>
          </div>
        </nav>
      </header>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // coletar 4 votos aleatorios para mostrar na tela inicial
  return {
    props: {
      // variaveis aqui
    },
    revalidate: 60 * 60 * 8, // 8 horas
  }
}