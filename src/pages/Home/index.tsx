import React, { useCallback, useEffect, useState } from "react";
import DogCard from "../../components/DogCard/DogCard";
import SearchBox from "../../components/Search/SearchBox";
import Source from "../../api/source";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { dogsData } from "../../types/main";
import useDebounce from "../../hooks/useDebounce";

function Home() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const debouncedSearchValue = useDebounce(searchText, 1000);
  const [listResult, setListResult] = useState<dogsData[]>([]);

  const searchTerm = (e: any) => {
    let onChangeValue = e.target.value;
    setSearchText(onChangeValue);
  };

  const fireOnBySearch = useCallback(async () => {
    try {
      let result;
      if (debouncedSearchValue) {
        result = await Source.get(`breeds/search?q=${debouncedSearchValue}`);
      } else {
        result = await Source.get(`breeds?limit=10&page=${page}`);
      }
      if (result?.status === 200) {
        setListResult(result?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    fireOnBySearch();
  }, [fireOnBySearch]);

  return (
    <section className="home-section">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <SearchBox onChange={searchTerm} value={debouncedSearchValue} />
          </Col>
        </Row>
        <Row>
          {listResult.length > 0
            ? listResult.map((dog, index) => {
                return (
                  <Col xs={12} sm={6} md={4} key={dog.id.toString()}>
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
            : "Loading..."}
        </Row>
      </Container>
    </section>
  );
}

export default Home;
