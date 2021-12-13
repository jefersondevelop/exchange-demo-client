import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Select, Box, List, ListItem, ListItemIcon, ListItemText, MenuItem, Grow, Slide, InputAdornment, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import JButton from '@jelements/Button';
import JLabel from '@jelements/Label';
import JInput from '@jelements/Input'
import { useExchange } from '../../../context/exchange';
import { useState } from 'react';
import JInputControlLabel from '@jelements/InputControlLabel';
import { countries } from '../../../tools/countries';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        display: 'block',
        margin: 'auto',
        maxWidth: '100%',
        '& .MuiOutlinedInput-input': {
            fontSize: 35,
            padding: "35px !important"
        },
        '& .MuiFilledInput-root': {
            background: "none !important"
        }
    },
    box: {
        padding: '15px',
        width: '100%',
        display: 'block',
        margin: 'auto',
        zIndex: 0,
    },
    boxCard: {
        padding: '35px',
        color: 'white',
        borderRadius: '10px',
        textAlign: 'center',
        lineHeight: '50px',
        width: '100%',
        display: 'block',
        margin: 'auto',
        boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)'
    },
    boxSelected: {
        padding: '15px',
        width: '100%',
        display: 'block',
        margin: -10,
        zIndex: 100,
    },
    boxCardSelected: {
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        lineHeight: '50px',
        width: '100%',
        display: 'block',
        margin: 'auto',
        boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)',
        marginTop: -15
    },
    TextTitle: {
        width: '100%',
        display: 'block',
        margin: 'auto',
        zIndex: 0
    },
    HeaderText: {
        width: '100%',
        display: 'block',
        margin: 'auto',
        marginTop: '55px',
        zIndex: 500,
    },
    listText: {
        margin: '0px',
        marginTop: '50px',
        padding: '0px',
    },
    button: {
        padding: '10px',
        color: 'white',
        fontSize: '20px',
    },
    listItemText: {
        fontSize: '30px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px'
        }
    },
    select: {
        marginTop: "15px",
        width: "100%"
    },
    label: {
        marginLeft: 10
    }
}));

/* LIST TEXT TITLE */
function TextTitle({ classes }: any) {
    return (

        <div className={`${classes.TextTitle} secondary`}>
            <div className="containerText">
                <p> En <strong>3</strong> pasos</p>
                <ul>
                    <li style={{ fontSize: '35px' }}><span>Solicita</span></li>
                    <li style={{ fontSize: '35px' }}><span>Envía</span></li>
                    <li style={{ fontSize: '35px' }}><span>Intercambia</span></li>
                </ul>
            </div>
        </div>
    );
}

/* LIST TEXT NUM */
function TextColum({ classes }: any) {

    return (
        <div className={classes.HeaderText}>
            <List dense={false}>
                <Grow in={true} timeout={2000}>
                    <ListItem>
                        <ListItemIcon>
                            <LooksOneIcon fontSize='large' color='primary' />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Indica monto y moneda que posees."
                        />
                    </ListItem>
                </Grow>
                <Grow in={true} timeout={3000}>
                    <ListItem>
                        <ListItemIcon>
                            <LooksTwoIcon fontSize='large' color='primary' />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Verifica monto y moneda que enviarás."
                        />
                    </ListItem>
                </Grow>
                <Grow in={true} timeout={4000}>
                    <ListItem>
                        <ListItemIcon>
                            <Looks3Icon fontSize='large' color='primary' />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Procede a llenar el formulario y listo!"
                        />
                    </ListItem>
                </Grow>
            </List>
        </div>
    );
}

