import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import axios from "axios";
import CardPet from "./CardPet";
import "../CSS/home.css";
import bar0 from "../images/bar-0.png";
import bar1 from "../images/bar-1.png";
import bar2 from "../images/bar-2.png";
import bar3 from "../images/bar-3.png";
import sadCat from "../images/sad-cat.png";
import happyCat from "../images/happy-cat.png";
import sadDog from "../images/sad-dog.png";
import happyDog from "../images/happy-dog.png";

const Home = () => {
  const navigate = useNavigate();
  const [randomPets, setRandomPets] = useState([]);
  const [updater, setUpdater] = useState(0);
  const [changeBar, setChangeBar] = useState(0);
  const [active, setActive] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [isVisibleBar, setIsVisibleBar] = useState(true);
  const [isHoveringCat, setIsHoveringCat] = useState(false);
  const [isHoveringDog, setIsHoveringDog] = useState(false);

  useEffect(() => {
    const getRandomPets = async () => {
      try {
        setActive(false);
        const response = await axios.get("http://localhost:8080/pet/getRandom");
        setRandomPets(response.data);
        setTimeout(() => {
          changeBar !== 3 ? setChangeBar((prev) => prev + 1) : setChangeBar(0);
        }, 1000);
        setTimeout(() => {
          setActive(true);
        }, 5300);
      } catch (error) {
        console.error(error);
      }
    };
    getRandomPets();
  }, [updater]);

  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        setUpdater((prev) => prev + 1);
      }, 6000)
    );
    return () => clearInterval(intervalId);
  }, []);

  const handleMouseEnter = () => {
    clearInterval(intervalId);
    setIsVisibleBar(false);
  };

  const handleMouseLeave = () => {
    setIntervalId(
      setInterval(() => {
        setUpdater((prev) => prev + 1);
      }, 6000)
    );
    setIsVisibleBar(true);
  };

  return (
    <div className="HomePage">
      <div className="">Header welcoming users to the site</div>
      <div className="">Text explaining what the service is</div>

      <div className="search-by-animal-wrapper">
        <span className="cat-homepage">
          <img
            id="sad-cat"
            src={sadCat}
            alt="sad-Cat"
            style={{ opacity: isHoveringCat ? 0 : 1 }}
          />
          <img
            id="happy-cat"
            src={happyCat}
            alt="happy-Cat"
            style={{ opacity: isHoveringCat ? 1 : 0, cursor: "pointer" }}
            onMouseEnter={() => setIsHoveringCat(true)}
            onMouseLeave={() => setIsHoveringCat(false)}
            onClick={() => navigate(routes.searchPageCats)}
          />
        </span>
        <span className="dog-homepage">
          <img
            id="sad-dog"
            src={sadDog}
            alt="sad-Dog"
            style={{ opacity: isHoveringDog ? 0 : 1 }}
          />
          <img
            id="happy-dog"
            src={happyDog}
            alt="happy-Dog"
            style={{ opacity: isHoveringDog ? 1 : 0, cursor: "pointer" }}
            onMouseEnter={() => setIsHoveringDog(true)}
            onMouseLeave={() => setIsHoveringDog(false)}
            onClick={() => navigate(routes.searchPageDogs)}
          />
        </span>
      </div>

      <div
        className="random-pets-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="random-pets">
          {randomPets
            .slice(0, Math.floor(window.innerWidth / 338))
            .map((pet) => (
              <CardPet key={pet.pet_id} pet={pet} />
            ))}
        </div>
        {isVisibleBar && (
          <div className={`overlay-layer ${active ? "in" : "out"}`}>
            <img
              src={
                changeBar === 0
                  ? bar0
                  : changeBar === 1
                  ? bar1
                  : changeBar === 2
                  ? bar2
                  : bar3
              }
            ></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
