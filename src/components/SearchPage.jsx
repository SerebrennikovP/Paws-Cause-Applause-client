import "../CSS/searchPage.css";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { statusOptions } from "../constants"
import CardPet from "./CardPet";

function SearchPage({ type }) {
  const debounceParams = useRef(null);

  const [filtredPets, setFiltredPets] = useState([])
  const [uniqueBreeds, setUniqueBreeds] = useState({});
  const [heightRange, setHeightRange] = useState([0, type == "Dog" ? 100 : 70]);
  const [weightRange, setWeightRange] = useState([0, type == "Dog" ? 40 : 20]);
  const [searchName, setSearchName] = useState("");
  const [selectedOptionBreed, setSelectedOptionBreed] = useState(null);
  const [adoptionStatus, setAdoptionstatus] = useState({ label: "Available", value: "Available" });

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.post('http://localhost:8080/pet/getBreeds', { "type": type });
        const breeds = response.data.map((breed) => ({ label: breed, value: breed }));
        setUniqueBreeds(breeds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBreeds();
  }, []);


  useEffect(() => {
    debounceParams.current = setTimeout(async () => {
      const response = await axios.get('http://localhost:8080/pet/search', {
        params: {
          type,
          name: searchName,
          height: heightRange,
          weight: weightRange,
          breed: selectedOptionBreed?.map((breed) => breed.value),
          status: adoptionStatus.value
        }
      })
      console.log(response.data)
      setFiltredPets(response.data)
    }, 1000);
    return () => clearTimeout(debounceParams.current);
  }, [weightRange, searchName, heightRange, selectedOptionBreed, adoptionStatus]);

  return (
    <div className="search-page">
      <div className="searchBar">
        <Select value={selectedOptionBreed} onChange={(option) => setSelectedOptionBreed(option)} name="breed" options={uniqueBreeds} className="basic-multi-select" classNamePrefix="select" placeholder="Breeds" isMulti />
        <Select value={adoptionStatus} onChange={(option) => setAdoptionstatus(option)} name="adoptionStatus" options={statusOptions} className="basic-single" classNamePrefix="select" placeholder="Adotion status" />
        <Slider getAriaLabel={() => "Height range"} value={heightRange} onChange={(event, value) => setHeightRange(value)} valueLabelDisplay="auto" max={type == "Dog" ? 100 : 70} valueLabelFormat={(value) => `${value} sm`} />
        <Slider getAriaLabel={() => "Weight range"} value={weightRange} onChange={(event, value) => setWeightRange(value)} valueLabelDisplay="auto" max={type == "Dog" ? 40 : 20} valueLabelFormat={(value) => `${value} kg`} />
        <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by name" />
      </div>
      <div className="filtred-pets">
        {filtredPets.map((pet) => (<CardPet key={pet.pet_id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;