import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import {GrLineChart} from "react-icons/gr";
import {PiChartLineDown} from "react-icons/pi";

function Stats({ incomes, outcomes, numDays, cabinCount }) {
  // 1.
  const numBookings = incomes.length;

  // 2.
  const income = incomes?.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // 3.
  const outcome = outcomes?.reduce((acc, curr) => acc + Number(curr.amount), 0);

    let total = Number(income + outcome);

  // 4.
  const occupation = 10;

  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat
        title="Incomes"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(income)}
      />
      <Stat
        title="Outcomes"
        color="red"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(outcome)}
      />
      <Stat
        title="Profit"
        color="indigo"
        icon={total > 0 ? <GrLineChart /> : <PiChartLineDown />}
        value={formatCurrency(total)}
      />
      <Stat
        title="Profit rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round((total / income) * 100) + "%"}
      />
    </>
  );
}

export default Stats;
