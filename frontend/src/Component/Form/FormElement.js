import React from 'react';
import TextField from "@material-ui/core/TextField";
import FileInput from "./FileInput";
import PropTypes from 'prop-types';

const FormElement = (props) => {
    let inputComponent = <TextField
        fullWidth
        type={props.type}
        variant="outlined"
        id={props.propertyName}
        name={props.propertyName}
        value={props.value}
        onChange={props.onChange}
        error={!!props.error}
        helperText={props.error}
        label={props.label}
    />;

    if (props.type === 'file') {
        inputComponent = (
            <FileInput
                label={props.title}
                name={props.propertyName}
                onChange={props.onChange}
            />
        )
    }

    if (props.type === 'textarea'){
        inputComponent = (
            <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                id={props.propertyName}
                name={props.propertyName}
                value={props.value}
                onChange={props.onChange}
                error={!!props.error}
                helperText={props.error}
                label={props.label}
            />
        )
    }
    return inputComponent
};
FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    propertyName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    label: PropTypes.string
};



export default FormElement;