import React, {useState} from 'react';
import axios from 'axios';
import { SRLWrapper } from "simple-react-lightbox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './style.scss';

const App = () => {

  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const ACCESS_KEY = "5w-pRPZ7G-L3mNqz1G6jIiAkFn44i6Hp-f5vpoPrafQ";

  const getValue = (event) => {
    setImage(event.target.value);
  }

  const getImages = () => {
    const urlAPI = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + ACCESS_KEY;
    axios.get(urlAPI)
    .then((response) => {
        setResult(response.data.results);
        console.log(response);
    })
  }
  return (
    <SRLWrapper>
      <>
      <div className="container">
      <h1 className="title">Istagan rasmingizni qidirishingiz mumkin!</h1>
        <div className="formSection">
          <input type="text" 
          name="image" 
          placeholder="Rasmni izlang..." 
          onChange={getValue}
          />
          <button onClick={getImages} type="submit">Qidiruv</button>
        </div>
        <div className="result">
          {result.map((image, id) => (
              <div className="card" key={image.id}>
                  <a>
                    <LazyLoadImage
                        className=" "
                        src={image.urls.full}
                        effect="blur"
                        delayTime="300"
                    />
                    <p className="username">Photo by {image.user.name}</p>
                  </a>
              </div>
          ))}
        </div>
      </div>
        
      </>
    </SRLWrapper>
  )
}

export default App
