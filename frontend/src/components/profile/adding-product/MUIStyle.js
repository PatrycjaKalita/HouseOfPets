import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    textFieldName: {
        color: '#666666',
        "& label.Mui-focused": {
            color: '#666666',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        },
    },
    textField: {
        width: 400,
        color: '#666666',
        "& label.Mui-focused": {
            color: '#666666',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        },
    },
    selectStylesCategories: {
        width: 400,
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
                color: '#666666',
            },
        },
    },
    selectStylesAW: {
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
    textFieldExtraInfo: {
        color: '#666666',
        width: 250,
        "& label.Mui-focused": {
            color: '#666666',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        },
    },
})
