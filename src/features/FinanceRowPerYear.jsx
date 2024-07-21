import styled from "styled-components";

import Table from "../ui/Table.jsx";
import ConfirmDelete from "../ui/ConfirmDelete.jsx";
import {capitalizeFirstLetter, formatCurrency, formattedDate} from "../utils/helpers";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import Tag from "../ui/Tag.jsx";
import Modal from "../ui/Modal.jsx";
import Menus from "../ui/Menus.jsx";
import {useCreateIncome} from "./useCreateIncome.js";
import CreateInOutComeForm from "./CreateInOutComeForm.jsx";
import {useDeleteIncome} from "./useDeleteIncome.js";
import {useDeleteOutcome} from "./useDeleteOutcome.js";
import {useCreateOutcome} from "./useCreateOutcome.js";
import React from "react";
import Header from "../ui/Header.jsx";
import Heading from "../ui/Heading.jsx";


const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Year = styled.div`
    font-size: 5rem;
    font-weight: 600;
`;

function FinanceRowPerYear({finance}) {
        console.log(finance);
    return (

        <Menus>
            <Table columns="repeat(3,1fr)">


            {Object.entries(finance).map(([year, data]) => {
                const totalIncome = Object.values(data.incomes).reduce(
                    (total, amount) => total + amount,
                    0
                );
                const totalOutcome = Object.values(data.outcomes).reduce(
                    (total, amount) => total + amount,
                    0
                );

                // Calculate profit for the year
                const profit = totalIncome + totalOutcome;
                const inout = profit > 0 ? 'income' : 'outcome'
                return (<div key={year}>
                    <Table.Header>
                    <Year>{year}</Year>
                    <div>
                        <Table >
                        {Object.entries(data.incomes).map(([type, amount]) => (
                            <Table.Header key={type} income>
                                <div>Incomes</div>
                                <div>{type} {formatCurrency(amount)}</div>

                                <div></div>
                                <div></div>
                            </Table.Header>
                        ))}
                            <Table.Header income>
                                <div>
                                    Total:{" "}
                                    {formatCurrency(
                                        Object.values(data.incomes).reduce(
                                            (total, amount) => total + amount,
                                            0
                                        )
                                    )}
                                </div>
                                <div></div>
                                <div></div>
                            </Table.Header>

                    </Table></div>
                    <div><Table>
                        {Object.entries(data.outcomes).map(([type, amount]) => (
                            <Table.Header key={type} outcome>
                                <div>Outcomes</div>
                                <div>{type} {formatCurrency(amount)}</div>

                                <div></div>
                                <div></div>
                            </Table.Header>
                        ))}

                        <Table.Header outcome>
                            <div>
                                Total:{" "}
                                {formatCurrency(
                                    Object.values(data.outcomes).reduce(
                                        (total, amount) => total + amount,
                                        0
                                    )
                                )}
                            </div>
                            <div></div>
                            <div></div>
                        </Table.Header>

                    </Table></div>
                    <div></div>
                    <div></div>
                        <div style={{gridColumn: '2 / span 2',textAlign: 'center',}}> <Table.Header  income={profit > 0} outcome={profit < 0}>
                            <div style={{display: "flex",justifyContent: 'space-between',gap: '1rem'}}><p>Total:</p>
                                <p>{profit < 0 ? '-':''}{formatCurrency(profit)}</p>
                            </div>
                            <div></div>

                            <div></div>
                            <div></div>
                        </Table.Header></div>
                </Table.Header>

                </div>

            )})}


            </Table>
        </Menus>
    );
}

export default FinanceRowPerYear;
