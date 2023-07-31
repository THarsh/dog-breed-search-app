import React from "react";
import Card from "react-bootstrap/Card";

export type dogsData = {
  dagName: string;
  reference_image_id: any;
};

function DogCardImage({ dagName, reference_image_id }: dogsData) {
  const dogImageUrl = () => {
    if (!reference_image_id) {
      const imageUrl = `https://i.ibb.co/9bBBn8w/Cute-Dog-Logo.png`;
      return imageUrl;
    } else {
      const imageUrl = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;
      return imageUrl;
    }
  };
  const imageUrl = dogImageUrl();
  return (
    <div className="card-image-wrapper">
      <Card.Img variant="top" src={imageUrl} alt={dagName} />
    </div>
  );
}

export default DogCardImage;
