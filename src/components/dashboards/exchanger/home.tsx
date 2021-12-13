import JLabel from '@jelements/Label';
import { Card, CardHeader, Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';
import { dateFormatWithMonthName } from '../../../tools/helper';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useExchange } from '../../../context/exchange';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: 'medium'
        }
    },
    hrCustom: {
        color: 'gray'
    },
    root: {
        width: '90%',
        boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.2);'
    },
    alignItems: {
        padding: "30px !important",
        textAlign: 'center',
        width: 10,
        [theme.breakpoints.down('sm')]: {
            padding: "25px !important"
        }
    },
    top: {
        marginTop: -50,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0
        }
    }
}));

export default function ExchangerHome() {

    const classes = useStyles();
    const { exchanges, getExchanges }: any = useExchange();

    useEffect(() => {
        getExchanges()
    },
        // HOOK-WARNING: In this case data is handle by useExchange and redux 
        [])


    return (
        <div style={{ height: '100%', width: '100%', marginBottom: '1%' }}>

            <Grid
                container
                alignItems='center'
                direction='column'
            >
                <hr className={classes.hrCustom} style={{ width: '90%' }}></hr>

                <JLabel
                    classes={classes.title}
                    color='textSecondary'
                >
                    {dateFormatWithMonthName(moment().toString())}
                </JLabel>

                <hr className={classes.hrCustom} style={{ width: '90%' }}></hr>

                <JLabel
                    classes={classes.title}
                    color='textSecondary'
                    variant='h5'
                >
                    Tasas del día
                </JLabel>
                <Grid
                    container
                    alignItems='center'
                    direction='row'
                    className={classes.top}
                >
                    {
                        exchanges.map((exchange: any) => (
                            <Grid key={exchange.id} className={classes.alignItems} item xs={12} sm={12} md={6} >
                                <div style={{ padding: 10 }}>
                                    <hr className={classes.hrCustom} style={{ width: '90%' }}></hr>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                        <JLabel
                                            color='textSecondary'
                                            variant='subtitle2'
                                        >
                                        </JLabel>
                                        <MonetizationOnIcon color="action" fontSize='small' style={{ marginRight: 5 }} /> {exchange.sourceName} / {exchange.targetName}
                                    </div>
                                    <hr className={classes.hrCustom} style={{ width: '90%' }}></hr>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                        <Card className={`${classes.root} `} variant="outlined">
                                            <CardHeader
                                                title={`Tasa: ${exchange.comission} / Valor: ${exchange.finalValue} ${exchange.type}`}
                                            ></CardHeader>
                                        </Card>
                                    </div>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    );
}
