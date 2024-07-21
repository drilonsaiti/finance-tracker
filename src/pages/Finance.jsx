import FinanceTable from "../features/FinanceTable.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";
import FinanceTableOperations from "../features/FinanceTableOperations.jsx";
import AddInOutCome from "../features/AddIn-OutCome.jsx";


const Finance = () => {
    return (
        <Row>
            <Row type="horizontal">
                <AddInOutCome />
                <FinanceTableOperations />
            </Row>

            <Row>
                <FinanceTable />


            </Row>
        </Row>
    );
};

export default Finance;