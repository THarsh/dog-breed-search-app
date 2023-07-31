import React from "react";
import "./DogCard.scss";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import DogCardImage from "./DogCardImage";

export type dogsData = {
  dogName: string;
  breed: string;
  height: string;
  lifeSpan: string;
  referenceImageId: string;
  bredFor: string;
};

function DogCard({
  dogName,
  breed,
  height,
  lifeSpan,
  referenceImageId,
  bredFor,
}: dogsData) {
  return (
    <Card className="card-wrapper">
      <DogCardImage dagName={dogName} reference_image_id={referenceImageId} />
      <Card.Body>
        <Card.Title>{dogName}</Card.Title>
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
