import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { UserState } from '../context';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableComp = (props) => {

    const {isAdmin,isDoneFilter,setIsDoneFilter} = UserState();

    return (<>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="TaskList"
                    sheet="tablexls"
                    buttonText={<DownloadForOfflineIcon/>}
                    />

          <TableContainer component={Paper}>
              Show Done Tasks
             <Checkbox defaultChecked={isDoneFilter} onChange={e => setIsDoneFilter(!isDoneFilter)} /> 
          <Table sx={{ minWidth: 380 }} aria-label="customized table" id="table-to-xls">
            <TableHead>
              <TableRow>
                <StyledTableCell>Done?</StyledTableCell>
                <StyledTableCell align="right">Tasks</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>                
                <StyledTableCell align="right" style={{display : 'none'}}>Action</StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
                {props.rows.length === 0 ? '' :
                  props.rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
        
                          <Checkbox defaultChecked={row.isDone} onChange={e => props.checkDone(row.id)} disabled={isAdmin && true}/>
                          
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.Task}</StyledTableCell>
                      <StyledTableCell align="right">{row.Description}</StyledTableCell>
                      <StyledTableCell align="right">{new Date(row.date).toLocaleDateString()}</StyledTableCell>
                      
                      <StyledTableCell align="right" style={{display : 'none'}}>
                          
                                <IconButton  aria-label="edit" onClick={e => props.updateTask(row.id)}>
                                        <EditIcon/>
                                </IconButton>
                            

                          <IconButton  aria-label="delete" onClick={(e) => (props.onDelete(row.id))}>
                                  <DeleteIcon />
                          </IconButton>
                          
                          </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
                          <Dialog
                              open={props.openModal}
                              onClose={props.handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                          >
                              <DialogTitle id="alert-dialog-title">
                                  Delete the todo from the list?
                              </DialogTitle>
                              
                              <DialogActions>
                              <Button onClick={props.handleClose}>No</Button>
                              <Button onClick={e => {props.deleteTask(props.taskId) 
                                                  props.setOpenModal(false)}} autoFocus>Yes</Button>
                              </DialogActions>
                          </Dialog>
        </TableContainer> 
        
        </>
      );
}

export default TableComp
