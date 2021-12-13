import JInput from '@jelements/Input';
import { Card, CardContent, CardHeader, CircularProgress, Grid, InputAdornment, makeStyles } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import React, { useEffect } from 'react';
import { useExchange } from '../../../../context/exchange';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SaveIcon from '@material-ui/icons/Save';
import PaymentIcon from '@material-ui/icons/Payment';
import JButton from '@jelements/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { getUUID } from '../../../../tools/getUUID';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 25),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(8, 5),
            fontSize: 12
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    wrapper: {
        padding: 25, // keep right padding when drawer closed
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%'
        },
        boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.2);'
    },
    textCenter: {
        textAlign: 'center',
        color: 'inherit',
    },
    form: {
        textAlign: 'center',
        padding: 25,
        width: "100%",
        marginTop: theme.spacing(1),
    },
    backButton: {
        backgroundColor: '#ba000d !important',
        '&:hover': {
            backgroundColor: 'red !important',
        }
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
}));

export const NewExchange = () => {

    const classes = useStyles();
    const { exchange, handleExchangeInputChange, saveExchange, isFetching, getExchangeDetails, updateExchange }: any = useExchange();

    useEffect(() => {
        if (window.location.pathname.includes('exchanges') && window.location.pathname.includes('edit')) {
            let exchangeId: any = getUUID(window.location.pathname)
            getExchangeDetails(exchangeId)
        }
    }, [])

    return (

        <div className={classes.wrapper}>
            <Grid
                container
            >
                <Grid item xs={12} sm={12} md={12}>

                    <Card className={`${classes.root} ${classes.wrapper}`} variant="outlined">
                        <CardHeader
                            title={exchange?.id ? "Modificar datos de registro de Divisa" : "Datos de registro de Divisa"}
                            className={classes.textCenter}
                        ></CardHeader>
                        <CardContent >
                            <div className={classes.form}>
                                <Grid container spacing={4}>
                                    {
                                        (isFetching) ?
                                            <div className={classes.form}>
                                                <CircularProgress color="secondary" />
                                            </div>
                                            :
                                            <>
                                                <Grid item xs={12} sm={12} md={6}>
                                                    <JInput
                                                        id='sourceName'
                                                        label="Fuente"
                                                        required={true}
                                                        name="sourceName"
                                                        placeholder="Pesos (MEX)"
                                                        error={exchange?.errorMessage?.sourceName ? true : false}
                                                        errorText={exchange?.errorMessage?.sourceName ? exchange.errorMessage.sourceName : ''}
                                                        value={exchange?.sourceName ? exchange.sourceName : ''}
                                                        onChange={handleExchangeInputChange}
                                                        props={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <LocationSearchingIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6}>
                                                    <JInput
                                                        id='targetName'
                                                        label="Destino"
                                                        name="targetName"
                                                        placeholder="Paypal (USD)"
                                                        value={exchange?.targetName ? exchange.targetName : ''}
                                                        error={exchange?.errorMessage?.targetName ? true : false}
                                                        errorText={exchange?.errorMessage?.targetName ? exchange.errorMessage.targetName : ''}
                                                        onChange={handleExchangeInputChange}
                                                        props={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <GpsFixedIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <JInput
                                                        id='comission'
                                                        label="Comisión"
                                                        required={true}
                                                        name="comission"
                                                        type='number'
                                                        value={exchange?.comission ? exchange.comission : '0'}
                                                        onChange={handleExchangeInputChange}
                                                        error={exchange?.errorMessage?.comission ? true : false}
                                                        errorText={exchange?.errorMessage?.comission ? exchange.errorMessage.comission : ''}
                                                        props={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AccountBalanceWalletIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <JInput
                                                        id='finalValue'
                                                        label="Valor"
                                                        name="finalValue"
                                                        placeholder="588845567"
                                                        type='number'
                                                        value={exchange?.finalValue ? exchange.finalValue : '0'}
                                                        onChange={handleExchangeInputChange}
                                                        error={exchange?.errorMessage?.finalValue ? true : false}
                                                        errorText={exchange?.errorMessage?.finalValue ? exchange.errorMessage.finalValue : ''}
                                                        props={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <MonetizationOnIcon />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <JInput
                                                        id='type'
                                                        label="Tipo"
                                                        name="type"
                                                        placeholder="Dólares"
                                                        value={exchange?.type ? exchange.type : ''}
                                                        error={exchange?.errorMessage?.type ? true : false}
                                                        errorText={exchange?.errorMessage?.type ? exchange.errorMessage.type : ''}
                                                        onChange={handleExchangeInputChange}
                                                        props={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PaymentIcon />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                </Grid>
                                            </>
                                    }
                                </Grid>
                            </div>
                            {
                                (!isFetching) &&
                                <div style={{ float: 'right', padding: 15 }}>
                                    <Grid
                                        container
                                        alignItems='flex-start'
                                        direction='row'
                                    >
                                        <Grid item style={{ marginRight: 10 }}>
                                            <Link to='/exchanges'>
                                                <JButton
                                                    title='Cancelar'
                                                    classes={classes.backButton}
                                                    startIcon={<ArrowBackIcon></ArrowBackIcon>}
                                                >
                                                </JButton>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <JButton
                                                title='Guardar'
                                                startIcon={<SaveIcon></SaveIcon>}
                                                onClick={() => exchange?.id ? updateExchange(exchange) : saveExchange(exchange)}
                                            >
                                            </JButton>
                                        </Grid>
                                    </Grid>
                                </div>
                            }
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>

    )

}