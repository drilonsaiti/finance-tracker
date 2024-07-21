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

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function FinanceRow({finance}) {
    const {isCreating:isCreatingIncome,createIncome} = useCreateIncome();
    const {isCreating:isCreatingOutcome,createOutcome} = useCreateOutcome();

    const { isDeleting:isDeletingIncome, deleteIncomes } = useDeleteIncome();
    const { isDeleting:isDeletingOutcome, deleteOutcomes } = useDeleteOutcome();
    const isWorking = isDeletingOutcome || isCreatingIncome || isDeletingIncome;
    const {uuid,amount,description,table,type,date} = finance;

    function handleDuplicate() {
        const newData = {
            date: date,
            description: description,
            type: type,
            amount: Number(amount),
            table: table
        }
        if (table === 'income'){
            createIncome(newData);
        }else{
            createOutcome(newData)
        }

    }

    return (
        <>
    <Table.Row>
        <Tag type={table === 'income' ? 'green' : 'red' }>{table === 'income' ? 'Income' : 'Outcome'}</Tag>
      <Cabin>{description}</Cabin>
        <Tag style={{justifySelf: 'center'}}  type={table === 'income' ? 'green' : 'red'}>{table === 'income' ? '' : '-' }{formatCurrency( table === 'income' ? amount : -amount)}</Tag>
      <Cabin>{capitalizeFirstLetter(type)} {table}</Cabin>
        <Cabin>{formattedDate(date)}</Cabin>
        <Modal>
            <Menus.Menu>
                <Menus.Toggle id={uuid} />

                <Menus.List id={uuid}>
                    <Menus.Button
                        icon={<HiSquare2Stack />}
                        onClick={handleDuplicate}
                        disabled={isCreatingIncome}
                    >
                        Duplicate
                    </Menus.Button>

                    <Modal.Open opens="edit">
                        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                    </Modal.Open>

                    <Modal.Open opens="delete">
                        <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                    </Modal.Open>
                </Menus.List>

                <Modal.Window name="edit">
              <CreateInOutComeForm financeToEdit={finance} />
            </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName="cabins"
                         disabled={isWorking}
                         onConfirm={() => table === 'income' ? deleteIncomes(uuid) : deleteOutcomes(uuid)}
                    />
                </Modal.Window>
            </Menus.Menu>
        </Modal>


    </Table.Row>


</>

  );
}

export default FinanceRow;
