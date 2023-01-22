const express = require('express')
const router = express.Router()

const {
    addingAnimalForAdoption,
    getAvailableAnimalTypes,
    getAvailableAnimalBreeds, getAvailableAnimalForAdoption,
    getAvailableAnimalAges, getAvailableAnimalsForAdoptionList,
    getAvailableAnimalWeights, getAvailableAnimalsList
} = require('../controllers/animal')
const {runValidation} = require("../validators");
const {addingAnimalForAdoptionValidator} = require("../validators/animal");

router.post('/adding/animalForAdoption', addingAnimalForAdoptionValidator, runValidation, addingAnimalForAdoption)

router.get('/adding/animalForAdoption/animalType', getAvailableAnimalTypes)
router.get('/adding/animalForAdoption/breed', getAvailableAnimalBreeds)
router.get('/adding/animalForAdoption/age', getAvailableAnimalAges)
router.get('/adding/animalForAdoption/weight', getAvailableAnimalWeights)


router.get('/view/animals-list', getAvailableAnimalsList)
router.get('/view/animals-list-for-adoption', getAvailableAnimalsForAdoptionList)
router.get('/view/animal-for-adoption', getAvailableAnimalForAdoption)

module.exports = router
