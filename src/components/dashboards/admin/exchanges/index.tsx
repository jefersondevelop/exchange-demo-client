import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import JLabel from '@jelements/Label';
import { Backdrop, IconButton, makeStyles, Modal, Tooltip, Zoom } from '@material-ui/core';
import { useExchange } from '../../../../context/exchange';
import { useEffect } from 'react';
import JButton from '@jelements/Button';
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

interface Column {
    id: 'source' | 'target' | 'comission' | 'finalValue' | 'type' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'source', label: 'Fuente', minWidth: 170 },
    { id: 'target', label: 'Destino', minWidth: 100 },
    {
        id: 'comission',
        label: 'Comisión',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'finalValue',
        label: 'Valor',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'type',
        label: 'Tipo',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'actions',
        label: 'Acciones',
        minWidth: 170,
        align: 'center',
    }
];

const useStyles = makeStyles((theme) => ({
    label: {
        padding: 15
    },
    green: {
        color: 'green'
    },
    margin: {
        margin: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 5, 5, 5),
        borderRadius: 10
    },
    iconButton: {
        fontSize: 150
    }
}));

export default function ExchangeList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { exchanges, getExchanges, deleteExchange, getExchangeDetails }: any = useExchange();
    const [open, setOpen] = React.useState(false);
    const [uuidToDelete, setUUUID] = React.useState<string | undefined>(undefined)

    const handleOpen = (id?: string) => {
        if (id) {
            setUUUID(id)
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getExchanges()
    }, [])

    const rows = (exchanges: any[]) => {
        if (!exchanges || exchanges.length === 0) {
            return []
        }

        return exchanges.map((exchange: any) => {

            return {
                source: exchange.sourceName,
                target: exchange.targetName,
                comission: exchange.comission,
                finalValue: exchange.finalValue,
                type: exchange.type,
                actions: (

                    <div>
                        <Link to={`/exchanges/${exchange.id}/edit`}>
                            <Tooltip title='Editar'>
                                <IconButton onClick={() => getExchangeDetails(exchange.id)} aria-label="edit" color="primary" className={`${classes.margin}`}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Tooltip title='Eliminar'>
                            <IconButton onClick={() => handleOpen(exchange.id)} aria-label="delete" color="secondary" className={classes.margin}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>

                )
            };

        })
    }

    return (
        <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <JLabel
                classes={classes.label}
                variant='h6'
            >
                Listado de Divisas
            </JLabel>
            <TableContainer style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (exchanges && exchanges.length > 0) ?
                                rows(exchanges)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                :
                                                                value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                                :
                                <JLabel
                                    classes={classes.label}
                                    variant='subtitle2'
                                >
                                    No hay datos registrados
                                </JLabel>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows(exchanges).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div style={{ float: 'right', padding: 15 }}>
                <Link to='/exchanges/new'>
                    <JButton
                        title='Agregar nueva divisa'
                        startIcon={<ControlPointIcon></ControlPointIcon>}
                    >
                    </JButton>
                </Link>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Zoom in={open}>
                    <div className={classes.paper} >
                        <JLabel
                            variant='h5'
                        >
                            ¿Deseas Eliminar el registro?
                        </JLabel>
                        <small>Recuerde que está acción es irreversible</small>
                        <div>
                            <IconButton onClick={() => { deleteExchange(uuidToDelete); handleClose() }} aria-label="edit" color="primary" className={classes.margin}>
                                <CheckCircleIcon fontSize='large' />
                            </IconButton>
                            <IconButton onClick={handleClose} aria-label="delete" color="secondary" className={classes.margin}>
                                <CancelIcon fontSize='large' />
                            </IconButton>
                        </div>
                    </div>
                </Zoom>
            </Modal>
        </Paper>
    );
}
