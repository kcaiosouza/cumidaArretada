type RatingType = {
  rating: number;
  name: string;
  restaurant: string;
}

export default function CardReview({rating, name, restaurant}:RatingType) {
  return(
    <div>
      <div>
        <img src="/userProfile.png" alt="Imagem de perfil"/>
        <span>
          {rating == 1 ? "😡" : rating == 2 ? "🙁" : rating == 3 ? "😐" : rating == 4 ? "🙂" : rating == 5 ? "😍" : "❔"}
        </span>
      </div>
      <div>
        <h3>{name}</h3>
        <span>{restaurant}</span>
      </div>
    </div>
  )
}