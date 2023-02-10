import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import {products} from "../../products-list/productsData";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    textFieldStyle: {
        width: 85,
        "& label.Mui-focused": {
            color: '#464646',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        }
    }
});
const Filters = () => {
    const classStyle = useStyle();

    let uniqueProducers = products.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.producer === value.producer
            ))
    )

    const [newProducerQuantityProducts, setNewProducerQuantityProducts] = useState(products);

    return (
        <div className="filter-container">
            <h1 className="filter-title">Filtry</h1>

            <h1 className="filter-name">Cena</h1>
            <TextField
                label="od"
                variant="outlined"
                size="small"
                className={classStyle.textFieldStyle}
                InputProps={{
                    endAdornment: <InputAdornment position="start">zł</InputAdornment>,
                }}
            />
            <div className="price-filter-line"></div>
            <TextField
                label="do"
                variant="outlined"
                size="small"
                className={classStyle.textFieldStyle}
                InputProps={{
                    endAdornment: <InputAdornment position="start">zł</InputAdornment>,
                }}
            />

            <h1 className="filter-name">Producenci</h1>
            {
                uniqueProducers.map((producers, index) => (
                    <label key={index} className="checkbox-filters-container">{producers.producer}
                        <label
                            className="checkbox-filters-number">({newProducerQuantityProducts.filter(({producer}) => producer === producers.producer).length})</label>
                        <input
                            className="checkbox-filters"
                            type="checkbox"
                            id={'checkbox' + producers.producer} value={producers.producer}
                        />
                        <span className="custom-checkmark"></span>
                    </label>
                ))
            }
        </div>
    );
};

export default Filters;
