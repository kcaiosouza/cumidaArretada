import { api } from "@/services/api"
import { GetServerSideProps } from "next"
import Link from "next/link";

interface Review {
    id: number;
    user_id: string;
    restaurant_id: string;
    rating: number;
    waiting_time: boolean;
    service: boolean;
    temperature: boolean;
    ingredient: boolean;
    flavor: boolean;
    presentation: boolean;
    inovation: boolean;
    created_at: string;
}

interface RestaurantRatings {
    totalRating: number;
    count: number;
}

interface AverageRating {
    restaurant_id: string;
    average_rating: number;
    restaurant_name: string;
}


export default function Ranking({averageRatings}:any) {
    // console.log(averageRatings)
    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cumida Arretada</span>
                    </Link>
                </div>
            </nav>

            <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-6 mt-24">
                <div className="bg-orange-500 py-2 px-4">
                    <h2 className="text-xl font-bold text-white">Top Restaurantes</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                    {averageRatings.map((item:any, index:number) => {
                        return(
                            <li key={item.restaurant_id} className="flex items-center py-4 px-6">
                                <span className="text-gray-700 text-lg font-medium mr-4">{index+1}.</span>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-800">{item.restaurant_name}</h3>
                                        <p className="text-gray-600 text-base">Nota: {(item.average_rating).toFixed(2)} ⭐</p>
                                    </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data : allVotes} = await api.get("/vote/getAll")

    function calculateAverageRatings(reviews: Review[]): { [key: string]: number } {
        const restaurantRatings: { [key: string]: RestaurantRatings } = {};
    
        reviews.forEach(review => {
            const { restaurant_id, rating } = review;
            if (!restaurantRatings[restaurant_id]) {
                restaurantRatings[restaurant_id] = { totalRating: 0, count: 0 };
            }
            restaurantRatings[restaurant_id].totalRating += rating;
            restaurantRatings[restaurant_id].count += 1;
        });
    
        const averageRatings: { [key: string]: number } = {};
        for (const restaurant_id in restaurantRatings) {
            const { totalRating, count } = restaurantRatings[restaurant_id];
            averageRatings[restaurant_id] = totalRating / count;
        }
    
        return averageRatings;
    }
    
    // Função para buscar o nome do restaurante
    async function fetchRestaurantName(restaurant_id: string): Promise<string> {
        try {
            const response = await api.get(`/restaurant/${restaurant_id}`);
            if (response.data.success) {
                return response.data.restaurant.name;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error(`Error fetching restaurant name for ${restaurant_id}:`, error);
            return 'Unknown';
        }
    }
    
    // Função para ordenar os ratings médios do maior para o menor e adicionar o nome do restaurante
    async function sortAverageRatingsWithNames(averageRatings: { [key: string]: number }): Promise<AverageRating[]> {
        const entries = Object.entries(averageRatings);
        const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
        const sortedAverageRatings: AverageRating[] = [];
    
        for (const [restaurant_id, average_rating] of sortedEntries) {
            const restaurant_name = await fetchRestaurantName(restaurant_id);
            sortedAverageRatings.push({
                restaurant_id,
                average_rating,
                restaurant_name
            });
        }
    
        return sortedAverageRatings;
    }
    
    async function main() {
        const averageRatings = calculateAverageRatings(allVotes);
        const sortedAverageRatings = await sortAverageRatingsWithNames(averageRatings);

        return sortedAverageRatings
    }

    const infoRank = await main()
    return {
      props: {
        averageRatings: infoRank
      }
    }
  }