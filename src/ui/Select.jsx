import styled from "styled-components";
import {forwardRef} from "react";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

// eslint-disable-next-line react/display-name
const Select = forwardRef(({options, value,grouped,onChange, ...props}, ref) => {
    return (
        <StyledSelect ref={ref} value={value} onChange={onChange} {...props}>
            {grouped
                ? Object.keys(options).map((group) => (
                    <optgroup label={group} key={group}>
                        {options[group].map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </optgroup>
                ))
                : options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
        </StyledSelect>
    );
});

export default Select;
