import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types'
import React from 'react';

interface IJAvatar {

    alt: string,
    children?: React.ReactNode,
    classes?: string,
    component?: React.ElementType<any>,
    imgProps?: Object,
    size?: string,
    src?: string,
    srcSet?: string,
    variant?: 'circular'
    | 'rounded'
    | 'square'

}

const JAvatar: React.FC<IJAvatar> = (
    {
        alt = 'img',
        children,
        classes = '',
        component = 'h1',
        imgProps = {},
        size = '',
        src = '',
        srcSet = '',
        variant = 'rounded'
    }): JSX.Element => {

    return (

        <Avatar
            alt={alt}
            className={classes}
            component={component}
            imgProps={imgProps}
            size={size}
            src={src}
            srcSet={srcSet}
            variant={variant}
        >
            {children}
        </Avatar>

    );

}

JAvatar.propTypes = {
    alt: PropTypes.string.isRequired,
    children: PropTypes.node,
    classes: PropTypes.string,
    size: PropTypes.string,
    src: PropTypes.string,
    srcSet: PropTypes.string,
}

export default JAvatar;