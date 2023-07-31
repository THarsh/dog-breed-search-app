import React, { useEffect, useState } from "react";
import DogCard from "../../components/DogCard/DogCard";
import SearchBox from "../../components/Search/SearchBox";
import Source from "../../api/source";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { dogsData } from "../../types/main";

function Home() {
  const [dogs, setDogs] = useState<dogsData[] | null>();
  const [dogSearchResult, setDogsSearchResult] = useState<dogsData[] | null>();
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);

  //Dog search
  const searchDogs = async () => {
    try {
      const response = await Source.get(`search?q=${searchText}`);
      const data = await response.data;
      setDogsSearchResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchDogs();
    setSearched(true);
  };

  const onChange = (e: any) => {
    setSearchText(e.target.value);
  };

  //get Dogs list
  useEffect(() => {
    const getDogList = async () => {
      try {
        const results = await Source.get("?limit=10&page=0");
        const data = await results.data;
        setDogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    setSearched(false);
    getDogList();
  }, []);

  return (
    <section className="home-section">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <SearchBox onChange={onChange} handleSubmit={handleSubmit} />
          </Col>
        </Row>
        <Row>
          {!searched ? (
            <>
              {dogs
                ? dogs.map((dog, index) => {
                    return (
                      <Col xs={12} sm={6} md={4}>
                        <DogCard
                          key={index}
                          referenceImageId={dog.reference_image_id}
                          name={dog.name}
                          breed={dog.breed_group}
                          height={dog.height.metric}
                          lifeSpan={dog.life_span}
                          bredFor={dog.bred_for}
                        />
                      </Col>
                    );
                  })
                : null}
            </>
          ) : (
            <>
              {dogSearchResult
                ? dogSearchResult.map((dog, index) => {
                    return (
                      <Col xs={12} md={3}>
                        <DogCard
                          key={index}
                          referenceImageId={dog.reference_image_id}
                          name={dog.name}
                          breed={dog.breed_group}
                          height={dog.height.metric}
                          lifeSpan={dog.life_span}
                          bredFor={dog.bred_for}
                        />
                      </Col>
                    );
                  })
                : null}
            </>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Home;
