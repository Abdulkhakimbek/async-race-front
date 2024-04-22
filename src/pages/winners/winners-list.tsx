import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useGetWinners } from 'src/api/winners';
import { IconButton, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useWinnersContext } from './context';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    border: '1px solid white',
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
    fontSize: 14,
  },
}));

export default function WinnersList() {
  const { wCurrentPage, _limit, prevPage, nextPage } = useWinnersContext();
  const {
    winners, winnersLoading, winnersEmpty, totalCount,
  } = useGetWinners(wCurrentPage, _limit);

  return (
    <Stack direction="column">
      <TableContainer component={Paper} sx={{ background: 'transparent' }} color="white">
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">No</StyledTableCell>
              <StyledTableCell align="left">CAR</StyledTableCell>
              {/* <StyledTableCell align="left">NAME</StyledTableCell> */}
              <StyledTableCell align="left">WINS</StyledTableCell>
              <StyledTableCell align="left">BEST TIME (SECONDS)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {winners.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left" component="th" scope="row">
                  {index + 1 + (wCurrentPage - 1) * 7}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Iconify
                    width="auto"
                    height="50px"
                    fontSize="60px"
                    color="#1BBA59"
                    icon="game-icons:race-car"
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{row.wins}</StyledTableCell>
                <StyledTableCell align="left">{row.time?.toFixed(2)}</StyledTableCell>
                {/* <StyledTableCell align="left">{row.wins}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        color="white"
      >
        <Typography>{`TOTAL (${totalCount})`}</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <IconButton disabled={wCurrentPage < 2}>
            <Iconify
              icon="fluent:previous-32-regular"
              width={24}
              color={wCurrentPage < 2 ? 'grey' : 'white'}
              onClick={prevPage}
            />
          </IconButton>
          <Typography>{`PAGE #${wCurrentPage}`}</Typography>
          <IconButton disabled={totalCount < wCurrentPage * _limit}>
            <Iconify
              icon="fluent:next-32-regular"
              width={24}
              color={totalCount < wCurrentPage * _limit ? 'grey' : 'white'}
              onClick={nextPage}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
