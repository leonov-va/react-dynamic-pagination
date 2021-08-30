import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=12&_page=${currentPage}`
        )
        .then((response) => {
          setPhotos([...photos, ...response.data]);
          setCurrentPage((prevPage) => prevPage + 1);
          setTotalCount(response.headers["x-total-count"]);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    // bottomLine = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100;
    // photo availability check = photos.length < totalCount

    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      photos.length < totalCount
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="app">
      <div className="photos">
        {photos.map((photo) => (
          <figure key={photo.id} className="photo">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <figcaption>
              {photo.id} {photo.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default App;
