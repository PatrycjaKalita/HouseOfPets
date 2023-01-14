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
    selectStylesProducts : {
        width: 350,
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
    textFieldCareTaker: {
        color: '#666666',
        width: 300,
        "& label.Mui-focused": {
            color: '#666666',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        },
    },
    textFieldAddress: {
        color: '#666666',
        width: 700,
        "& label.Mui-focused": {
            color: '#666666',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        },
    },
    root: {
        width: 300,
        "& label.Mui-focused": {
            color: "#666666"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#8D451D"
        },
    },
    rootInput: {
        width: 300,
        '&.MuiInput-underline:after': {
            borderBottomColor: "#8D451D"
        },
        "& input": {
            "&:-webkit-autofill": {
                transition:
                    "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
            },
            "&:-webkit-autofill:focus": {
                transition:
                    "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
            },
            "&:-webkit-autofill:hover": {
                transition:
                    "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
            },
        },
    }
})
