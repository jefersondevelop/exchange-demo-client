import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { makeStyles } from '@material-ui/core/styles';
import JInput from '@jelements/Input';
import {
    CardContent,
    Grid,
    Card,
    CardHeader,
    InputAdornment,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Avatar,
    Fab,
    Tooltip,
    CircularProgress,
    IconButton,
    Switch
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import EmailIcon from '@material-ui/icons/Email';
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment'
import WorkIconOutlined from '@material-ui/icons/WorkOutline';

import React, { useEffect, useState } from 'react';
import { blue } from '@material-ui/core/colors';
import Zoom from '@material-ui/core/Zoom';
import JInputControlLabel from '@jelements/InputControlLabel';
import { countries } from '../../../tools/countries';
import RoomIcon from '@material-ui/icons/Room';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import DialpadIcon from '@material-ui/icons/Dialpad';
import JButton from '@jelements/Button';
import JLabel from '@jelements/Label';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useProfile } from '../../../context/profile';
import { useMain } from '../../../context/mainContext';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ModalImage from '@jelements/ModalImage';

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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 25
    },
    pos: {
        marginBottom: 12,
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
    calendar: {
        marginLeft: '-10px !important'
    },
    select: {
        marginTop: "8px",
        width: '100%',
        marginLeft: 10
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    button: {
        color: blue[900],
        margin: 10,
        height: "inherit",
        width: 'inherit'
    },
    input: {
        display: "none"
    },
    spaceBetween: {
        paddingBottom: 35
    },
    label: {
        marginTop: 5
    },
    selectItem: {
        marginLeft: 10
    },
    buttonSubmit: {
        width: '50%',
        height: 40
    },
    buttonLetter: {
        color: 'black'
    },
    imgLoad: {
        width: "115px !important",
        height: "115px !important",
        position: "absolute",
        background: "#d7e0dd78",
        borderRadius: "100%",
        padding: "38px"
    },
    buttonLoad: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
    customToolTip: {
        flex: "0 0 auto",
        color: "rgba(0, 0, 0, 0.26)",
        padding: 12,
        overflow: "visible",
        textAlign: "center",
        backgroundColor: "#80808038",
        fontSize: "medium",
        width: '50%',
        height: 40,
        borderRadius: 0
    },
    selectChangePassword: {
        marginTop: -25
    }
}));


