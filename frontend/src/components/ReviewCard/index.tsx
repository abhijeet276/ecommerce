import profilePng from "../../images/Profile.png";
import { IReview } from "../../../types/IProduct";
import { RatingComponent } from "../Rating";

const ReviewCard = ({ review }: { review: IReview }) => {
    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <RatingComponent value={review.rating} readOnly />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;
