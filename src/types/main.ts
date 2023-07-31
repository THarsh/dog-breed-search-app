export type dogsData = {
  name: string;
  breed_group: string;
  height: {
    metric: string;
  };
  life_span: string;
  reference_image_id: string;
  bred_for: string;
};

export type dogCard = {
  name: string;
  breed: string;
  height: string;
  lifeSpan: string;
  referenceImageId: string;
  bredFor: string;
}

export type dogCardImage = {
  name: string;
  reference_image_id: any;
};