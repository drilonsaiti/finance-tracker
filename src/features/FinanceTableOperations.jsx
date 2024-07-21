import TableOperations from "../ui/TableOperations.jsx";
import Filter from "../ui/Filter.jsx";
import SortBy from "../ui/SortBy.jsx";

function FinanceTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="finances"
        options={[
          { value: "all", label: "All" },
          { value: "income", label: "Income" },
          { value: "outcome", label: "Outcome" },
            {value: 'peryear', label: "Peryear" },
        ]}
      />

      <SortBy
        options={[
          { value: "date-asc", label: "Sort by date (last to old)" },
          { value: "date-desc", label: "Sort by date (old to last)" },
          { value: "amount-asc", label: "Sort by income/outcome (low first)" },
          { value: "amount-desc", label: "Sort by income/outcome (high first)" },
          { value: "type-asc", label: "Sort by type (A-Z)" },
          { value: "type-desc", label: "Sort by type (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default FinanceTableOperations;
