import React, {useEffect, useState} from 'react';
import {useStyles} from "../profile/adding-product/MUIStyle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import {Link, useHistory} from "react-router-dom";
import ProductInList from "../products-list/product-in-list/ProductInList";
import {productTitleShort} from "../../utils/product";
import {makeStyles} from "@material-ui/core/styles";
import TopSaleInformation from "./top-sale-information/TopSaleInformation";
import Filters from "./filters/Filters";
import './Style.css'
import {promotion} from "./promotionData";
import axios from "axios";
import {getCookie, signOut} from "../../auth/Helpers";

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
    const token = getCookie('token');
    const history = useHistory()

    useEffect(() => {
        loadProductsSaleList();
    }, []);

    const [availableProductsSaleList, setAvailableProductsSaleList] = useState(false);
    const loadProductsSaleList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-sale-list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductsSaleList(response.data.availableProductsSaleList);
                /*console.log(response.data.availableProductsSaleList.productsSale.map((sale) => {
                    return sale.sale !== 0
                }))*/
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };
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
                            availableProductsSaleList.hasOwnProperty('productsSale') === false ?
                                <div className="no-product-message">Żaden produkt nie spełnia kryteriów.</div>
                                :
                                availableProductsSaleList.productsSale.map((product) => {
                                    return <Link to={product.link} className={product.sale !== 0 ? '' : 'hidden'}>
                                        <ProductInList productImage={product.image}
                                                       productTitle={productTitleShort(product.name)}
                                                       /*productRating={product.rating}*/ productPrice={product.price}
                                                       productPromotion={product.sale}/>
                                    </Link>
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Sales;
