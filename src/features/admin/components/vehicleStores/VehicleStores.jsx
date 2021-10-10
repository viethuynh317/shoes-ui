import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { HEAD_CELLS } from "../../../../constants/admin/vehicleStoresConst";
import { getVehicleStores } from "./vehicleStoresSlice";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    minWidth: 10,
    margin: "0 4px",
  },
}));

export default function VehicleStores() {
  const classes = useStyles();
  const location = useLocation();
  const { page: pageParam, perPage } = queryString.parse(location?.search);

  const [page, setPage] = useState(Number(pageParam) || 0);
  const [rowsPerPage, setRowsPerPage] = useState(Number(perPage) || 10);

  const { total, results: storeList } = useSelector(
    (state) => state?.vehicleStores?.storesData
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    history.push(`/vehicle_stores?page=${page}&perPage=${rowsPerPage}`);
    dispatch(getVehicleStores({ page: page + 1, perPage: rowsPerPage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {HEAD_CELLS.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    variant="head"
                    sx={{ fontWeight: 700 }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {storeList?.map((store) => (
                <TableRow hover tabIndex={-1} key={store.id}>
                  <TableCell align="left">{store?.name}</TableCell>
                  <TableCell align="left">{store?.address}</TableCell>
                  <TableCell align="left">{store?.phoneNumber}</TableCell>
                  <TableCell align="left">{store?.city}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      className={classes.iconButton}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      className={classes.iconButton}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
