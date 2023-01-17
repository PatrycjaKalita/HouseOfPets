export const countPromotion = (checkPromotion, productPrice) => {
    if (checkPromotion === true) {
        let promotion = (productPrice / 100) * 10
        let newPrice = productPrice - promotion
        console.log(productPrice, "-", promotion,"-", newPrice.toFixed(2))
        return newPrice.toFixed(2)
    }
}

export const productTitleShort = (title) => {
    if (title.length > 22) {
        const tmp = title.slice(0, 22);
        return tmp + "..";
    } else if (title.length <= 22)
        return title;
}

export function updatePrice(number, quantity) {
    let price = quantity * number;
    price = price.toFixed(2);
    return price + " zł";
}
