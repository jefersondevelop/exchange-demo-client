import * as React from 'react';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import JLabel from '@jelements/Label';
import { Grid, Card, CardContent, makeStyles, ButtonBase, styled, MobileStepper, InputAdornment } from '@material-ui/core';
import { countries } from '../../../tools/countries';
import './styles.css'
import { useState } from 'react';
import Calculator from './calculator';
import JInput from '@jelements/Input';
import EmailIcon from '@material-ui/icons/Email'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useExchange } from '../../../context/exchange';
import JButton from '@jelements/Button';
import { areTransactionValid } from '../../../actions/validations';

const StepOneContent: React.FC<any> = ({ handleNext }): JSX.Element => {

    const { transaction, handleTransactionInputChange }: any = useExchange();

    const handleSelectCountry = (value: any) => {
        let event = {
            target: {
                name: 'targetCountry',
                value
            }
        }
        handleTransactionInputChange(event)
    }

    return (
        <>
            {
                (countries && countries.length > 0) ?

                    countries.map((country) => (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            key={country.label}
                            style={{ padding: "1.5%" }}
                        >
                            <ImageButton>
                                <Paper
                                    elevation={3}
                                    style={
                                        (
                                            transaction && transaction.targetCountry && transaction.targetCountry !== -1 && transaction.targetCountry === country.label
                                        ) ? { textAlign: 'center', width: '100%', padding: '3%', backgroundColor: '#3f50b5' } : { textAlign: 'center', width: '100%', padding: '3%' }}
                                    onClick={() => { handleNext(); handleSelectCountry(country.label) }}
                                >
                                    <img style={{ width: 50, height: 50 }} src={country.src} alt={country.label}></img>
                                    <JLabel
                                        variant='subtitle2'
                                    >
                                        {country.label}
                                    </JLabel>
                                </Paper>
                            </ImageButton>
                        </Grid>

                    ))
                    :
                    "No hay paises"
            }
        </>
    )

}

const StepTwoContent: React.FC<any> = (): JSX.Element => {

    const { transaction, resetCalculatorForm, handleTransactionInputChange }: any = useExchange();

    const setSource = (value: any) => {
        let events = [
            {
                target: {
                    name: 'comission',
                    value: value.comission
                }
            },
            {
                target: {
                    name: 'source',
                    value: value.sourceName
                }
            },
            {
                target: {
                    name: 'target',
                    value: value.targetName
                }
            }
        ]
        events.map(event => handleTransactionInputChange(event))
    }
    const setTarget = (finalValue: any) => {
        const events = [
            {
                target: {
                    name: 'valueSent',
                    value: finalValue.value
                }
            },
            {
                target: {
                    name: 'target',
                    value: finalValue.targetName
                }
            },
        ]
        events.map(event => handleTransactionInputChange(event))
    }
    const getSourceValue = (value: any) => {
        const event = {
            target: {
                name: 'valueToSent',
                value
            }
        }
        handleTransactionInputChange(event)
    }

    const resetExchanges = () => {
        resetCalculatorForm()
    }

    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={12}
            key={'stepThree-1'}
        >
            <Calculator resetExchanges={resetExchanges} isExternal={true} setSource={setSource} setTarget={setTarget} getSourceValue={getSourceValue} />
            {
                !(transaction.source) &&
                <label style={{ margin: '5%' }} >
                    <small style={{ color: 'red' }}>Ingresa todos los datos correspondientes. </small>
                </label>
            }
        </Grid>
    )

}

const StepThreeContent: React.FC<any> = ({ classes }): JSX.Element => {

    const { transaction, handleTransactionInputChange }: any = useExchange();

    return (
        <div className={classes.form}>
            <Grid
                key={'stepFour-1'}
                style={{ padding: "1.5%", width: '100%' }}
                container
                direction="row"
                alignItems="center"
                justify="center"
                spacing={4}
            >
                <Grid item xs={12} sm={12} md={6}>
                    <JInput
                        id="email"
                        name="reciptEmail"
                        label="Correo"
                        variant="outlined"
                        margin="normal"
                        required={true}
                        autoFocus={false}
                        placeholder="example@yopmail.com"
                        value={transaction?.reciptEmail ? transaction.reciptEmail : ''}
                        error={transaction?.errorMessage?.reciptEmail ? true : false}
                        errorText={transaction?.errorMessage?.reciptEmail}
                        onChange={handleTransactionInputChange}
                        classes={classes.formControl}
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <JInput
                        id="email"
                        name="reciptName"
                        label="Beneficiario"
                        variant="outlined"
                        margin="normal"
                        required={true}
                        autoFocus={false}
                        placeholder="John due"
                        classes={classes.formControl}
                        value={transaction?.reciptName ? transaction.reciptName : ''}
                        error={transaction?.errorMessage?.reciptName ? true : false}
                        errorText={transaction?.errorMessage?.reciptName}
                        onChange={handleTransactionInputChange}
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AssignmentIndIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <JInput
                        id="email"
                        name="reciptPhone"
                        label="Teléfono del Beneficiario"
                        variant="outlined"
                        margin="normal"
                        required={true}
                        autoFocus={false}
                        placeholder="41255877889"
                        classes={classes.formControl}
                        value={transaction?.reciptPhone ? transaction.reciptPhone : ''}
                        error={transaction?.errorMessage?.reciptPhone ? true : false}
                        errorText={transaction?.errorMessage?.reciptPhone}
                        onChange={handleTransactionInputChange}
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneAndroidIcon /> { '+'}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <JInput
                        id="email"
                        name="reciptAccount"
                        label="Número de cuenta"
                        variant="outlined"
                        margin="normal"
                        required={true}
                        autoFocus={false}
                        placeholder="5018-7855-58-788-9"
                        classes={classes.formControl}
                        value={transaction?.reciptAccount ? transaction.reciptAccount : ''}
                        error={transaction?.errorMessage?.reciptAccount ? true : false}
                        errorText={transaction?.errorMessage?.reciptAccount}
                        onChange={handleTransactionInputChange}
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBalanceIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )

}

