import profilePng from "../../assets/logo/Profile.png";
import { IReview } from "../../../types/IProduct";
import { RatingComponent } from "../Rating";
import "./reviewcard.scss"
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
