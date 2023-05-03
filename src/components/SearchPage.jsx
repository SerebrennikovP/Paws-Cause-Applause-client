import '../CSS/searchPage.css'
import React,{useState} from 'react';
import Select from 'react-select';
import MockPets from '../db/MockPets.json';

function SearchPage({type}) {
  const uniqueBreeds = MockPets.filter(pet => pet.type === type).reduce((acc, pet) => {
    if (!acc.find((breed) => breed.value === pet.breed)) {
      acc.push({ label: pet.breed, value: pet.breed });
    }
    return acc;
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption)

  const handleChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="search-page">
      <Select
        value={selectedOption}
        onChange={handleChange}
        isMulti
        name="breed"
        options={uniqueBreeds}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder ="Breeds"
      />
    </div>
  );
}

export default SearchPage;