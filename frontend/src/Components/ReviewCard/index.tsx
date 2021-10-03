import imgStar from "assets/images/star.png";

import './styles.css';

type Props = {
  userName : string;
  description : string;
}

const ReviewCard = ( {userName, description} : Props) => {
  return (
    <div className="container-review">
      <div className="star-name">
        <img src={imgStar} alt="Favorito" />
        <h1>{userName}</h1>
      </div>
      <div className="card-description">
        <p className="text-break">
        {description}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
