const express = require('express')
const router = express.Router()

const {
    addingAnimalForAdoption, getAvailableProductsForAnimal,
    getAvailableAnimalTypes, getAvailableProductsSetForAnimal,
    getAvailableAnimalBreeds, getAvailableAnimalForAdoption,
    getAvailableAnimalAges, getAvailableAnimalsForAdoptionList, deleteAnimalFromAdoptionList,
    getAvailableAnimalWeights, getAvailableAnimalsList, getAvailableAnimalForEditing, updateAnimalFoAdoption
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
router.get('/view/animal-for-editing', getAvailableAnimalForEditing)
router.get('/view/products-set-for-animal', getAvailableProductsSetForAnimal)
router.get('/view/products-for-animal', getAvailableProductsForAnimal)

router.put('/update/animal-for-adoption', updateAnimalFoAdoption)

router.delete('/delete/animal-from-list', deleteAnimalFromAdoptionList)

module.exports = router
