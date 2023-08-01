import React, { useEffect, useState } from "react";
import DogCard from "../../components/DogCard/DogCard";
import SearchBox from "../../components/Search/SearchBox";
import Source from "../../api/source";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { dogsData } from "../../types/main";
import useDebounce from "../../hooks/useDebounce";

function Home() {
  const [dogs, setDogs] = useState<dogsData[] | null>();
  const [dogSearchResult, setDogsSearchResult] = useState<dogsData[] | null>();
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(true);
  const debouncedSearchValue = useDebounce(searchText, 1000);

  const [listResult, setListResult] = useState<dogsData[] | null>();

  // Dog int list API
  const getDogList = async () => {
    try {
      const results = await Source.get("?limit=10&page=0");
      const data = await results.data;
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
    setSearched(false);
  };

  // Dog search API
  const searchDogs = async () => {
    try {
      const response = await Source.get(`search?q=${debouncedSearchValue}`);
      const data = await response.data;
      setDogsSearchResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchTerm = (e: any) => {
    let onChangeValue = e.target.value;
    setSearchText(onChangeValue);
  };

  //------------------
  const fireOnBySearch = async () => {
    if (searchText) {
      console.log("searchT thiyanwa 1", searchText);
      try {
        const response = await Source.get(`search?q=${debouncedSearchValue}`);
        const data = await response.data;
        setListResult(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("searchT Na", searchText);
      try {
        const results = await Source.get("?limit=10&page=0");
        const data = await results.data;
        setListResult(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fireOnBySearch();
  }, [searchTerm]);

  console.log("listResult-->", listResult);

  return (
    <section className="home-section">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <SearchBox onChange={searchTerm} value={debouncedSearchValue} />
          </Col>
        </Row>
        <Row>
          {listResult
            ? listResult.map((dog, index) => {
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
        </Row>
      </Container>
    </section>
  );
}

export default Home;
