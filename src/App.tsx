import React, { useEffect, useState } from "react";
import "./App.scss";
import DogCard from "./components/DogCard/DogCard";
import SearchBox from "./components/Search/SearchBox";
import Source from "./api/source";

export type dogsData = {
  image: {
    url: string;
  };
  name: string;
  breed_group: string;
  height: {
    metric: string;
  };
  life_span: string;
};

function App() {
  const [dogs, setDogs] = useState<dogsData[] | null>();

  //Dog search
  const doSearch = () => {};

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
    getDogList();
  }, []);

  console.log(dogs);

  return (
    <div className="App">
      <header className="App-header">
        <section className="main-section">
          <div className="main-wrapper">
            <h2>Dog Breed Search App</h2>
            <SearchBox doSearch={doSearch} />
            <hr />
            <div className="cards-main-wrapper">
              {dogs
                ? dogs.map((dog, index) => {
                    return (
                      <DogCard
                        key={index}
                        image={dog.image.url}
                        dogName={dog.name}
                        breed={dog.breed_group}
                        height={dog.height.metric}
                        lifeSpan={dog.life_span}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
