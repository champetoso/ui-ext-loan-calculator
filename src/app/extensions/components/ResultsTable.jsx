import React, { useState } from "react";
import {
  Stack,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@hubspot/ui-extensions";

export const ResultsTable = ({ paymentsArray }) => {
  const ITEMS_PER_PAGE = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = paymentsArray.length / ITEMS_PER_PAGE;

  const dataToDisplay = paymentsArray.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Stack>
      <Table
        bordered={true}
        paginated={true}
        pageCount={pageCount}
        page={currentPage}
        onPageChange={(nextPageNumber) => {
          setCurrentPage(nextPageNumber);
        }}
      >
        <TableHead>
          <TableRow>
            <TableHeader>Period</TableHeader>
            <TableHeader>Payment</TableHeader>
            <TableHeader>Principal</TableHeader>
            <TableHeader>Interest</TableHeader>
            <TableHeader>Balance</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataToDisplay.map(
            ({
              period,
              monthlyPayment,
              principal,
              interestAmount,
              balance,
            }) => {
              return (
                <TableRow key={period}>
                  <TableCell>{period}</TableCell>
                  <TableCell>{monthlyPayment}</TableCell>
                  <TableCell>{principal}</TableCell>
                  <TableCell>{interestAmount}</TableCell>
                  <TableCell>{balance}</TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </Stack>
  );
};