function BoxColum(
    {
        boxClass,
        contentClass,
        onChangeSourceValue,
        sourceValue,
        source,
        distinctEchangeBySource,
        distinctExchanges,
        exchanges,
        onSelectSource,
        target,
        onSelectTarget,
        showTransition,
        targets,
        setTransition
    }: any) {

    return (

        <div className={boxClass}>
            <Slide direction="down" in={true} timeout={2000}>
                <Card className={contentClass}>
                    <CardContent style={{ width: '100%', display: 'block', margin: 'auto' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={6} sm={6}>
                                        <JInput
                                            id='valueToSent'
                                            label="Valor"
                                            required={true}
                                            name="valueToSent"
                                            type='number'
                                            variant='outlined'
                                            props={{ inputProps: { min: 0 } }}
                                            onChange={(event: any) => { onChangeSourceValue(Number(event.target.value)) }}
                                            value={sourceValue.toString()}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6} sm={6}>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            label="Age"
                                            color='secondary'
                                            style={{ padding: 40, fontSize: 35, width: '100%' }}
                                            value={source}
                                            name="exchange"
                                            onChange={(event: any) => { distinctEchangeBySource(event.target.value.sourceName, exchanges); onSelectSource(event.target.value) }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MonetizationOnIcon />
                                                </InputAdornment>
                                            }
                                        >

                                            <MenuItem style={{ width: '100%', fontSize: 35 }} value="-1">Ninguno</MenuItem>
                                            {
                                                distinctExchanges(exchanges).map((exchange: any, index: any) => (
                                                    <MenuItem style={{ width: '100%', fontSize: 35 }} key={index} value={exchange}>{exchange.sourceName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={6} sm={6}>
                                        <JInput
                                            id="username"
                                            name="profile.username"
                                            label="La persona recibe"
                                            variant="outlined"
                                            margin="normal"
                                            required={true}
                                            autoFocus={true}
                                            type='number'
                                            props={{ inputProps: { min: 0 } }}
                                            disabled={true}
                                            value={(source !== '-1') ? Number(sourceValue * target.finalValue).toFixed(2) : '0'}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6} sm={6}>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            name="exchange"
                                            color='secondary'
                                            value={target}
                                            onChange={(event: any) => { onSelectTarget(event.target.value); }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MonetizationOnIcon />
                                                </InputAdornment>
                                            }
                                            style={{ padding: 40, fontSize: 35, width: '100%' }}
                                        >

                                            <MenuItem style={{ width: '100%', fontSize: 35 }} value="-1">Ninguno</MenuItem>
                                            {
                                                targets.map((exchange: any, index: any) => (
                                                    <MenuItem style={{ width: '100%', fontSize: 35 }} key={index} value={exchange}>{exchange.targetName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {
                            (!showTransition) &&
                            <JButton
                                title='SIGUIENTE'
                                size="large"
                                color="primary"
                                disabled={(source === '-1' || sourceValue <= 0)}
                                onClick={() => setTransition(true)}
                            >
                            </JButton>
                        }

                    </CardContent>
                </Card>
            </Slide>

            <Slide in={source !== '-1' && showTransition} direction="down" timeout={2000}>
                <div
                    style={{ padding: 15 }}
                >
                    <JLabel
                        component="h1"
                        variant="h6"
                        color='primary'
                    >
                        Vas a enviar: {(source !== '-1') ? Number(sourceValue).toFixed(2) : ''} {source.sourceName} <br></br>
                            Tasa: {(source !== '-1') ? source.comission : ''} <br></br>
                    </JLabel>
                    <hr />
                    <JLabel
                        component="h1"
                        variant="h6"
                        color='primary'
                    >
                        La persona recibe: {(source !== '-1') ? Number(sourceValue * target.finalValue).toFixed(2) : '0'} {target && target.targetName} <br></br>
                    </JLabel>
                </div>
            </Slide>
        </div>
    );
}

function FormColum({ classes }: any) {

    const { transaction, handleTransactionInputChange, executeTransaction, transactionValid }: any = useExchange();

    return (
        <Box className={classes.boxSelected} style={{ height: "100%", marginTop: -120 }}>
            <Card className={classes.boxCardSelected}>
                <JLabel
                    component="h3"
                    variant="h5"
                    classes='secondary'
                >
                    Completa el formulario
                    </JLabel>
                <CardContent>
                    <Grid
                        item xs={12} sm={12} md={12}
                    >
                        <FormControl variant="filled" className={classes.select}>
                            <InputLabel id="demo-simple-select-filled-label">País destino</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                label="Age"
                                name="targetCountry"
                                onChange={handleTransactionInputChange}
                                value={transaction?.targetCountry ? transaction.targetCountry : '-1'}
                            >
                                {
                                    countries.map(country => (

                                        <MenuItem key={country.label} value={country.value}>
                                            <JInputControlLabel
                                                classes={classes.label}
                                                control={
                                                    <img style={{ maxHeight: '32px', maxWidth: '32px' }} src={country.src} alt={country.label} />
                                                }
                                                label={country.label}
                                            />
                                        </MenuItem>


                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Grid item xs={12} sm={12} md={12}>
                            <JInput
                                id="email"
                                name="reciptEmail"
                                label="Correo"
                                variant="filled"
                                margin="normal"
                                required={true}
                                autoFocus={false}
                                placeholder="example@yopmail.com"
                                onChange={handleTransactionInputChange}
                                value={transaction?.reciptEmail ? transaction.reciptEmail : ''}
                                error={transaction?.errorMessage?.reciptEmail ? true : false}
                                errorText={transaction?.errorMessage?.reciptEmail}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <JInput
                                id="phone"
                                name="reciptPhone"
                                label="Teléfono del Beneficiario"
                                variant="filled"
                                margin="normal"
                                required={true}
                                autoFocus={false}
                                placeholder="41255877889"
                                value={transaction?.reciptPhone ? transaction.reciptPhone : ''}
                                error={transaction?.errorMessage?.reciptPhone ? true : false}
                                errorText={transaction?.errorMessage?.reciptPhone}
                                onChange={handleTransactionInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <JInput
                                id="email"
                                name="reciptName"
                                label="Beneficiario"
                                variant="filled"
                                margin="normal"
                                required={true}
                                autoFocus={false}
                                placeholder="John due"
                                value={transaction?.reciptName ? transaction.reciptName : ''}
                                error={transaction?.errorMessage?.reciptName ? true : false}
                                errorText={transaction?.errorMessage?.reciptName}
                                onChange={handleTransactionInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <JInput
                                id="email"
                                name="reciptAccount"
                                label="Cuenta del beneficiario"
                                variant="filled"
                                margin="normal"
                                required={true}
                                autoFocus={false}
                                placeholder="5018-7855-58-788-9"
                                value={transaction?.reciptAccount ? transaction.reciptAccount : ''}
                                error={transaction?.errorMessage?.reciptAccount ? true : false}
                                errorText={transaction?.errorMessage?.reciptAccount}
                                onChange={handleTransactionInputChange}
                            />
                        </Grid>
                        <JButton
                            disabled={!transactionValid(transaction)}
                            onClick={(transactionValid(transaction)) ? () => executeTransaction(transaction) : () => { return }}
                            title="Realizar solicitud"
                        >

                        </JButton>
                    </Grid>
                </CardContent>
            </Card>
        </Box >
    );
}

export default function Transaction() {

    const classes = useStyles();

    const [showTransition, setTransition] = useState(false);

    const { exchanges, getExchanges, handleTransactionInputChange }: any = useExchange();
    const [targets, setTargets] = useState<any[]>([]);
    const [source, setSource] = useState<any>('-1');
    const [sourceValue, setSourceValue] = useState<any>(0);
    const [target, setTarget] = useState<any>('-1');

    useEffect(() => {
        getExchanges()
    }, [])

    const onSelectSource = (sourceName: any) => {
        let events = [
            {
                target: {
                    name: 'comission',
                    value: sourceName.comission
                }
            },
            {
                target: {
                    name: 'source',
                    value: sourceName.sourceName
                }
            },
            {
                target: {
                    name: 'target',
                    value: sourceName.targetName
                }
            },
            {
                target: {
                    name: 'valueToSent',
                    value: sourceValue
                }
            },
            {
                target: {
                    name: 'valueSent',
                    value: Number(sourceValue * sourceName.finalValue).toFixed(2)
                }
            }
        ]
        events.map(event => handleTransactionInputChange(event))
        setSource(sourceName)
    }

    const onSelectTarget = (targetName: any) => {
        const events = [
            {
                target: {
                    name: 'valueSent',
                    value: (source !== '-1') ? Number(sourceValue * target.finalValue).toFixed(2) : '0'
                }
            },
            {
                target: {
                    name: 'target',
                    value: targetName.targetName
                }
            },
        ]
        events.map(event => handleTransactionInputChange(event))
        setTarget(targetName)
    }

    const onChangeSourceValue = (value: any) => {
        if (value < 0) {
            value = 0
        }
        let events = [
            {
                target: {
                    name: 'valueToSent',
                    value: value
                }
            },
            {
                target: {
                    name: 'valueSent',
                    value: Number(value * target.finalValue).toFixed(2)
                }
            }
        ]
        events.map(event => handleTransactionInputChange(event))
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
    }


    return (
        <div className={classes.root}>
            {
                showTransition ?
                    <Slide in={true} timeout={1000} direction='right' >
                        <div style={{ float: 'left', width: '50%' }}>

                            <TextTitle classes={classes} />

                        </div>
                    </Slide>

                    :
                    <TextTitle classes={classes} />
            }
            <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#3f50b5"
                    fillOpacity="1"
                    d="M1,96L26.7,106.7C53.3,117,107,139,160,128C213.3,117,267,75,320,80C373.3,85,427,139,480,138.7C533.3,139,587,85,640,58.7C693.3,32,747,32,800,74.7C853.3,117,907,203,960,224C1013.3,245,1067,203,1120,176C1173.3,149,1227,139,1280,144C1333.3,149,1387,171,1413,181.3L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z">
                </path>
            </svg>
            <Grid style={{ padding: 50 }} container spacing={1}>
                {
                    (showTransition) ?
                        <>
                            <Grid container item xs={12} md={6}>
                                <BoxColum
                                    exchanges={exchanges}
                                    source={source}
                                    sourceValue={sourceValue}
                                    targets={targets}
                                    target={target}
                                    onSelectSource={onSelectSource}
                                    onSelectTarget={onSelectTarget}
                                    onChangeSourceValue={onChangeSourceValue}
                                    distinctExchanges={distinctExchanges}
                                    distinctEchangeBySource={distinctEchangeBySource}
                                    setTransition={setTransition}
                                    boxClass={classes.boxSelected}
                                    contentClass={classes.boxCardSelected}
                                    showTransition={showTransition}
                                />
                            </Grid>
                            <Grid container item xs={12} md={6}>
                                <FormColum
                                    classes={classes}
                                />
                            </Grid>
                            <div id="bgTransition"></div>
                        </>
                        :
                        <>
                            <Grid container item xs={12} md={6}>
                                <TextColum
                                    classes={classes}
                                />
                            </Grid>
                            <Grid container item xs={12} md={6}>
                                <BoxColum
                                    exchanges={exchanges}
                                    source={source}
                                    sourceValue={sourceValue}
                                    targets={targets}
                                    target={target}
                                    onSelectSource={onSelectSource}
                                    onSelectTarget={onSelectTarget}
                                    onChangeSourceValue={onChangeSourceValue}
                                    distinctExchanges={distinctExchanges}
                                    distinctEchangeBySource={distinctEchangeBySource}
                                    setTransition={setTransition}
                                    boxClass={classes.box}
                                    contentClass={classes.boxCard}
                                    showTransition={showTransition}
                                    handleTransactionInputChange={handleTransactionInputChange}

                                />
                            </Grid>
                        </>
                }
            </Grid>
        </div>
    );
}

