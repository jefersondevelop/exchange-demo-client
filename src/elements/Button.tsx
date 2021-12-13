import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'

export interface IJButton {
    title: string,
    classes?: string,
    onClick?: any,
    variant?: 'text' | 'contained' | 'outlined',
    color?: 'inherit' | 'primary' | 'secondary' | 'default',
    size?: 'small' | 'medium' | 'large',
    component?: any,
    reference?: any,
    startIcon?: React.ReactNode,
    disabled?: boolean
}

const JButton: React.FC<IJButton> = ({ disabled, startIcon, children, component, title, classes, onClick = () => { return }, variant = 'contained', color = 'primary', size = 'small', reference }): JSX.Element => {

    return (
        <Button
            size={size}
            className={classes}
            onClick={() => onClick()}
            fullWidth
            variant={variant}
            color={color}
            ref={reference}
            component={component}
            disabled={disabled}
            startIcon={startIcon}
        >
            {title}
            {children}
        </Button >
    )

}

JButton.propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.string,
    onClick: PropTypes.func
}

export default JButton;