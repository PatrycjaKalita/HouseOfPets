import adoptionCat from '../../assets/choose-option/adoption-cat.png';
import adoptionDog from '../../assets/choose-option/adoption-dog.png';
import adoptionLittleAnimals from '../../assets/choose-option/adoption-rabbit.png';

export const animals = [
    {
        id: "koty",
        title: "Koty",
        imageAdoption: adoptionCat,
        linkToAdoption: "/adopcja/koty",
        linkToShopForm: "/shop-form/koty",
    },
    {
        id: "psy",
        title: "Psy",
        imageAdoption: adoptionDog,
        linkToAdoption: "/adopcja/psy",
        linkToShopForm: "/shop-form/psy",
    },
    {
        id: "male-zwierzatka",
        title: "Małe zwierzątka",
        imageAdoption: adoptionLittleAnimals,
        linkToAdoption: "/adopcja/małe-zwierzątka",
        linkToShopForm: "/shop-form/male-zwierzatka",
    }
]
