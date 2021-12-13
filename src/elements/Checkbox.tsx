import React from 'react'
import { Checkbox } from '@material-ui/core';

interface IJCheckBox {
    id?: string,
    checked?: boolean,
    checkedIcon?: React.ReactNode,
    classes?: string,
    color?: 'default'
    | 'primary'
    | 'secondary',
    disabled?: boolean,
    disableRipple?: boolean,
    icon?: React.ReactNode,
    onChange?: VoidFunction,
    required?: boolean,
    size?: 'medium'
    | 'small',
    value?: string

}

const JCheckBox: React.FC<IJCheckBox> = (
    {
        id = '',
        checked,
        checkedIcon,
        classes = '',
        color = 'default',
        disabled = false,
        disableRipple = false,
        icon,
        onChange,
        required = false,
        size = 'medium',
        value
    }): JSX.Element => {

    return (
        <Checkbox
            id={id}
            checked={checked}
            className={classes}
            checkedIcon={checkedIcon}
            disabled={disabled}
            disableRipple={disableRipple}
            icon={icon}
            onChange={onChange}
            required={required}
            size={size}
            value={value}
            color={color}
        />
    );

}

export default JCheckBox;