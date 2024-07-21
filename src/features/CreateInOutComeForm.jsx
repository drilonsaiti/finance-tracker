import { useForm } from "react-hook-form";

import Input from "../ui/Input.jsx";
import Form from "../ui/Form.jsx";
import Button from "../ui/Button.jsx";
import Textarea from "../ui/Textarea.jsx";
import FormRow from "../ui/FormRow.jsx";
import Select from "../ui/Select.jsx";
import {useCreateIncome} from "./useCreateIncome.js";
import {useEffect, useState} from "react";
import {uid} from 'uid';
import {useEditIncome} from "./useEditIncome.js";
import {useCreateOutcome} from "./useCreateOutcome.js";
import {useEditOutcome} from "./useEditOutcome.js";


function CreateInOutComeForm({ financeToEdit = {}, onCloseModal }) {
  const {isCreating:isCreatingIncome,createIncome} = useCreateIncome();
  const {isCreating:isCreatingOutcome,createOutcome} = useCreateOutcome();
  const { isEditing:isEditingIncome, editIncome } = useEditIncome();
  const {isEditing:isEditingOutcome,editOutcome} = useEditOutcome();

  const [refreshKey, setRefreshKey] = useState(1);
  const { uuid: editId, ...editValues } = financeToEdit;
  const isEditSession = Boolean(editId);
  const isWorking = isCreatingIncome || isEditingIncome || isEditingOutcome || isCreatingOutcome;
  const { register, handleSubmit, reset, getValues, formState,setValue } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const handleInoutcomeChange = (selectedValue) => {
    setValue('types',selectedValue);
  };


  useEffect(() => {
    if (isEditSession){
      setValue('types',getValues('type'))
      setValue('inoutcome',getValues('table'))
    }
  }, []);

  function onSubmit(data) {
   if (isEditSession){
     delete data.inoutcome;
     delete data.types;
     if (getValues('inoutcome') === 'income'){
       editIncome( { newIncome: { ...data,table:getValues('inoutcome'),type: getValues('types') }, uuid:editId },
           {
             onSuccess: (data) => {
               reset();
               onCloseModal?.();
             },
           })
     }else{
       console.log("OUTCOME BABY",data.amount);
       editOutcome( { newOutcome: { ...data,table:getValues('inoutcome'),type: getValues('types')
             ,amount: data.amount < 0 ? data.amount : -data.amount}, uuid:editId },
           {
             onSuccess: (data) => {
               reset();
               onCloseModal?.();
             },
           })
     }
   }else {
     if (getValues('inoutcome') === 'income'){
     const newData = {
       date: new Date().toISOString(),
       description: data.description,
       type: data.types,
       amount: Number(data.amount),
       table: 'income'
     }
     createIncome(
         newData,
         {
           onSuccess: (data) => {
             reset();
             onCloseModal?.();
           },
         }
     );
   }else{
       const newData = {
         date: new Date().toISOString(),
         description: data.description,
         type: data.types,
         amount: -Number(data.amount),
         table: 'outcome'
       }
       createOutcome(
           newData,
           {
             onSuccess: (data) => {
               reset();
               onCloseModal?.();
             },
           }
       );
     }
   }
  }

  function onError(errors) {
    // console.log(errors);
  }

  const options = [
    { value: "income", label: "Income" },
    { value: "outcome", label: "Outcome" },
  ]


  const groupedTypes = {
    "Income": [
      { value: "drivers", label: "Drivers income", group: "Income" },
      { value: "package", label: "Package income", group: "Income" }
    ],
    "Outcome": [
      { value: "leasing", label: "Leasing outcome", group: "Outcome" },
      { value: "employee", label: "Employee wages outcome", group: "Outcome" }
    ]
  };


  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Income/Outcome" error={errors?.inoutcome?.message}>

        <Select key={refreshKey} value={getValues('inoutcome')}
                options={options} disabled={isWorking}
                id="inoutcome" {...register("inoutcome", {required: "This field is required"})}>

        </Select>

      </FormRow>
      <FormRow label="Type" error={errors?.type?.message}>

        <Select key={refreshKey} value={getValues('types')}
                onChange={handleInoutcomeChange}
                options={groupedTypes} grouped disabled={isWorking}
                id="types" {...register("types", {required: "This field is required"})}>

        </Select>

      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>

        <Textarea
            type="text"
            id="description"
            disabled={isWorking}
            {...register("description", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Description should be fielded",
              },
            })}
        />
      </FormRow>

      <FormRow label="Amount" error={errors?.amount?.message}>

        <Input
            type="number"
            id="amount"
            disabled={isWorking}
            {...register("amount", {
              required: "This field is required",
            })}
        />
      </FormRow>

      <FormRow>
        <Button
            variation="secondary"
            disabled={isWorking}
            onClick={() => onCloseModal?.()}
        >Cancel </Button>
        <Button disabled={isWorking} isActive>{isEditSession ? 'Edit income/outcome' : 'Add income/outcome'}
        </Button>
      </FormRow>


    </Form>
  );
}

export default CreateInOutComeForm;
