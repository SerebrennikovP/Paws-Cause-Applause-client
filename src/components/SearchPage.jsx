import "../CSS/searchPage.css";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import MockPets from "../db/MockPets.json";
import Slider from "@mui/material/Slider";

function SearchPage({ type }) {
  const filtredByType = MockPets.filter((pet) => pet.type === type);
  const uniqueBreeds = Array.from(new Set(filtredByType.map((pet) => pet.breed))).map((breed) => ({ label: breed, value: breed }));
  const [heightRange, setHeightRange] = useState([0, 150]);
  const [weightRange, setWeightRange] = useState([0, 150]);
  const [searchName, setSearchName] = useState("");
  const statusOptions = [{ label: "Available", value: "Available" }, { label: "Fostered", value: "Fostered" }];
  const [selectedOptionBreed, setSelectedOptionBreed] = useState(null);
  const [adoptionStatus, setAdoptionstatus] = useState({ label: "Available", value: "Available" });
  const debounceParams = useRef(null);

  useEffect(() => {
    debounceParams.current = setTimeout(() => {
      console.log(weightRange, searchName, heightRange, selectedOptionBreed?.map((breed) => breed.value), adoptionStatus.value);
    }, 500);
    return () => clearTimeout(debounceParams.current);
  }, [weightRange, searchName, heightRange, selectedOptionBreed, adoptionStatus]);

  return (
    <div className="search-page">
      <Select value={selectedOptionBreed} onChange={(option) => setSelectedOptionBreed(option)} name="breed" options={uniqueBreeds} className="basic-multi-select" classNamePrefix="select" placeholder="Breeds" isMulti />
      <Select value={adoptionStatus} onChange={(option) => setAdoptionstatus(option)} name="adoptionStatus" options={statusOptions} className="basic-single" classNamePrefix="select" placeholder="Adotion status" />
      <Slider getAriaLabel={() => "Height range"} value={heightRange} onChange={(event, value) => setHeightRange(value)} valueLabelDisplay="auto" max={150} valueLabelFormat={(value)=>`${value} sm`}/>
      <Slider getAriaLabel={() => "Weight range"} value={weightRange} onChange={(event, value) => setWeightRange(value)} valueLabelDisplay="auto" max={150} valueLabelFormat={(value)=>`${value} kg`}/>
      <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by name" />
    </div>
  );
}

export default SearchPage;