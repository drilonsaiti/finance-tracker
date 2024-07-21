import Button from "../ui/Button.jsx";
import Modal from "../ui/Modal.jsx";
import CreateInOutComeForm from "./CreateInOutComeForm.jsx";

function AddInOutCome() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="finance-form">
          <Button isActive>Add new income/outcome</Button>
        </Modal.Open>
        <Modal.Window name="finance-form">
          <CreateInOutComeForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddInOutCome;
