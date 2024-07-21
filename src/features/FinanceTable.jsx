import React, { useState, useEffect } from 'react';
import FinanceRow from './FinanceRow.jsx';
import Table from '../ui/Table.jsx';
import Menus from '../ui/Menus.jsx';
import Tag from '../ui/Tag.jsx';
import { formatCurrency } from '../utils/helpers.js';
import { useIncomes } from './useIncomes.js';
import Spinner from '../ui/Spinner.jsx';
import { useSearchParams } from 'react-router-dom';
import { useOutcomes } from './useOutcomes.js';
import ButtonIcon from "../ui/ButtonIcon.jsx";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi2";
import Button from "../ui/Button.jsx";
import styled from "styled-components";
import FinanceRowPerYear from "./FinanceRowPerYear.jsx";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Information = styled.div`
  color: var(--color-grey-400);
  font-weight: 500;
  font-size: 11px;
  width: 100%;
  text-align: end;
`;

function FinanceTable() {
  const { isLoading: isLoadingIncomes, incomes } = useIncomes();
  const { isLoading: isLoadingOutcomes, outcomes } = useOutcomes();
  const isLoading = isLoadingIncomes || isLoadingOutcomes;
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  if (isLoading) return <Spinner />;

  const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalOutcome = outcomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  let total = Number(totalIncome + totalOutcome);

  const filterValue = searchParams.get('finances') || 'all';

  const allFinances = [...incomes, ...outcomes];
  const yearsWithData = allFinances.reduce((years, finance) => {
    const financeYear = new Date(finance.date).getFullYear();
    if (!years.includes(financeYear)) {
      years.push(financeYear);
    }
    return years;
  }, []);
  let filteredFinances;

  if (filterValue === 'all'){
    filteredFinances = allFinances;
  }
  if (filterValue === 'income') {
    filteredFinances = incomes;
    total = totalIncome;
  }
  if (filterValue === 'outcome') {
    filteredFinances = outcomes;
    total = totalOutcome;
  }

  if (filterValue === 'peryear'){
    const financesByYear = {};
    console.log(yearsWithData)

    allFinances.forEach(finance => {
      const financeYear = new Date(finance.date).getFullYear();
      const { table, type, amount } = finance;

      if (!financesByYear[financeYear]) {
        financesByYear[financeYear] = {
          incomes: {},
          outcomes: {}
        };
      }

      if (table === 'income') {
        if (!financesByYear[financeYear].incomes[type]) {
          financesByYear[financeYear].incomes[type] = 0;
        }
        financesByYear[financeYear].incomes[type] += Number(amount);
      } else if (table === 'outcome') {
        if (!financesByYear[financeYear].outcomes[type]) {
          financesByYear[financeYear].outcomes[type] = 0;
        }
        financesByYear[financeYear].outcomes[type] += Number(amount);
      }
    });
    console.log(financesByYear);

    filteredFinances = financesByYear;
  }
  let sortedCabins;
  if (filterValue !== 'peryear') {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredFinances?.slice(startIndex, endIndex);

    const sortBy = searchParams.get('sortBy') || 'date-asc';
    const [field, direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    sortedCabins = paginatedData?.sort((a, b) => (a[field] - b[field]) * modifier);
  }

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredFinances.length / pageSize);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
        <Button
            size={'smallest'}
            key={i}
            onClick={() => goToPage(i)}
            disabled={i === currentPage}
            isActive={i === currentPage}
        >
          {i}
        </Button>
    );
  }

  return (
      <Menus>

        {filterValue === 'peryear' ? <FinanceRowPerYear finance={filteredFinances} />

            : <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Description</div>
            <div>Income/Outcome</div>
            <div>Type</div>
            <div>Date</div>
          </Table.Header>
          {filterValue === 'peryear' ? <FinanceRowPerYear finance={filteredFinances} /> :

              <Table.Body
                  data={sortedCabins}
                  render={(spc) => <FinanceRow finance={spc} key={spc} />}
              />}

          <Table.Footer>
            <div></div>
            <div>Total</div>
            <div>
              <Tag type={total > 0 ? 'green' : 'red'}>{formatCurrency(total)}</Tag>
            </div>
            <div></div>
            <div></div>
            <Information>
              *The total is for all records
            </Information>
          </Table.Footer>

          {/* Pagination controls */}
          <Pagination>
            <ButtonIcon onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              <HiChevronLeft />
            </ButtonIcon>
            {pages}
            <ButtonIcon onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <HiChevronRight />
            </ButtonIcon>
          </Pagination>
        </Table>}

      </Menus>
  );
}

export default FinanceTable;
