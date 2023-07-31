import React from "react";
import "./DogCard.scss";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import DogCardImage from "./DogCardImage";
import { dogCard } from "../../types/main";

function DogCard({
  name,
  breed,
  height,
  lifeSpan,
  referenceImageId,
  bredFor,
}: dogCard) {
  return (
    <Card className="card-wrapper">
      <DogCardImage name={name} reference_image_id={referenceImageId} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{bredFor}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>Breed :</strong> {breed}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Height :</strong> {height}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Life Span :</strong> {lifeSpan}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default DogCard;
