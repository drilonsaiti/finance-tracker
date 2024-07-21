import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardFilter from "../features/Dashboard/DashboardFilter.jsx";
import DashboardLayout from "../features/Dashboard/DashboardLayout.jsx";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
