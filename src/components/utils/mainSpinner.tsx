import React from 'react';
import { useMain } from '../../context/mainContext';
import ColoredLinearProgress from '../../elements/CircularProgress';

const MainSpinner = () => {

    const { isFetching } = useMain();

    return (

        (isFetching) ?
            <ColoredLinearProgress />
            :
            <div></div>

    );

}

export default MainSpinner;