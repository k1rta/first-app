export interface State {
  currentValue: string;
  operator: string | null;
  previousValue: string | null;
  waitingForNewNumber: boolean; // Fixed: Added flag to track when waiting for new number input
}

export const initialState: State = {
  currentValue: "0",
  operator: null,
  previousValue: null,
  waitingForNewNumber: false // Fixed: Initialize flag to false
};

export const handleNumber = (value: number | string, state: State): Partial<State> => {
  // Fixed: If waiting for new number after operator, replace current value
  if (state.waitingForNewNumber) {
    return {
      currentValue: `${value}`,
      waitingForNewNumber: false
    };
  }

  if (state.currentValue === "0") {
    return { currentValue: `${value}` };
  }

  return {
    currentValue: `${state.currentValue}${value}` 
  };
};

export const handleEqual = (state: State): State => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue ?? "0");
  const resetState = {
    operator: null,
    previousValue: null,
    waitingForNewNumber: false // Fixed: Reset flag after calculation
  };

  switch (operator) {
    case "/":
      return {
        currentValue: `${previous / current}`,
        ...resetState
      };
    case "*":
      return {
        currentValue: `${previous * current}`,
        ...resetState
      };
    case "+":
      return {
        currentValue: `${previous + current}`,
        ...resetState
      };
    case "-":
      return {
        currentValue: `${previous - current}`,
        ...resetState
      };
    default:
      return state;
  }
};

type TapType = "number" | "operator" | "equal" | "clear" | "posneg" | "percentage";

const calculator = (
  type: TapType,
  value: number | string | undefined,
  state: State
): State => {
  switch (type) {
    case "number":
      return { ...state, ...handleNumber(value!, state) };
    case "operator":
      return {
        operator: value as string,
        previousValue: state.currentValue,
        currentValue: state.currentValue, // Fixed: Keep current value displayed instead of showing 0
        waitingForNewNumber: true // Fixed: Set flag to indicate waiting for new number
      };
    case "equal":
      return handleEqual(state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * -1}` 
      };
    case "percentage":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * 0.01}` 
      };
    default:
      return state;
  }
};

export default calculator;