const StepFourContent: React.FC<any> = ({ classes }): JSX.Element => {

    const { transaction, executeTransaction }: any = useExchange();

    return (
        <div className={classes.form}>
            <Grid
                key={'stepFour-1'}
                style={{ padding: "1.5%", width: '100%' }}
                container
                direction="row"
                alignItems="center"
                justify="center"
                spacing={8}
            >
                <Grid item xs={12} sm={12} md={12}>
                    <JLabel
                        component="h1"
                        variant="h6"
                    >
                        Comprobante de envío
                    </JLabel>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper
                        elevation={4}
                    >
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justify="center"
                            spacing={4}
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <JLabel
                                    component="h3"
                                    variant="subtitle2"
                                >
                                    Datos de ubicación y monto
                            </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Destino: {transaction.targetCountry}
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Comisión: {transaction.comission} %
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Moneda: {transaction.target}
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Cantidad a enviar: {transaction.valueToSent} {transaction.source}
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Cantidad a recibir: {transaction.valueSent} {transaction.target}
                                </JLabel>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper
                        elevation={4}
                    >
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justify="center"
                            spacing={4}
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <JLabel
                                    component="h3"
                                    variant="subtitle2"
                                >
                                    Datos de cuenta de Beneficiario
                            </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Nombre: {transaction.reciptName}
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Correo: {transaction.reciptEmail}
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Moneda: {transaction.target}
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Cuenta: {transaction.reciptAccount}
                                </JLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <JLabel
                                    component="h1"
                                    variant="subtitle2"
                                >
                                    Teléfono: + {transaction.reciptPhone}
                                </JLabel>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                    <JButton
                        disabled={!areTransactionValid(transaction)}
                        onClick={() => executeTransaction(transaction)}
                        title='Finalizar'
                    >

                    </JButton>
                </Grid>
            </Grid>
        </div>
    )

}

const steps = (classes: any, handleNext: Function, transaction: any, handleTransactionInputChange: Function) => {

    const steps = [
        {
            label: 'Selecciona a donde quieres enviar el dinero',
            content: (<StepOneContent handleNext={handleNext} transaction={transaction} handleTransactionInputChange={handleTransactionInputChange} />)
        },
        {
            label: 'Ingese el valor y la moneda',
            content: (<StepTwoContent handleNext={handleNext} classes={classes} transaction={transaction} handleTransactionInputChange={handleTransactionInputChange} />)
        },
        {
            label: 'Ingresa datos de la cuenta bancaria a enviar el dinero.',
            content: (<StepThreeContent classes={classes} transaction={transaction} handleTransactionInputChange={handleTransactionInputChange} />)
        },
        {
            label: 'Verifica los datos.',
            content: (<StepFourContent classes={classes} />)
        }
    ];

    return steps;
}

const useStyles = makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "50px",
            textAlign: 'center'
        }
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
    stepText: {
        fontSize: 100
    },
    root: {
        width: "100%",
        margin: "10px 0px 10px 0px",
        background: 'transparent !important'
    },
    lineal: {
        backgroundColor: '#8bc34a !important'
    },
    input: {
        display: "none"
    },
    buttonLetter: {
        color: 'black'
    },
    form: {
        textAlign: 'center',
        width: "100%",
        marginTop: theme.spacing(1),
    },
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        marginBottom: 20
    }
}));

export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);

    const classes = useStyles();

    const { transaction, handleTransactionInputChange } = useExchange()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (step: any) => {
        setActiveStep(step);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div style={{ height: '100%', width: '100%', marginBottom: '15%' }}>
            <Grid
                container
                alignItems='center'
                direction='column'
            >

                <Paper
                    className={classes.paper}
                    elevation={3}
                >
                    <JLabel
                        component="h1"
                        variant="h6"
                        classes={classes.colorText}
                    >
                        Proceso de envío de Dinero ({((activeStep + 1) / 4) * 100}%)
                    </JLabel>
                    <MobileStepper
                        variant="progress"
                        steps={5}
                        position="static"
                        activeStep={activeStep === 0 ? 1 : (activeStep + 1)}
                        className={classes.root}
                        nextButton={null}
                        backButton={null}
                        LinearProgressProps={{
                            style: {
                                width: '100%'
                            },
                            className: 'lineal'
                        }}
                    />
                </Paper>
                <Card
                    variant="outlined"
                    style={{ marginTop: 10, width: '90%', padding: 35 }}
                >
                    <CardContent>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {
                                steps(classes, handleNext, transaction, handleTransactionInputChange).map((step: any, index: any) => (

                                    <Step key={step.label}>
                                        <StepLabel
                                            className={classes.title}
                                            onClick={() => handleBack(index)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {step.label}
                                        </StepLabel>
                                        <StepContent>
                                            <Box>
                                                <Grid
                                                    container
                                                    alignItems='center'
                                                    direction='row'
                                                >
                                                    {step.content}
                                                </Grid>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                ))}
                        </Stepper>
                        {
                            activeStep === steps.length && (
                                <Paper square elevation={0} style={{ textAlign: 'center' }} >
                                    <Typography>All steps completed - you&apos;re finished</Typography>
                                    <Button onClick={() => handleReset()}>
                                        OK
                                    </Button>
                                </Paper>
                            )
                        }
                    </CardContent>

                </Card>
            </Grid>
        </div >
    );
}
