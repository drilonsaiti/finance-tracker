import styled from "styled-components";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import {useIncomes} from "../useIncomes.js";
import Spinner from "../../ui/Spinner.jsx";
import {useOutcomes} from "../useOutcomes.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;

function DashboardLayout() {
    const { isLoading: isLoadingIncomes, incomes } = useIncomes();
    const { isLoading: isLoadingOutcomes, outcomes } = useOutcomes();
  if (isLoadingIncomes || isLoadingOutcomes) return <Spinner />;

  console.log(incomes);
  return (
    <StyledDashboardLayout>
      <Stats
          incomes={incomes}
        outcomes={outcomes}
        cabinCount={incomes.length}
      />

      <SalesChart incomes={incomes}  outcomes={outcomes}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
