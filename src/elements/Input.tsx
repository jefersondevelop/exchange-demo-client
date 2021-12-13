import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types'
import React from 'react';

interface IJInput {
    id?: string,
    name: string,
    label: string,
    type?: string,
    variant?: "outlined" | "standard" | "filled",
    margin?: "normal" | "none" | "dense",
    autoFocus?: boolean,
    required?: boolean,
    error?: boolean,
    errorText?: string,
    value?: string,
    onChange?: any,
    classes?: string,
    props?: any,
    placeholder?: string,
    onKeyUp?: any,
    disabled?: boolean,
    autoComplete?: string
}

const JInput: React.FC<IJInput> = (
    {
        id = '',
        name = '',
        label = '',
        variant = undefined,
        margin = 'normal',
        required = false,
        error = false,
        errorText = '',
        value = '',
        onChange = null,
        autoFocus = false,
        type = 'text',
        placeholder,
        classes,
        props,
        onKeyUp = null,
        disabled = false,
        autoComplete = ''
    }): JSX.Element => {

    return (

        <TextField
            id={id}
            className={classes}
            type={type}
            name={name}
            label={label}
            variant={variant}
            margin={margin}
            required={required}
            error={error}
            helperText={errorText}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            InputProps={props}
            placeholder={placeholder}
            onKeyUp={onKeyUp}
            disabled={disabled}
            autoComplete={autoComplete}
            fullWidth
        />

    );

}

JInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default JInput;