const Profile = () => {

    const classes = useStyles();
    const { user }: any = useMain();
    const {
        getProfile,
        handleProfileInputChange,
        updateProfile,
        updateProfileImg,
        isFetchingImg,
        isFetchingBasic,
        isValidForm,
        validToChangePass
    }: any = useProfile();

    const [changePassword, setChangePassword] = useState(false);

    const onChangePassword = () => {
        setChangePassword(!changePassword);
    }

    useEffect(() => {
        getProfile();
    }, [user.email, getProfile])

    return (

        <div className={classes.wrapper}>
            {/* User personal info */}
            <Grid container className={classes.spaceBetween}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={`${classes.root} ${classes.wrapper}`} variant="outlined">
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            {
                                (isFetchingImg) ?
                                    <label>
                                        <Fab component="span" className={classes.button}>
                                            <Avatar
                                                alt={user.email + ' foto'}
                                                src={`${process.env.REACT_APP_API_URL}/files/users/${user?.profile?.selfie ? user.profile.selfie : undefined}`}
                                                className={classes.large}
                                            />
                                            <CircularProgress color="inherit" className={classes.imgLoad} />
                                        </Fab>
                                    </label>
                                    :
                                    <>
                                        <label htmlFor="contained-button-file">
                                            <Tooltip TransitionComponent={Zoom} title="Cambiar foto" aria-label="Cambiar foto">
                                                <Fab component="span" className={classes.button}>
                                                    <Avatar
                                                        alt={user.email + ' foto'}
                                                        src={`${process.env.REACT_APP_API_URL}/files/users/${user?.profile?.selfie ? user.profile.selfie : undefined}`}
                                                        className={classes.large}
                                                    />
                                                </Fab>
                                            </Tooltip>
                                        </label>
                                        <JInput
                                            id="contained-button-file"
                                            type="file"
                                            name="Archivo"
                                            label="Imagen de perfil"
                                            classes={classes.input}
                                            onChange={updateProfileImg}
                                        >
                                        </JInput>
                                    </>
                            }
                        </Grid>
                        <CardHeader
                            title="Datos personales"
                            className={classes.textCenter}
                        ></CardHeader>
                        <CardContent >
                            <div className={classes.form}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <JInput
                                            id='username'
                                            label="Nombre"
                                            required={true}
                                            name="username"
                                            placeholder="Nombre"
                                            error={user?.errorMessage?.profile?.username ? true : false}
                                            errorText={user?.errorMessage?.profile?.username ? user.errorMessage.profile.username : ''}
                                            onChange={handleProfileInputChange}
                                            value={(user && user.profile) ? user.profile.username : ''}
                                            props={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <JInput
                                            id='lastname'
                                            label="Apellido"
                                            name="lastname"
                                            placeholder="Apellido"
                                            onChange={handleProfileInputChange}
                                            error={user?.errorMessage?.profile?.lastname ? true : false}
                                            errorText={user?.errorMessage?.profile?.lastname ? user.errorMessage.profile.lastname : ''}
                                            value={(user && user.profile) ? user.profile.lastname : ''}
                                            props={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <JInput
                                            id='email'
                                            label="Correo Electrónico"
                                            required={true}
                                            disabled={true}
                                            name="email"
                                            placeholder="example@domain.com"
                                            value={(user) ? user.email : ''}
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
                                            id='phoneNumber'
                                            label="Teléfono"
                                            name="phoneNumber"
                                            placeholder="588845567"
                                            onChange={handleProfileInputChange}
                                            error={user?.errorMessage?.profile?.phoneNumber ? true : false}
                                            errorText={user?.errorMessage?.profile?.phoneNumber ? user.errorMessage.profile.phoneNumber : ''}
                                            value={(user && user.profile) ? user.profile.phoneNumber : ''}
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
                                        <KeyboardDatePicker
                                            autoOk
                                            id='birthdate'
                                            showTodayButton
                                            variant="dialog"
                                            label="Fecha de nacimiento "
                                            format="DD/MM/YYYY"
                                            value={(user) ? moment(user.profile.birthdate) : moment()}
                                            InputAdornmentProps={{ position: "start", className: classes.calendar }}
                                            onChange={(e: any) => {
                                                let newE = {
                                                    target: {
                                                        name: 'birthdate',
                                                        value: e?.format("YYYY/MM/DD")
                                                    }
                                                };
                                                handleProfileInputChange(newE)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <FormControl className={classes.select}>
                                            <InputLabel
                                                id="demo-simple-select-helper-label"
                                            >Profesión</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={(user && user.profile) ? user.profile.occupation : '-1'}
                                                error={user?.errorMessage?.profile?.occupation ? true : false}
                                                name="occupation"
                                                onChange={handleProfileInputChange}
                                                startAdornment={<InputAdornment position="start">
                                                    <WorkIconOutlined />
                                                </InputAdornment>}
                                            >
                                                <MenuItem value="-1">Ninguno
                                                </MenuItem>
                                                <MenuItem value={"Ingeniero/a"}>Ingeniero/a</MenuItem>
                                                <MenuItem value={"Médico"}>Médico</MenuItem>
                                                <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                                                <MenuItem value={"Comerciante"}>Comerciante</MenuItem>
                                                <MenuItem value={"Empresario/a"}>Empresario/a</MenuItem>
                                                <MenuItem value={"Abogado/a"}>Abogado/a</MenuItem>
                                                <MenuItem value={"Administrador/a"}>Administrador/a</MenuItem>
                                                <MenuItem value={"Economista"}>Economista</MenuItem>
                                                <MenuItem value={"Profesor/a"}>Profesor/a</MenuItem>
                                                <MenuItem value={"Programador/a"}>Programador/a</MenuItem>
                                                <MenuItem value={"Amo/a de casa"}>Amo/a de casa</MenuItem>
                                                <MenuItem value={"Artista ó Artesano/a"}>Artista ó Artesano/a</MenuItem>
                                                <MenuItem value={"Rentista de Capital"}>Rentista de Capital</MenuItem>
                                                <MenuItem value={"Policia o Militar"}>Policia o Militar</MenuItem>
                                                <MenuItem value={"Agricultor/a, Ganadero/a ó Pescador/a"}>Agricultor/a, Ganadero/a ó Pescador/a</MenuItem>
                                                <MenuItem value={"Técnico/a"}>Técnico/a</MenuItem>
                                                <MenuItem value={"Otra"}>Otra</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* User personal identification */}
            <Grid container className={classes.spaceBetween}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={`${classes.root} ${classes.wrapper}`} variant="outlined">
                        <CardHeader
                            title="Datos personales de identificación"
                            className={classes.textCenter}
                        ></CardHeader>
                        <CardContent >
                            <div className={classes.form}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <FormControl className={classes.select}>
                                            <InputLabel id="demo-simple-select-filled-label">Nacionalidad</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                label="Nacionalidad"
                                                name="birthCountry"
                                                onChange={handleProfileInputChange}
                                                error={user?.errorMessage?.profile?.birthCountry ? true : false}
                                                value={user?.profile?.birthCountry ? user.profile.birthCountry : ''}
                                                startAdornment={<InputAdornment position="start">
                                                    <RoomIcon />
                                                </InputAdornment>}
                                            >
                                                <MenuItem key='-1' value='-1'>
                                                    Seleccione una nacionalidad
                                                </MenuItem>
                                                {
                                                    countries.map(country => (

                                                        <MenuItem key={country.label} value={country.value}>
                                                            <JInputControlLabel
                                                                classes={classes.selectItem}
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
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <KeyboardDatePicker
                                            autoOk
                                            id='documentDate'
                                            showTodayButton
                                            variant="dialog"
                                            label="Fecha de expedición "
                                            format="DD/MM/YYYY"
                                            InputAdornmentProps={{ position: "start", className: classes.calendar }}
                                            value={(user) ? moment(user.profile.documentDate) : moment()}
                                            onChange={(e: any) => {
                                                let newE = {
                                                    target: {
                                                        name: 'documentDate',
                                                        value: e?.format("YYYY/MM/DD")
                                                    }
                                                };
                                                handleProfileInputChange(newE)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <FormControl className={classes.select}>
                                            <InputLabel id="demo-simple-select-filled-label">Tipo de documento</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                label="Tipo de documento"
                                                name="documentType"
                                                onChange={handleProfileInputChange}
                                                error={user?.errorMessage?.profile?.documentType ? true : false}
                                                value={user?.profile?.documentType ? user.profile.documentType : '-1'}
                                                startAdornment={<InputAdornment position="start">
                                                    <FingerprintIcon />
                                                </InputAdornment>}
                                            >
                                                <MenuItem key='-1' value='-1'>
                                                    Seleccione un tipo de documento
                                                </MenuItem>
                                                {
                                                    ['Cédula de identidad', 'Cédula Extranjera', 'Pasaporte', 'Licencia de conducir'].map(documentType => (

                                                        <MenuItem key={documentType} value={documentType}>
                                                            {documentType}
                                                        </MenuItem>


                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <JInput
                                            id='documentNumber'
                                            label="Número de documento"
                                            name="documentNumber"
                                            placeholder="1234567899"
                                            onChange={handleProfileInputChange}
                                            error={user?.errorMessage?.profile?.documentNumber ? true : false}
                                            errorText={user?.errorMessage?.profile?.documentNumber ? user.errorMessage.profile.documentNumber : ''}
                                            value={user?.profile?.documentNumber ? user.profile.documentNumber : ''}
                                            props={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DialpadIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* User localization */}
            <Grid container className={classes.spaceBetween}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={`${classes.root} ${classes.wrapper}`} variant="outlined">
                        <CardHeader
                            title="Dirección"
                            className={classes.textCenter}
                        ></CardHeader>
                        <CardContent >
                            <div className={classes.form}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <JInput
                                            id='address'
                                            label="Dirección"
                                            name="address"
                                            placeholder="Dirección"
                                            onChange={handleProfileInputChange}
                                            error={user?.errorMessage?.profile?.address ? true : false}
                                            errorText={user?.errorMessage?.profile?.address ? user.errorMessage.profile.address : ''}
                                            value={user?.profile?.address ? user.profile.address : ''}
                                            props={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <RoomIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <JInput
                                            id='city'
                                            label="Dirección"
                                            name="city"
                                            placeholder="Ciudad"
                                            onChange={handleProfileInputChange}

                                            error={user?.errorMessage?.profile?.address ? true : false}
                                            errorText={user?.errorMessage?.profile?.address ? user.errorMessage.profile.address : ''}
                                            value={user?.profile?.address ? user.profile.address : ''}
                                            props={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <RoomIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl className={classes.select}>
                                            <InputLabel id="demo-simple-select-filled-label">País</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                label="País"
                                                name="currentCountry"
                                                onChange={handleProfileInputChange}
                                                error={user?.errorMessage?.profile?.currentCountry ? true : false}
                                                value={user?.profile?.currentCountry ? user.profile.currentCountry : '-1'}
                                                startAdornment={<InputAdornment position="start">
                                                    <RoomIcon />
                                                </InputAdornment>}
                                            >
                                                <MenuItem key='-1' value='-1'>
                                                    Seleccione un país
                                                </MenuItem>
                                                {
                                                    countries.map(country => (

                                                        <MenuItem key={country.label} value={country.value}>
                                                            <JInputControlLabel
                                                                classes={classes.selectItem}
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
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* DNI Information */}
            <Grid container className={classes.spaceBetween}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={`${classes.root} ${classes.wrapper}`} variant="outlined">
                        <CardHeader
                            title="Datos personales de identificación"
                            className={classes.textCenter}
                        ></CardHeader>
                        <CardContent >
                            <div className={classes.form}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        {
                                            (user?.profile?.dniFrontPreview) ?
                                                <ModalImage image={user?.profile?.dniFrontPreview} title="DNI Frontal" />
                                                :
                                                (user?.profile?.dniFront) ?
                                                    <ModalImage image={`${process.env.REACT_APP_API_URL}/files/dnis/${user?.profile?.dniFront ? user.profile.dniFront : undefined}`} title="DNI Frontal" />
                                                    :
                                                    <>
                                                        <JButton
                                                            variant="contained"
                                                            component="label"
                                                            title='DNI frontal'
                                                            color='inherit'
                                                            classes={classes.buttonLetter}
                                                            startIcon={<CloudUploadIcon />}
                                                        >
                                                            <JInput
                                                                id="contained-button-file"
                                                                label="DNI frontal"
                                                                name="dniFront"
                                                                onChange={handleProfileInputChange}
                                                                type="file"
                                                                classes={classes.input}
                                                            ></JInput>
                                                        </JButton>
                                                        <JLabel
                                                            classes={classes.label}
                                                            component='h5'
                                                            variant='subtitle2'
                                                            color={(user?.errorMessage?.profile?.dniFront) && 'error'}
                                                        >
                                                            {
                                                                (user?.errorMessage?.profile?.dniFront) ?
                                                                    user?.errorMessage?.profile?.dniFront
                                                                    :
                                                                    "No ha ingresado una imágen"
                                                            }
                                                        </JLabel>
                                                    </>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        {
                                            (user?.profile?.dniBackPreview) ?
                                                <ModalImage image={user?.profile?.dniBackPreview} title="DNI Posterior" />
                                                :
                                                (user?.profile?.dniBack) ?
                                                    <ModalImage image={`${process.env.REACT_APP_API_URL}/files/dnis/${user?.profile?.dniBack ? user.profile.dniBack : undefined}`} title="DNI Posterior" />
                                                    :
                                                    <>
                                                        <JButton
                                                            variant="contained"
                                                            component="label"
                                                            title='DNI Posterior'
                                                            color='inherit'
                                                            classes={classes.buttonLetter}
                                                            startIcon={<CloudUploadIcon />}
                                                        >
                                                            <JInput
                                                                id="contained-button-file"
                                                                label="DNI Posterior"
                                                                name="dniBack"
                                                                onChange={handleProfileInputChange}
                                                                type="file"
                                                                classes={classes.input}
                                                            ></JInput>
                                                        </JButton>
                                                        <JLabel
                                                            classes={classes.label}
                                                            component='h5'
                                                            variant='subtitle2'
                                                            color={(user?.errorMessage?.profile?.dniBack) && 'error'}
                                                        >
                                                            {
                                                                (user?.errorMessage?.profile?.dniBack) ?
                                                                    user?.errorMessage?.profile?.dniBack
                                                                    :
                                                                    "No ha ingresado una imágen"
                                                            }
                                                        </JLabel>
                                                    </>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* Password change */}
            <Grid container className={classes.spaceBetween}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={`${classes.root} ${classes.wrapper}`} variant="outlined">
                        <CardHeader
                            title="Cambio de contraseña"
                            className={classes.textCenter}
                        ></CardHeader>
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justify="center"
                                className={classes.selectChangePassword}
                            >
                                <Grid item xs={12} sm={12} md={12}>
                                    <JInputControlLabel
                                        control={
                                            <Tooltip TransitionComponent={Zoom} title="Cambiar contraseña" aria-label="Cambiar contraseña">
                                                <Switch
                                                    checked={changePassword}
                                                    onChange={onChangePassword}
                                                    size='medium'
                                                    color="default"
                                                    value={changePassword}
                                                    checkedIcon={<RadioButtonCheckedIcon color="primary" fontSize='small'></RadioButtonCheckedIcon  >}
                                                    icon={<RadioButtonUncheckedIcon color="primary" fontSize='small'></RadioButtonUncheckedIcon>}
                                                />
                                            </Tooltip>
                                        }
                                        label={""}
                                    />
                                </Grid>
                            </Grid>
                            {
                                (changePassword) &&
                                <form className={classes.form}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={false} sm={false} md={2}></Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <JInput
                                                id='password'
                                                label="Contraseña actual"
                                                name="password"
                                                placeholder="*************"
                                                type="password"
                                                onChange={handleProfileInputChange}
                                                value={user?.password ? user.password : ''}
                                                autoComplete='password'
                                                error={user?.errorMessage?.password ? true : false}
                                                errorText={user?.errorMessage?.password ? user.errorMessage.password : ''}
                                                props={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={false} sm={false} md={2}></Grid>
                                    </Grid>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <JInput
                                                id='newPassword'
                                                label="Nueva contraseña"
                                                name="newPassword"
                                                placeholder="*************"
                                                type="password"
                                                onChange={handleProfileInputChange}
                                                value={user?.newPassword ? user.newPassword : ''}
                                                autoComplete='password'
                                                error={user?.errorMessage?.newPassword ? true : false}
                                                errorText={user?.errorMessage?.newPassword ? user.errorMessage.newPassword : ''}
                                                props={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <JInput
                                                id='confirmPassword'
                                                label="Confirmar nueva contraseña"
                                                name="confirmPassword"
                                                placeholder="*************"
                                                type="password"
                                                onChange={handleProfileInputChange}
                                                autoComplete='password'
                                                value={user?.confirmPassword ? user.confirmPassword : ''}
                                                error={user?.errorMessage?.confirmPassword ? true : false}
                                                errorText={user?.errorMessage?.confirmPassword ? user.errorMessage.confirmPassword : ''}
                                                props={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            }
                        </CardContent>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            {
                                (!isValidForm(user.profile)) ?
                                    <Tooltip title="Ingrese valores válidos para tu perfil.">
                                        <IconButton className={classes.customToolTip} >
                                            <SaveIcon fontSize={"small"} />
                                            <span style={{ fontSize: 'small', marginLeft: 5 }}><strong>GUARDAR DATOS</strong></span>
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <JButton
                                        title='Guardar datos'
                                        variant='contained'
                                        classes={classes.buttonSubmit}
                                        startIcon={<SaveIcon />}
                                        disabled={(isFetchingBasic || !isValidForm(user.profile) || (changePassword && !validToChangePass(user)))}
                                        onClick={() => updateProfile(user, changePassword)}
                                    >
                                        {
                                            (isFetchingBasic) && <CircularProgress size={24} color="primary" className={classes.buttonLoad} />
                                        }
                                    </JButton>
                            }
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div >

    )

}

export default Profile;