import React from "react";
import "./DogCard.scss";

export type dogsData = {
  image: string;
  dogName: string;
  breed: string;
  height: string;
  lifeSpan: string;
};

function DogCard({ image, dogName, breed, height, lifeSpan }: dogsData) {
  return (
    <div className="dog-card-wrapper">
      <div className="image-wrapper">
        <img
          src={image ? image : "https://i.ibb.co/9bBBn8w/Cute-Dog-Logo.png"}
          alt="dogImage"
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
