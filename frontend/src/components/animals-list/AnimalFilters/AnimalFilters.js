import React, {useState} from 'react';
import './Style.css'
import {animalList} from "../animalData";

const AnimalFilters = () => {
    let uniqueSex = animalList.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.sex === value.sex
            ))
    )

    let uniqueLifePhase = animalList.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.age === value.age
            ))
    )

    const [newSexQuantityAnimals, setNewSexQuantityAnimals] = useState(animalList);
    const [newLifePhaseQuantityAnimals, setNewLifePhaseQuantityAnimals] = useState(animalList);

    return (
        <div className="AF-container">
            <h1 className="AF-title">Filtry</h1>

            <h1 className="AF-name">Faza życia</h1>
            {
                uniqueLifePhase.map((lifePhase) => (
                    <label className="checkbox-filters-container">{lifePhase.age}
                        <label
                            className="checkbox-filters-number">({newSexQuantityAnimals.filter(({age}) => age === lifePhase.age).length})</label>
                        <input
                            className="checkbox-filters"
                            type="checkbox"
                            id={'checkbox' + lifePhase.age} value={lifePhase.age}
                        />
                        <span className="custom-checkmark"></span>
                    </label>
                ))
            }

            <h1 className="AF-name">Płeć</h1>
            {
                uniqueSex.map((animal) => (
                    <label className="checkbox-filters-container">{animal.sex}
                        <label
                            className="checkbox-filters-number">({newLifePhaseQuantityAnimals.filter(({sex}) => sex === animal.sex).length})</label>
                        <input
                            className="checkbox-filters"
                            type="checkbox"
                            id={'checkbox' + animal.sex} value={animal.sex}
                        />
                        <span className="custom-checkmark"></span>
                    </label>
                ))
            }
        </div>
    );
};

export default AnimalFilters;
