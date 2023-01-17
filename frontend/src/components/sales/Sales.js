import React, {useState} from 'react';
import {useStyles} from "../profile/adding-product/MUIStyle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import ProductInList from "../products-list/product-in-list/ProductInList";
import {productTitleShort} from "../../utils/product";
import {makeStyles} from "@material-ui/core/styles";
import TopSaleInformation from "./top-sale-information/TopSaleInformation";
import Filters from "./filters/Filters";
import './Style.css'
import {promotion} from "./promotionData";

const useStyle = makeStyles({
    selectStyles: {
        width: 200,
        color: '#464646',
        "&.MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D",
                color: "#8D451D",
            },
        },
        selectIcon: {
            position: "relative",
            fontSize: "20px",
            paddingRight: "10px",
        },
    }
});
const Sales = () => {
    const [selectedSorting, setSelectedSorting] = useState('ascending');
    const classStyle = useStyle();
    const classes = useStyles();

    return (
        <div className="main-container-products-list">
            <TopSaleInformation/>

            <div className="products-filters-list-container">
                {/*Filtry*/}
                <Filters/>
                <div className="right-side-sales">
                    <div className="sales-sorting-by-price">
                        <FormControl>
                            <InputLabel className={classes.inputLabelStyle}>Sortuj po</InputLabel>
                            <Select
                                className={classStyle.selectStyles}
                                IconComponent={ExpandMoreRoundedIcon}
                                label="Sortuj po"
                                onChange={e => setSelectedSorting(e.target.value)}
                            >
                                <MenuItem value="ascending">Cena - rosnąco</MenuItem>
                                <MenuItem value="descending">Cena - malejąco</MenuItem>
                            </Select>
                        </FormControl>
                    </div>


                    {/* Product */}
                    <div className="sales-list-container">
                        {
                            promotion.map((product) => (
                                    <Link to={product.link}>
                                        <ProductInList productImage={product.image}
                                                       productTitle={productTitleShort(product.title)}
                                                       productRating={product.rating} productPrice={product.price}
                                                       productPromotion={product.promotion}/>
                                    </Link>
                                )) /*:
                                <div className="no-product-message">Żaden produkt nie spełnia kryteriów.</div>*/
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Sales;
