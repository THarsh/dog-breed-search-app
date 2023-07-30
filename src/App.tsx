import React, { useEffect, useState } from "react";
import "./App.scss";
import DogCard from "./components/DogCard/DogCard";
import SearchBox from "./components/Search/SearchBox";
import Source from "./api/source";

export type dogsData = {
  name: string;
  breed_group: string;
  height: {
    metric: string;
  };
  life_span: string;
  reference_image_id: string;
};

function App() {
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

  console.log("---search result->", dogSearchResult);
  console.log("---searched->", searched);

  return (
    <div className="App">
      <header className="App-header">
        <section className="main-section">
          <div className="main-wrapper">
            <h2>Dog Breed Search App</h2>
            <SearchBox onChange={onChange} handleSubmit={handleSubmit} />
            <hr />
            <div className="cards-main-wrapper">
              {!searched ? (
                <>
                  {dogs
                    ? dogs.map((dog, index) => {
                        return (
                          <DogCard
                            key={index}
                            reference_image_id={dog.reference_image_id}
                            dogName={dog.name}
                            breed={dog.breed_group}
                            height={dog.height.metric}
                            lifeSpan={dog.life_span}
                          />
                        );
                      })
                    : null}
                </>
              ) : (
                <>
                  {dogSearchResult
                    ? dogSearchResult.map((dog, index) => {
                        return (
                          <DogCard
                            key={index}
                            reference_image_id={dog.reference_image_id}
                            dogName={dog.name}
                            breed={dog.breed_group}
                            height={dog.height.metric}
                            lifeSpan={dog.life_span}
                          />
                        );
                      })
                    : null}
                </>
              )}
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
