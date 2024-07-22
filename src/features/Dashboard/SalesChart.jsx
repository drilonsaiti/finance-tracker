import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {addMonths, eachDayOfInterval, format, isSameDay, isSameMonth, subDays, subMonths} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

const formatYAxisTick = (tick) => {
    return `${tick / 1000}K`;
};

function SalesChart({ incomes, outcomes }) {
    const allDates = eachDayOfInterval({
        start: subMonths(new Date(), 4),
        end: addMonths(new Date(),1),
    });

    const data = allDates.map((month) => {
        const incomeTotal = incomes
            ?.filter((income) => isSameMonth(month, new Date(income.date)))
            ?.reduce((acc, cur) => acc + Number(cur.amount), 0);

        const outcomeTotal = outcomes
            ?.filter((outcome) => isSameMonth(month, new Date(outcome.date)))
            ?.reduce((acc, cur) => acc + Number(cur.amount), 0);

        return {
            label: format(month, "MMM"),
            totalSales: incomeTotal || 0,
            extrasSales: outcomeTotal || 0,
        };
    });


    const uniqueData = Array.from(new Set(data.map(item => item.label)))
        .map(label => {
            return data.find(item => item.label === label);
        });

    const colors = {
        totalSales: { stroke: "#16a34a", fill: "#dcfce7" },
        extrasSales: { stroke: "#a31616", fill: "#fcdcdc" },
        text: "#374151",
        background: "#fff",
    };

    return (
        <StyledSalesChart>
            <Heading as="h2">
                Income/Outcome from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
                {format(allDates[allDates.length - 1], "MMM dd yyyy")}
            </Heading>

            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={uniqueData}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit=" €"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                        tickFormatter={formatYAxisTick}
                    />
                    <CartesianGrid strokeDasharray="4" />
                    <Tooltip contentStyle={{ backgroundColor: colors.background }} />
                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        strokeWidth={2}
                        name="Total sales"
                        unit="€"
                    />
                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        strokeWidth={2}
                        name="Extras sales"
                        unit="€"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

export default SalesChart;
