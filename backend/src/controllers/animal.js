const AnimalForAdoption = require('../models/animalForAdoption')
const TypeOfAnimals = require('../models/typeOfAnimal')
const Breeds = require("../models/breed")
const Ages = require("../models/age")
const Weights = require('../models/weight')
const Product = require("../models/product");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addingAnimalForAdoption = async (req, res) => {
    const {
        link,
        name,
        address,
        sex,
        short_description,
        added_to_adoption_date,
        email,
        phone_number,
        image,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
    } = req.body

    let newAnimal = new AnimalForAdoption({
        link,
        name,
        address,
        sex,
        short_description,
        added_to_adoption_date,
        email,
        phone_number,
        image,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
    })

    //zapisanie do bazy
    newAnimal.save((err, success) => {
        if (err) {
            console.log('Błąd dodawania zwierzątka', err)
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Zwierzątko dodane!'
        })
    })
}

exports.getAvailableAnimalTypes = async (req, res) => {
    try {
        const animalTypes = await TypeOfAnimals.find({})

        res.status(200).json({
            availableAnimalTypes: {
                animalTypes
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy zwierzątek."
        })
    }
}

exports.getAvailableAnimalBreeds = async (req, res) => {
    try {
        const animalBreeds = await Breeds.find({})

        res.status(200).json({
            availableAnimalBreeds: {
                animalBreeds
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Rasy zwierzątek."
        })
    }
}

exports.getAvailableAnimalAges = async (req, res) => {
    try {
        const animalAges = await Ages.find({})

        res.status(200).json({
            availableAnimalAges: {
                animalAges
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Wiek zwierzątek."
        })
    }
}

exports.getAvailableAnimalWeights = async (req, res) => {
    try {
        const animalWeights = await Weights.find({})

        res.status(200).json({
            availableAnimalWeights: {
                animalWeights
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Waga zwierzątek."
        })
    }
}

exports.getAvailableAnimalsList = async (req, res) => {
    try {
        const animal = await AnimalForAdoption.aggregate([
            {
                '$lookup': {
                    'from': 'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            }
        ])

        res.status(200).json({
            availableAnimalsList: {
                animal
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}

exports.getAvailableAnimalsForAdoptionList = async (req, res) => {
    try {
        const animalType = await TypeOfAnimals.find({name: req.query.animal_type})
        const animalTypeId = animalType[0]._id
        const animalForAdoption = await AnimalForAdoption.aggregate([
            {
                '$match': {
                    'type_of_pets_id': ObjectId(animalTypeId)
                }
            },
            {
                '$lookup': {
                    'from': 'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            },
            {
                '$lookup': {
                    'from': 'typeofanimals',
                    'localField': 'type_of_pets_id',
                    'foreignField': '_id',
                    'as': 'typeofanimals'
                }
            },
        ])
        res.status(200).json({
            availableAnimalsForAdoptionList: {
                animalForAdoption
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}

exports.getAvailableAnimalForAdoption = async (req, res) => {
    try {
        const animalLink = req.query.animal_link

        const animalForAdoption = await AnimalForAdoption.aggregate([
            {
                '$match': {
                    'link': animalLink
                }
            },
            {
                '$lookup': {
                    'from': 'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            },
            {
                '$lookup': {
                    'from': 'typeofanimals',
                    'localField': 'type_of_pets_id',
                    'foreignField': '_id',
                    'as': 'typeofanimals'
                }
            },
            {
                '$lookup': {
                    'from': 'ages',
                    'localField': 'age_id',
                    'foreignField': '_id',
                    'as': 'ages'
                }
            },
            {
                '$lookup': {
                    'from': 'weights',
                    'localField': 'weight_id',
                    'foreignField': '_id',
                    'as': 'weights'
                }
            }
        ])

        res.status(200).json({
            availableAnimalForAdoption: {
                animalForAdoption
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}


exports.getAvailableAnimalForEditing= async (req, res) => {
    try {
        const animalID = req.query.animalId
        console.log(animalID)
        const animalForEditing = await AnimalForAdoption.aggregate([
            {
                '$match': {
                    '_id': ObjectId(animalID)
                }
            },
            {
                '$lookup': {
                    'from': 'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            },
            {
                '$lookup': {
                    'from': 'typeofanimals',
                    'localField': 'type_of_pets_id',
                    'foreignField': '_id',
                    'as': 'typeofanimals'
                }
            },
            {
                '$lookup': {
                    'from': 'ages',
                    'localField': 'age_id',
                    'foreignField': '_id',
                    'as': 'ages'
                }
            },
            {
                '$lookup': {
                    'from': 'weights',
                    'localField': 'weight_id',
                    'foreignField': '_id',
                    'as': 'weights'
                }
            }
        ])

        console.log(animalForEditing)

        res.status(200).json({
            availableAnimalForEditing: {
                animalForEditing
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenia zwierzatka do edycji z bazy."
        })
    }
}

exports.updateAnimalFoAdoption= async (req, res) => {
    const {name, address, short_description, email, phone_number, image, sex, type_of_pets_id, breed_id, age_id, weight_id} = req.body

    AnimalForAdoption.findOne({_id: req.body.id}, (err, animal) => {
        if (name) {
            animal.name = name;
        }
        if (address) {
            animal.address = address;
        }
        if (short_description) {
            animal.short_description = short_description;
        }
        if (email) {
            animal.email = email;
        }
        if (phone_number.length === 9) {
            animal.phone_number = phone_number;
        }
        if (image) {
            animal.image = image;
        }
        if (sex) {
            animal.sex = sex;
        }
        if (type_of_pets_id) {
            animal.type_of_pets_id = type_of_pets_id;
        }
        if (breed_id) {
            animal.breed_id = breed_id;
        }
        if (age_id) {
            animal.age_id = age_id;
        }
        if (weight_id) {
            animal.weight_id = weight_id;
        }

        animal.save((err, updatedAnimalForAdoption) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja zwierzątka nie powiodła się'
                });
            }
            res.status(200).json(updatedAnimalForAdoption);
        });
    });
}

exports.deleteAnimalFromAdoptionList= async (req, res) => {
    AnimalForAdoption.findOne({_id: req.body.id}, (err, animal) => {

        animal.delete((err, deleteAnimalFromLis) => {
            if (err) {
                return res.status(400).json({
                    error: 'Zwierze usunięte.'
                });
            }
            res.status(200).json(deleteAnimalFromLis);
        });
    });
}
