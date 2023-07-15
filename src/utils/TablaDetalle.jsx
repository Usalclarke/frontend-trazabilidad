import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Collapse, Typography, Box, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment/moment';

function Row({ row, columns, handleEdit, handleDelete, handleState }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {(Object.values(columns)).map((field, index) => (
                    <TableCell
                        key={index}
                        sx={{ fontSize: '16px' }}
                        align={index === 0 ? "left" : "right"}
                        component={index === 0 ? "th" : ""}
                        scope={index === 0 ? "row" : ""}
                    >
                        {field.includes('fecha') && row[field] ? moment(row[field]).format('YYYY/MM/DD') : row[field]}
                    </TableCell>
                ))
                }
                <TableCell align="right">
                    {handleEdit ? <Button sx={{ fontSize: '14px' }} onClick={() => handleEdit(row)}>Editar</Button> : null}
                    {handleDelete ? <Button sx={{ fontSize: '14px' }} onClick={() => handleDelete(row)}>Eliminar</Button> : null}
                    {handleState ? <Button sx={{ fontSize: '14px' }} onClick={() => handleState(row)}>Cambiar Estado</Button> : null}
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: '16px' }}>
                                Detalle
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '15px' }}>ID</TableCell>
                                        <TableCell sx={{ fontSize: '15px' }}>Producto</TableCell>
                                        <TableCell sx={{ fontSize: '15px' }} align="right">Descripcion</TableCell>
                                        <TableCell sx={{ fontSize: '15px' }} align="right">Unidades</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.pedidoDetalleList.map((detalle, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '16px' }} >
                                                {detalle.idpedidoDetalle}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: '15px' }} >{detalle.idproducto.codProducto}</TableCell>
                                            <TableCell sx={{ fontSize: '15px' }} align="right">{detalle.idproducto.descripcion}</TableCell>
                                            <TableCell sx={{ fontSize: '15px' }} align="right">{detalle.unidades}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    handleState: PropTypes.func
};


const TablaDetalle = ({ columns, data, handleEdit, handleDelete }) => {

    const [open, setOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState({});

    const handleOpen = (row) => {
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
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow >
                            {(Object.keys(columns)).map((column, index) => (
                                <TableCell key={index} sx={{ fontSize: '16px' }} align={index === 0 ? "left" : "right"}>{column}</TableCell>
                            ))}
                            <TableCell sx={{ fontSize: '16px' }} align="right">Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row,index) => (
                            <Row key={index} row={row} columns={columns} handleEdit={handleEdit} handleDelete={handleOpen} />
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
TablaDetalle.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
}

const TablaEstado = ({ columns, data, handleState }) => {

    const [open, setOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState({});

    const handleOpen = (row) => {
        setOpen(true);
        setRowSelected(row)
    };
    const handleClose = () => {
        setOpen(false);
        setRowSelected({})
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow >
                            {(Object.keys(columns)).map((column, index) => (
                                <TableCell key={index} sx={{ fontSize: '16px' }} align={index === 0 ? "left" : "right"}>{column}</TableCell>
                            ))}
                            <TableCell sx={{ fontSize: '16px' }} align="right">Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <Row key={index} row={row} columns={columns} handleState={handleOpen} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {rowSelected ? <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true} 
                maxWidth={'sm'}
            >
                <DialogContent>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primario btn-block btn-custom mt-10"
                            name="pasarProduccion"
                            onClick={()=> handleState(rowSelected,'pasarProduccion')}
                        >
                            Pasar a Produccion
                        </button>
                        <button
                            type="button"
                            className="btn btn-primario btn-block btn-custom"
                            name="pasarTerminado"
                            onClick={()=> handleState(rowSelected,'pasarTerminado')}
                        >
                            Pasar a Terminado
                        </button>
                    </div>
                </DialogContent>
            </Dialog> : null}
        </>
    );
}

TablaEstado.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    handleState: PropTypes.func,
}

export {
    TablaDetalle,
    TablaEstado
}
