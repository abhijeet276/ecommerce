import { IReview } from "../../../types/IProduct"
import ReviewCard from "../ReviewCard"


const Reviews: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
    return reviews.map(item =><ReviewCard review={item} />)
}

export default Reviews