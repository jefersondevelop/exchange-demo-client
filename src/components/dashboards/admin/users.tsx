import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useUser } from '../../../context/users'
import { useEffect } from 'react';
import JLabel from '@jelements/Label';
import { makeStyles } from '@material-ui/core';

interface Column {
    id: 'id' | 'name' | 'email' | 'role' | 'country';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    {
        id: 'email',
        label: 'Correo',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'role',
        label: 'Rol',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'country',
        label: 'País actual',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
];

const useStyles = makeStyles((theme) => ({
    label: {
        padding: 15
    }
}));

export default function UserList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { users, getAllUsers }: any = useUser();
    const classes = useStyles();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getAllUsers();
    }, [])

    const rows = (users: any[]) => {
        if (!users || users.length === 0) {
            return []
        }

        return users.map((user: any) => {

            return { id: user.id, name: user.profile?.username, email: user.email, role: user.role?.name, country: user.profile?.currentCountry };

        })
    }

    return (
        <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <JLabel
                classes={classes.label}
                variant='h6'
            >
                Listado de Usuarios
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
                            (users && users.length > 0) ?
                                rows(users)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
