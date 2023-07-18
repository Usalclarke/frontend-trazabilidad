import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useState } from 'react';

const Tabla = ({ handleEdit, handleDelete, columns, data }) => {

    const [open, setOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState({});

    const handleOpen = (row) => {
        console.log(row)
        setOpen(true);
        setRowSelected(row)
    };
    const handleClose = () => {
        setOpen(false);
        setRowSelected({})
    };
    const handleConfirm = () => {
        handleDelete(rowSelected)
        handleClose();
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            {(Object.keys(columns)).map((column, index) => (
                                <TableCell key={column} sx={{ fontSize: '16px' }} align={index === 0 ? "left" : "right"}>{column}</TableCell>
                            ))}
                            <TableCell sx={{ fontSize: '16px' }} align="right">Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {(Object.values(columns)).map((field, index) => (
                                    <TableCell
                                        key={field}
                                        sx={{ fontSize: '16px' }}
                                        align={index === 0 ? "left" : "right"}
                                        component={index === 0 ? "th" : ""}
                                        scope={index === 0 ? "row" : ""}
                                    >   
                                        {row[field]}
                                    </TableCell>
                                ))
                                }
                                <TableCell align="right">
                                    <Button sx={{ fontSize: '14px' }} onClick={() => handleEdit(row)}>Editar</Button>
                                    {handleDelete ? <Button sx={{ fontSize: '14px' }} onClick={() => handleOpen(row)}>Eliminar</Button> : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {rowSelected ? <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '14px' }}>
                    {"Eliminar registro"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '14px' }}>
                        Esta seguro que desea eliminar el registro ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontSize: '14px' }} onClick={() => handleClose()}>Cancelar</Button>
                    <Button sx={{ fontSize: '14px' }} onClick={() => handleConfirm()} autoFocus>Eliminar</Button>
                </DialogActions>
            </Dialog> : null}
        </>
    );
}

Tabla.propTypes = {
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
}
export default Tabla;
