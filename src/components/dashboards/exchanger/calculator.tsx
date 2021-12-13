import JInput from '@jelements/Input';
import JLabel from '@jelements/Label';
import { Card, CardContent, Divider, Fade, FormControl, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Paper, Select } from '@material-ui/core';
import * as React from 'react';
import JButton from '@jelements/Button';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useExchange } from '../../../context/exchange';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: 'medium'
        },
        background: 'black'
    },
    hrCustom: {
        color: 'gray'
    },
    paper: {
        padding: '0.5%',
        textAlign: 'center',
        width: '90%',
        background: '#3f51b5'
    },
    coins: {
        padding: '1%',
        margin: '2% 0 2% 0',
        textAlign: 'center',
        width: '100%',
        background: '#3f51b5'
    },
    colorText: {
        color: 'white'
    },
    select: {
        marginTop: "8px",
        width: '100%',
        marginLeft: 10
    },
}));

export default function Calculator({ ...props }) {

    const classes = useStyles();
    const { exchanges }: any = useExchange();
    const [targets, setTargets] = useState<any[]>([]);
    const [source, setSource] = useState<any>('-1');
    const [sourceValue, setSourceValue] = useState<any>(0);
    const [target, setTarget] = useState<any>('-1');

    useEffect(() => {
        if (props && props.resetExchanges && typeof props.resetExchanges === 'function') {
            props.resetExchanges()
        }
    }, [])

    const onSelectSource = (sourceName: any) => {
        if (props && props.setSource && typeof props.setSource === 'function') {
            props.setSource(sourceName)
        }
        setSource(sourceName)
    }

    const onSelectTarget = (targetName: any) => {
        setTarget(targetName)
        if (props && props.setTarget && typeof props.setTarget === 'function') {
            props.setTarget({ value: Number(sourceValue * targetName.finalValue).toFixed(2), targetName: targetName.targetName })
        }
    }

    const onChangeSourceValue = (value: any) => {
        if (props && props.getSourceValue && typeof props.getSourceValue === 'function') {
            props.getSourceValue(value)
        }
        if (props && props.setTarget && typeof props.setTarget === 'function') {
            props.setTarget({ value: Number(value * target.finalValue).toFixed(2), targetName: target.targetName })
        }
        setSourceValue(value)
    }

    const distinctExchanges = (exchanges: any[]): any[] => {
        const arrayOfExchanges = exchanges.filter(
            (exchange, e, arr) => { return arr.findIndex(e => e.sourceName === exchange.sourceName) === e }
        )
        return arrayOfExchanges;
    }

    const distinctEchangeBySource = (sourceName: string, exchanges: any[]): void => {
        let targets: any[] = exchanges.filter(exchange => { return exchange.sourceName === sourceName });
        setTarget(targets[0])
        setTargets(targets)
        if (props && props.setTarget && typeof props.setTarget === 'function' && targets.length > 0) {
            props.setTarget({ value: Number(sourceValue * targets[0].finalValue).toFixed(2), targetName: targets[0].targetName })
        }
    }

    return (
        <div style={props.isExternal ? { height: '100%', width: '100%' } : { height: '100%', width: '100%', marginBottom: '15%' }}>
            <Grid
                container
                alignItems='center'
                direction='column'
            >
                {
                    !(props && props.isExternal) &&
                    <Paper
                        className={classes.paper}
                        elevation={3}
                    >
                        <JLabel
                            component="h1"
                            variant="h6"
                            classes={classes.colorText}
                        >
                            Conversor de divisas
                            </JLabel>
                    </Paper>
                }
                <Card
                    variant="outlined"
                    style={{ marginTop: 10, width: '90%', padding: 35 }}
                >
                    <CardContent>
                        <Grid
                            container
                            alignItems='center'
                            direction='column'
                        >
                            <JLabel
                                component="h1"
                                variant="h6"
                                color='textSecondary'
                            >
                                ¿Cuanto vas a enviar?
                            </JLabel>
                            <Grid
                                container
                                alignItems='center'
                                direction='row'
                                spacing={8}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                >
                                    <JInput
                                        id='valueToSent'
                                        label="Valor"
                                        required={true}
                                        name="valueToSent"
                                        type='number'
                                        onChange={(event: any) => { onChangeSourceValue(Number(event.target.value)) }}
                                        value={sourceValue.toString()}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                >
                                    <FormControl className={classes.select}>
                                        <InputLabel
                                            id="demo-simple-select-helper-label"
                                        >Moneda</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={source}
                                            name="exchange"
                                            onChange={(event: any) => { distinctEchangeBySource(event.target.value.sourceName, exchanges); onSelectSource(event.target.value) }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MonetizationOnIcon />
                                                </InputAdornment>
                                            }
                                        >
                                            <MenuItem value="-1">Ninguno</MenuItem>
                                            {
                                                distinctExchanges(exchanges).map((exchange: any, index: any) => (
                                                    <MenuItem key={index} value={exchange}>{exchange.sourceName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            alignItems='center'
                            direction='column'
                        >
                            <Grid
                                container
                                alignItems='center'
                                direction='row'
                                spacing={8}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                >
                                    {
                                        (source !== '-1') &&
                                        <Fade in={(source !== '-1')}>
                                            <Paper
                                                className={classes.coins}
                                                elevation={3}
                                            >
                                                <JLabel
                                                    component="h1"
                                                    variant="h6"
                                                    classes={classes.colorText}
                                                >
                                                    Tasa: {(source !== '-1') ? source.comission : ''} <br></br>
                                                    Vas a enviar: {(source !== '-1') ? Number(sourceValue).toFixed(2) : ''} {source.sourceName} <br></br>
                                                </JLabel>
                                            </Paper>
                                        </Fade>
                                    }

                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider style={{ margin: 10 }}></Divider>
                        <Grid
                            container
                            alignItems='center'
                            direction='column'
                        >
                            <JLabel
                                component="h1"
                                variant="h6"
                                color='textSecondary'
                            >
                                La persona recibe
                            </JLabel>
                            <Grid
                                container
                                alignItems='center'
                                direction='row'
                                spacing={8}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                >
                                    <JInput
                                        id='valueToSent'
                                        label="Valor"
                                        name="valueToSent"
                                        type='number'
                                        disabled={true}
                                        value={(source !== '-1') ? Number(sourceValue * target.finalValue).toFixed(2) : '0'}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                >
                                    <FormControl className={classes.select}>
                                        <InputLabel
                                            id="demo-simple-select-helper-label"
                                        >Moneda</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={target}
                                            name="exchange"
                                            onChange={(event: any) => { onSelectTarget(event.target.value); }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MonetizationOnIcon />
                                                </InputAdornment>
                                            }
                                        >
                                            <MenuItem value="-1">Ninguno</MenuItem>
                                            {
                                                targets.map((exchange: any, index: any) => (
                                                    <MenuItem key={index} value={exchange}>{exchange.targetName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    {
                        !props.isExternal &&
                        <Grid
                            container
                            alignItems='center'
                            direction='column'
                        >
                            <Grid
                                item
                                sm={12}
                                xs={12}
                                md={12}
                            >
                                <JButton
                                    title="Enviar dinero"
                                >
                                </JButton>
                            </Grid>

                        </Grid>
                    }
                </Card>
            </Grid>
        </div>
    );
}
