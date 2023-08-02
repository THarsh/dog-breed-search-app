import { render, act } from "@testing-library/react";
import useDebounce from "../hooks/useDebounce";

// Test component that uses the useDebounce hook
const TestComponent = ({ value, delay }: any) => {
  const debouncedValue = useDebounce(value, delay);

  return debouncedValue;
};

describe("useDebounce hook", () => {
  jest.useFakeTimers();

  it("should return the same value after the delay", () => {
    const { getByText } = render(<TestComponent value="test" delay={1000} />);

    expect(getByText("test")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1010);
    });

    expect(getByText("test")).toBeTruthy();
  });

  it("should only take the latest value into account", () => {
    const { rerender, getByText } = render(
      <TestComponent value="test1" delay={1000} />
    );

    expect(getByText("test1")).toBeTruthy();

    rerender(<TestComponent value="test2" delay={1000} />);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(getByText("test1")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(710);
    });

    expect(getByText("test2")).toBeTruthy();
  });
});
