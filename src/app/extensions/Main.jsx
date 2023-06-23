import React, { useState, useCallback, useEffect } from "react";
import { Text, Stack, hubspot, LoadingSpinner } from "@hubspot/ui-extensions";
import { CalculatorForm } from "./components/CalculatorForm";
import { ResultsTable } from "./components/ResultsTable";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ runServerless, sendAlert }) => {
  const [showResults, setShowResults] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [payments, setPayments] = useState([]);

  const onCalculateClick = useCallback(
    (loanParams) => {
      setLoading(true);
      setError(false);

      runServerless({
        name: "calculatePayments",
        parameters: loanParams,
      })
        .then(async (result) => {
          if (result.status === "SUCCESS") {
            if (Array.isArray(result.response.body.rows)) {
              setShowResults(true);
              setPayments(result.response.body.rows);
              return;
            } else {
              throw new Error("Response is not an array.");
            }
          }
          throw new Error(result.message);
        })
        .catch((error) => {
          console.error(error.message);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [runServerless]
  );

  const onResetClick = useCallback(() => {
    setShowForm(false);
    setShowForm(true);
    setShowResults(false);
    setPayments([]);
  }, []);

  const onCreateDealClick = useCallback(
    (loanParams) => {
      setLoading(true);
      setError(false);

      runServerless({
        name: "createDeal",
        parameters: loanParams,
        propertiesToSend: ["hs_object_id", "firstname", "lastname"],
      })
        .then(async (result) => {
          if (result.status === "SUCCESS") {
            console.log(result);
            sendAlert({
              message: `Deal created succesfully! ${result.response.body}`,
            });
            return;
          }
          throw new Error(result.message);
        })
        .catch((error) => {
          console.error(error.message);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [runServerless]
  );

  return (
    <Stack distance="large">
      <Text>
        Paying Back a Fixed Amount Periodically. Use this calculator for basic
        calculations of common loan types such as mortgages, auto loans, student
        loans, or personal loans.
      </Text>
      {showForm ? (
        <CalculatorForm
          onResetClick={onResetClick}
          onCalculateClick={onCalculateClick}
          onCreateDealClick={onCreateDealClick}
          enableButton={!showResults}
        />
      ) : null}
      {loading ? <LoadingSpinner label="Loading..." layout="centered" /> : null}
      {showResults ? <ResultsTable paymentsArray={payments} /> : null}
    </Stack>
  );
};
