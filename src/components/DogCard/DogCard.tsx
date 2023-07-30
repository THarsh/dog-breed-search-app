import React from "react";
import "./DogCard.scss";
import DogCardImage from "./DogCardImage";

export type dogsData = {
  dogName: string;
  breed: string;
  height: string;
  lifeSpan: string;
  reference_image_id: any;
};

function DogCard({
  dogName,
  breed,
  height,
  lifeSpan,
  reference_image_id,
}: dogsData) {
  return (
    <div className="dog-card-wrapper">
      <div className="image-wrapper">
        <DogCardImage
          dagName={dogName}
          reference_image_id={reference_image_id}
        />
      </div>
      <div className="dog-details">
        <h5>{dogName}</h5>
        <p>
          <strong>Breed :</strong> {breed}
        </p>
        <p>
          <strong>Height :</strong> {height}
        </p>
        <p>
          <strong>Life Span :</strong> {lifeSpan}
        </p>
      </div>
    </div>
  );
}

export default DogCard;
