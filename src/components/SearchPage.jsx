import "../CSS/searchPage.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import Select from "react-select";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { statusOptions } from "../constants";
import CardPet from "./CardPet";
import TablePagination from '@mui/material/TablePagination';
import { PetContextInstance } from '../context/PetContext'


function SearchPage({ type }) {
  const debounceParams = useRef(null);

  const { setIsLoadingCards } = useContext(PetContextInstance)
  const [filtredPets, setFiltredPets] = useState([]);
  const [uniqueBreeds, setUniqueBreeds] = useState({});
  const [heightRange, setHeightRange] = useState([0, type == "Dog" ? 100 : 70]);
  const [weightRange, setWeightRange] = useState([0, type == "Dog" ? 25 : 15]);
  const [searchName, setSearchName] = useState("");
  const [selectedOptionBreed, setSelectedOptionBreed] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState({
    label: "Adoption status",
    value: "All",
  });
  const [isFirstMount, setIsFirstMount] = useState(true)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/pet/getBreeds`,
          { type: type }
        );
        const breeds = response.data.map((breed) => ({
          label: breed,
          value: breed,
        }));
        setUniqueBreeds(breeds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pet/search`, {
          params: {
            type,
            name: searchName,
            height: heightRange,
            weight: weightRange,
            breed: selectedOptionBreed?.map((breed) => breed.value),
            status: adoptionStatus.value,
          },
        });
        setFiltredPets(response.data)
        setIsFirstMount(false)
      } catch (error) {
        console.error(error);
      }
    }
    firstFetch()
  }, []);


  useEffect(() => {
    setIsLoadingCards(true)
    debounceParams.current = setTimeout(async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pet/search`, {
        params: {
          type,
          name: searchName,
          height: heightRange,
          weight: weightRange,
          breed: selectedOptionBreed?.map((breed) => breed.value),
          status: adoptionStatus.value,
        },
      });
      !isFirstMount && setFiltredPets(response.data)
      setIsLoadingCards(false)
      setRowsPerPage(10)
      setPage(0)
    }, 1000);
    return () => clearTimeout(debounceParams.current);
  }, [
    weightRange,
    searchName,
    heightRange,
    selectedOptionBreed,
    adoptionStatus,
  ]);

  return (
    <div className="search-page">
      <div className="searchBar">
        <Select
          value={selectedOptionBreed}
          onChange={(option) => setSelectedOptionBreed(option)}
          name="breed"
          options={uniqueBreeds}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Breeds"
          isMulti
        />
        <Select
          value={adoptionStatus}
          onChange={(option) => setAdoptionStatus(option)}
          name="adoptionStatus"
          options={statusOptions}
          className="basic-single"
          classNamePrefix="select"
          placeholder="Adotion status"
        />
        <p>Height</p>
        <Slider
          getAriaLabel={() => "Height range"}
          value={heightRange}
          onChange={(event, value) => setHeightRange(value)}
          valueLabelDisplay="auto"
          max={type == "Dog" ? 100 : 70}
          valueLabelFormat={(value) => `${value} sm`}
          sx={{
            color: '#8b4100',
          }}
        />
        <p>Weight</p>
        <Slider
          getAriaLabel={() => "Weight range"}
          value={weightRange}
          onChange={(event, value) => setWeightRange(value)}
          valueLabelDisplay="auto"
          max={type == "Dog" ? 25 : 15}
          valueLabelFormat={(value) => `${value} kg`}
          sx={{
            color: '#8b4100',
          }}
        />
        <input
          type="text"
          className="form-control"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by name"
        />
      </div>
      <div className="founded-pets">
        <TablePagination
          sx={{
            opacity: filtredPets.length > 0 ? 100 : 0,
          }}
          component="div"
          count={filtredPets.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="zero-pets" style={{ display: filtredPets.length > 0 || isFirstMount ? 'none' : 'flex' }}>PLEASE MAKE FILTERS EASIER</div>
        {filtredPets &&
          <div className="filtred-pets">
            {filtredPets.map((pet) => (
              <CardPet key={pet._id} pet={pet} />
            )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </div>}
        <TablePagination
          sx={{
            opacity: filtredPets.length > 0 ? 100 : 0,
          }}
          component="div"
          count={filtredPets.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default SearchPage;
