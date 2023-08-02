import React, { useCallback, useEffect, useState } from "react";
import DogCard from "../../components/DogCard/DogCard";
import SearchBox from "../../components/Search/SearchBox";
import Source from "../../api/source";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { dogsData } from "../../types/main";
import useDebounce from "../../hooks/useDebounce";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowDownAZ,
  faArrowDownZA,
  faArrowDownWideShort,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchValue = useDebounce(searchText, 1000);
  const [listResult, setListResult] = useState<dogsData[]>([]);
  const [nameSortOrder, setNameSortOrder] = useState("descending");
  const [heightSortOrder, setHeightSortOrder] = useState("descending");
  const [lifeSpanSortOrder, setLifeSpanSortOrder] = useState("descending");

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
        result = await Source.get(`breeds?limit=50&page=0`);
      }
      if (result?.status === 200) {
        setListResult(result?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [debouncedSearchValue]);

  //sort  by name
  const sortByName = () => {
    const sortByDogName = [...listResult].sort((a, b) =>
      nameSortOrder === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setListResult(sortByDogName);
    setNameSortOrder(
      nameSortOrder === "ascending" ? "descending" : "ascending"
    );
  };

  //sort by height
  const sortByHeight = () => {
    const sortByDogHeight = [...listResult].sort((a, b) => {
      const heightA = parseFirst2Characters(a.height.metric);
      const heightB = parseFirst2Characters(b.height.metric);

      if (heightSortOrder === "ascending") {
        return heightA - heightB;
      } else {
        return heightB - heightA;
      }
    });
    setListResult(sortByDogHeight);
    setHeightSortOrder(
      heightSortOrder === "ascending" ? "descending" : "ascending"
    );
  };

  //sort by life Span
  const sortByLifeSpan = () => {
    const sortByDogLifeSpan = [...listResult].sort((a, b) => {
      const lifeA = parseFirst2Characters(a.life_span);
      const lifeB = parseFirst2Characters(b.life_span);

      if (lifeSpanSortOrder === "ascending") {
        return lifeA - lifeB;
      } else {
        return lifeB - lifeA;
      }
    });
    setListResult(sortByDogLifeSpan);
    setLifeSpanSortOrder(
      lifeSpanSortOrder === "ascending" ? "descending" : "ascending"
    );
  };

  useEffect(() => {
    fireOnBySearch();
  }, [fireOnBySearch]);

  //Get first two characters
  const parseFirst2Characters = (val: any) => {
    return parseInt(val.substring(0, 2).trim());
  };

  return (
    <section className="home-section">
      <Container>
        <Row>
          <Col className="mb-5" md={6} lg={4}>
            <h5>Sort By</h5>
            <hr />
            <div className="d-flex justify-content-between">
              <Button variant="outline-primary" onClick={sortByName}>
                Name{" : "}
                {nameSortOrder === "descending" ? (
                  <FontAwesomeIcon icon={faArrowDownAZ} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownZA} />
                )}
              </Button>
              <Button variant="outline-primary" onClick={sortByHeight}>
                Height{" : "}
                {heightSortOrder === "descending" ? (
                  <FontAwesomeIcon icon={faArrowDownShortWide} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                )}
              </Button>
              <Button variant="outline-primary" onClick={sortByLifeSpan}>
                LifeSpan{" : "}
                {lifeSpanSortOrder === "descending" ? (
                  <FontAwesomeIcon icon={faArrowDownShortWide} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                )}
              </Button>
            </div>
          </Col>
          <Col className="mb-5" md={6} lg={{ span: 6, offset: 2 }}>
            <h5>Search Dog</h5>
            <hr />
            <SearchBox onChange={searchTerm} value={debouncedSearchValue} />
          </Col>
        </Row>
        <Row></Row>
        <Row>
          {listResult.length > 0 ? (
            listResult.map((dog, index) => {
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
          ) : (
            <Col md={12} className="d-flex justify-content-center">
              <Spinner animation="grow" />
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Home;
