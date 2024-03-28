import { GetStaticProps } from "next";

export default function Home() {
  return (
    <h1>Pagina Principal</h1>
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