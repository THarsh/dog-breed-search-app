import Card from "react-bootstrap/Card";
import { dogCardImage } from "../../types/main";

function DogCardImage({ name, reference_image_id }: dogCardImage) {
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
      <Card.Img variant="top" src={imageUrl} alt={name} />
    </div>
  );
}

export default DogCardImage;
