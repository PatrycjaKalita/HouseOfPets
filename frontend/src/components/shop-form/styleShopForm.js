import {makeStyles} from "@material-ui/core/styles";

export const useStylesShopForm = makeStyles({
    selectStyles: {
        width: 250,
        "&.MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D",
                color: "#8D451D"
            },
        },
        selectIcon: {
            position: "relative",
            fontSize: "20px",
            paddingRight: "10px",
        },
    },
    selectStylesAge: {
        width: 200,
        "&.MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D",
                color: "#8D451D"
            },
        },
        selectIcon: {
            position: "relative",
            fontSize: "20px",
            paddingRight: "10px",
        },
    },
    inputLabelStyle: {
        '&.MuiInputLabel-root': {
            "&.Mui-focused": {
                color: '#464646',
            },
        },
    }
});
