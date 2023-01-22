export const promotion = (price, sale) => {
        let promotion = (price / 100) * sale
        let newPrice = price - promotion
        return newPrice.toFixed(2)
}

export const productTitleShort = (title) => {
    if (title.length > 20) {
        const tmp = title.slice(0, 20);
        return tmp + "..";
    } else if (title.length <= 20)
        return title;
}

export function updatePrice(number, quantity) {
    let price = quantity * number;
    price = price.toFixed(2);
    return price + " zł";
}

export function checkNumberOfOpinions(number) {
    if (number <= 0) {
        return "(0 opinii)";
    } else if (number === 1) {
        return "(" + number + " opinia)";
    } else if (number === 2 || number === 3 || number === 4) {
        return "(" + number + " opinie)";
    } else if (number >= 5) {
        return "(" + number + " opinii)";
    }
}

export function checkProductAvailability(number) {
    if (number <= 0) {
        return "Nie dostępny";
    } else
        return "Dostępny";
}
