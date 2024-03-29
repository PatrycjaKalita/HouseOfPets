 import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import './Style.css';
import {products} from './productsData';
import {productTitleShort} from '../../utils/product'
import TopInformations from "./top-informations/TopInformations";
import ChangingSearchingOptions from "./changing-searching-options/ChangingSearchingOptions";
import {useStyles} from '../profile/adding-product/MUIStyle'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import ProductInList from "./product-in-list/ProductInList";
import Filters from "../sales/filters/Filters";

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


const ProductsList = () => {
    const classStyle = useStyle();
    const classes = useStyles();
    const numAscending = [...products].sort((a, b) => a.price - b.price);
    const numDescending = [...products].sort((a, b) => b.price - a.price);
    const [selectedSorting, setSelectedSorting] = useState('ascending');

    const location = useLocation();

    let filterResults = localStorage.getItem("filterResults");
    filterResults = JSON.parse(filterResults);


    return (
        <div className="main-container-products-list">
            <TopInformations productsNumber={filterResults.length}/>

            <div className="products-filters-list-container">
                {/*Filtry*/}
                <Filters/>

                <div className="right-side-csof">
                    {/*Prawa strona*/}
                    <div className="right-side-csof-sorting-by-price">
                        {/*Top prawej strony, sortowanko + zmiana kategori*/}
                        <ChangingSearchingOptions/>

                        <div className="rs-sorting-by-price">
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Sortuj po</InputLabel>
                                <Select
                                    className={classStyle.selectStyles}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    defaultValue = ""
                                    label="Sortuj po"
                                    onChange={e => setSelectedSorting(e.target.value)}
                                >

                                    <MenuItem value="ascending">Cena - rosnąco</MenuItem>
                                    <MenuItem value="descending">Cena - malejąco</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="products-list-container">
                        {
                                filterResults.map((product) => (
                                    <Link to={product.link}>
                                        <ProductInList productImage={product.image}
                                                       productTitle={productTitleShort(product.name)}
                                                       productRating="0" productPrice={product.price}
                                                       productPromotion={product.sale}/>
                                    </Link>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
