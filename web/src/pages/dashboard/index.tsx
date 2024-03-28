import { GetServerSideProps } from "next"
import { parseCookies } from "nookies";

export default function Dashboard() {
    return(
        <h1>Dashboard</h1>
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

    return {
      props: {
        // variaveis aqui
      }
    }
  }