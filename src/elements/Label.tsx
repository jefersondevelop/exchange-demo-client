import React from 'react';
import { Typography } from '@material-ui/core';

interface IJLabel {

    align?: 'inherit'
    | 'left'
    | 'center'
    | 'right'
    | 'justify'
    color?: 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    display?: 'initial'
    | 'block'
    | 'inline',
    variant?: 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'srOnly'
    | 'inherit',
    component?: React.ElementType<any>,
    classes?: string,
    children?: React.ReactNode;

}

const JLabel: React.FC<IJLabel> = ({ children, align = 'inherit', color = 'initial', display = 'initial', variant = 'inherit', classes = '', component = 'h1' }): JSX.Element => {
    return (

        <Typography
            component={component}
            variant={variant}
            className={classes}
            align={align}
            color={color}
            display={display}
        >
            {children}
        </Typography>

    );
}

export default JLabel;