import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Stack,
  NumberInput,
  Form,
  ButtonRow,
  Select,
} from "@hubspot/ui-extensions";

export const CalculatorForm = ({
  onResetClick,
  onCalculateClick,
  onCreateDealClick,
  contactProperties,
  enableButton,
}) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [payBack, setPayBack] = useState("");

  const payBackOptions = [
    { label: "Daily", value: 360 },
    { label: "Weekly", value: 52 },
    { label: "Monthly", value: 12 },
    { label: "Quarterly", value: 4 },
    { label: "Annually", value: 1 },
  ];

  useEffect(() => {
    console.log("CalculatorForm UseEffect", contactProperties);
  });

  const handleCalculateClick = useCallback(() => {
    onCalculateClick({
      loanAmount: loanAmount,
      loanTerm,
      interestRate,
      payBack,
    });
  }, [loanAmount, loanTerm, interestRate, payBack]);

  const handleResetClick = useCallback(() => {
    onResetClick();
  }, []);

  const handleCreateDealClick = useCallback(() => {
    onCreateDealClick({
      loanAmount: loanAmount,
      loanTerm,
      interestRate,
      payBack,
      contactProperties,
    });
  }, [loanAmount, loanTerm, interestRate, payBack, contactProperties]);

  return (
    <Stack distance="large">
      <Form preventDefault={true}>
        <NumberInput
          label="Loan Amount"
          name="loanAmount"
          placeholder={"10,000"}
          value={loanAmount}
          required={true}
          onChange={(value) => setLoanAmount(value)}
        />
        <NumberInput
          label="Loan Term (months)"
          name="portalsNumber"
          placeholder="24"
          value={loanTerm}
          required={true}
          onChange={(value) => setLoanTerm(value)}
        />
        <NumberInput
          label="Interest Rate (% APY)"
          name="portalsNumber"
          placeholder="9.5"
          value={interestRate}
          formatStyle="percentage"
          required={true}
          onChange={(value) => setInterestRate(value)}
        />
        <Select
          label="Pay Back"
          name="best-char"
          required={true}
          options={payBackOptions}
          value={payBack}
          onChange={(value) => {
            setPayBack(value);
          }}
        />
      </Form>
      <ButtonRow disableDropdown={false}>
        <Button onClick={handleCalculateClick} variant="primary">
          Calculate
        </Button>
        <Button onClick={handleResetClick} variant="destructive">
          Reset
        </Button>
        <Button disabled={enableButton} onClick={handleCreateDealClick}>
          Create Deal
        </Button>
      </ButtonRow>
    </Stack>
  );
};
