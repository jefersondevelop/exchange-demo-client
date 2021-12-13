import React from 'react';
import JLabel from '@jelements/Label';

interface IJInputControlLabel {

    checked?: boolean,
    classes?: string,
    control: React.ReactElement<any, any>,
    disabled?: boolean,
    inpuRef?: React.RefObject<any>,
    node?: React.ReactNode,
    labelPlacement?: 'bottom'
    | 'end'
    | 'start'
    | 'top',
    onChange?: Function,
    value?: any,
    label: string
}

const JInputControlLabel: React.FC<IJInputControlLabel> = (
    {
        control,
        labelPlacement = 'end',
        onChange,
        value = null,
        checked,
        classes,
        disabled = false,
        node,
        inpuRef,
        label = ""
    }): JSX.Element => {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
            {control}
            <JLabel
                component="p"
                classes={classes}
            >
                {label}
            </JLabel>
        </div>
    )
}

export default JInputControlLabel;