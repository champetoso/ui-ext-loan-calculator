(function(React2, react) {
  "use strict";
  react.createRemoteReactComponent("Alert");
  const Button = react.createRemoteReactComponent("Button");
  const ButtonRow = react.createRemoteReactComponent("ButtonRow");
  react.createRemoteReactComponent("Card");
  react.createRemoteReactComponent("DescriptionList");
  react.createRemoteReactComponent("DescriptionListItem");
  react.createRemoteReactComponent("Divider");
  react.createRemoteReactComponent("EmptyState");
  react.createRemoteReactComponent("ErrorState");
  const Form = react.createRemoteReactComponent("Form");
  react.createRemoteReactComponent("Heading");
  react.createRemoteReactComponent("Image");
  react.createRemoteReactComponent("Input");
  react.createRemoteReactComponent("Textarea");
  const LoadingSpinner = react.createRemoteReactComponent("LoadingSpinner");
  react.createRemoteReactComponent("ProgressBar");
  const Select = react.createRemoteReactComponent("Select");
  react.createRemoteReactComponent("Tag");
  const Text = react.createRemoteReactComponent("Text");
  react.createRemoteReactComponent("Tile");
  react.createRemoteReactComponent("ToggleGroup");
  const Stack = react.createRemoteReactComponent("Stack");
  react.createRemoteReactComponent("StatisticsItem");
  react.createRemoteReactComponent("Statistics");
  react.createRemoteReactComponent("StatisticsTrend");
  const Table = react.createRemoteReactComponent("Table");
  react.createRemoteReactComponent("TableFooter");
  const TableCell = react.createRemoteReactComponent("TableCell");
  const TableRow = react.createRemoteReactComponent("TableRow");
  const TableBody = react.createRemoteReactComponent("TableBody");
  const TableHeader = react.createRemoteReactComponent("TableHeader");
  const TableHead = react.createRemoteReactComponent("TableHead");
  react.createRemoteReactComponent("Link");
  const NumberInput = react.createRemoteReactComponent("NumberInput");
  react.createRemoteReactComponent("Box");
  const hubspot = {
    extend: render
  };
  const extend = (...args) => self.extend(...args);
  function render(renderCallback) {
    return extend((root, api) => {
      const renderCallbackResult = renderCallback(api);
      if (!React2.isValidElement(renderCallbackResult)) {
        throw new Error(`[hubspot.extend]: Expected callback function to return a valid element, got: ${renderCallbackResult}`);
      }
      react.createRoot(root).render(renderCallbackResult);
      root.mount();
    });
  }
  var ServerlessExecutionStatus;
  (function(ServerlessExecutionStatus2) {
    ServerlessExecutionStatus2["Success"] = "SUCCESS";
    ServerlessExecutionStatus2["Error"] = "ERROR";
  })(ServerlessExecutionStatus || (ServerlessExecutionStatus = {}));
  const CalculatorForm = ({
    onResetClick,
    onCalculateClick,
    onCreateDealClick,
    enableButton
  }) => {
    const [loanAmount, setLoanAmount] = React2.useState("");
    const [loanTerm, setLoanTerm] = React2.useState("");
    const [interestRate, setInterestRate] = React2.useState("");
    const [payBack, setPayBack] = React2.useState("");
    const payBackOptions = [
      { label: "Daily", value: 360 },
      { label: "Weekly", value: 52 },
      { label: "Monthly", value: 12 },
      { label: "Quarterly", value: 4 },
      { label: "Annually", value: 1 }
    ];
    const loanAmountError = !loanAmount > 0;
    const loanTermError = !loanTerm > 0;
    const interestRateError = !interestRate > 0;
    const payBackError = !payBack;
    const doesNotMeetRequirements = loanAmountError || loanTermError || interestRateError;
    const handleCalculateClick = React2.useCallback(() => {
      onCalculateClick({
        loanAmount,
        loanTerm,
        interestRate,
        payBack
      });
    }, [loanAmount, loanTerm, interestRate, payBack]);
    const handleResetClick = React2.useCallback(() => {
      onResetClick();
    }, []);
    const handleCreateDealClick = React2.useCallback(() => {
      onCreateDealClick({
        loanAmount,
        loanTerm,
        interestRate,
        payBack
      });
    }, [loanAmount, loanTerm, interestRate, payBack]);
    return /* @__PURE__ */ React2.createElement(Stack, { distance: "large" }, /* @__PURE__ */ React2.createElement(Form, { preventDefault: true }, /* @__PURE__ */ React2.createElement(
      NumberInput,
      {
        label: "Loan Amount",
        name: "loanAmount",
        placeholder: "10,000",
        value: loanAmount,
        required: true,
        onChange: (value) => setLoanAmount(value),
        error: loanAmountError,
        validationMessage: loanAmountError ? "Amount cannot be empty or negative" : ""
      }
    ), /* @__PURE__ */ React2.createElement(
      NumberInput,
      {
        label: "Loan Term (months)",
        name: "portalsNumber",
        placeholder: "24",
        value: loanTerm,
        required: true,
        onChange: (value) => setLoanTerm(value),
        error: loanTermError,
        validationMessage: loanTermError ? "Amount cannot be empty or negative" : ""
      }
    ), /* @__PURE__ */ React2.createElement(
      NumberInput,
      {
        label: "Interest Rate (% APY)",
        name: "portalsNumber",
        placeholder: "9.5",
        value: interestRate,
        formatStyle: "percentage",
        required: true,
        onChange: (value) => setInterestRate(value),
        error: interestRateError,
        validationMessage: interestRateError ? "Amount cannot be empty or negative" : ""
      }
    ), /* @__PURE__ */ React2.createElement(
      Select,
      {
        label: "Pay Back",
        name: "best-char",
        required: true,
        options: payBackOptions,
        value: payBack,
        onChange: (value) => {
          setPayBack(value);
        },
        error: payBackError,
        validationMessage: payBackError ? "Please choose Pay Back" : ""
      }
    )), /* @__PURE__ */ React2.createElement(ButtonRow, { disableDropdown: false }, /* @__PURE__ */ React2.createElement(
      Button,
      {
        onClick: handleCalculateClick,
        disabled: doesNotMeetRequirements,
        variant: "primary"
      },
      "Calculate"
    ), /* @__PURE__ */ React2.createElement(Button, { onClick: handleResetClick, variant: "destructive" }, "Reset"), /* @__PURE__ */ React2.createElement(Button, { disabled: enableButton, onClick: handleCreateDealClick }, "Create Deal")));
  };
  const ResultsTable = ({ paymentsArray }) => {
    const ITEMS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = React2.useState(1);
    const pageCount = paymentsArray.length / ITEMS_PER_PAGE;
    const dataToDisplay = paymentsArray.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return /* @__PURE__ */ React2.createElement(Stack, null, /* @__PURE__ */ React2.createElement(
      Table,
      {
        bordered: true,
        paginated: true,
        pageCount,
        page: currentPage,
        onPageChange: (nextPageNumber) => {
          setCurrentPage(nextPageNumber);
        }
      },
      /* @__PURE__ */ React2.createElement(TableHead, null, /* @__PURE__ */ React2.createElement(TableRow, null, /* @__PURE__ */ React2.createElement(TableHeader, null, "Period"), /* @__PURE__ */ React2.createElement(TableHeader, null, "Payment"), /* @__PURE__ */ React2.createElement(TableHeader, null, "Principal"), /* @__PURE__ */ React2.createElement(TableHeader, null, "Interest"), /* @__PURE__ */ React2.createElement(TableHeader, null, "Balance"))),
      /* @__PURE__ */ React2.createElement(TableBody, null, dataToDisplay.map(
        ({
          period,
          monthlyPayment,
          principal,
          interestAmount,
          balance
        }) => {
          return /* @__PURE__ */ React2.createElement(TableRow, { key: period }, /* @__PURE__ */ React2.createElement(TableCell, null, period), /* @__PURE__ */ React2.createElement(TableCell, null, monthlyPayment), /* @__PURE__ */ React2.createElement(TableCell, null, principal), /* @__PURE__ */ React2.createElement(TableCell, null, interestAmount), /* @__PURE__ */ React2.createElement(TableCell, null, balance));
        }
      ))
    ));
  };
  hubspot.extend(({ context, runServerlessFunction, actions }) => /* @__PURE__ */ React2.createElement(
    Extension,
    {
      runServerless: runServerlessFunction,
      sendAlert: actions.addAlert
    }
  ));
  const Extension = ({ runServerless, sendAlert }) => {
    const [showResults, setShowResults] = React2.useState(false);
    const [showForm, setShowForm] = React2.useState(true);
    const [loading, setLoading] = React2.useState(false);
    const [error, setError] = React2.useState(false);
    const [payments, setPayments] = React2.useState([]);
    const onCalculateClick = React2.useCallback(
      (loanParams) => {
        setLoading(true);
        setError(false);
        runServerless({
          name: "calculatePayments",
          parameters: loanParams
        }).then(async (result) => {
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
        }).catch((error2) => {
          console.error(error2.message);
          setError(true);
        }).finally(() => {
          setLoading(false);
        });
      },
      [runServerless]
    );
    const onResetClick = React2.useCallback(() => {
      setShowForm(false);
      setShowForm(true);
      setShowResults(false);
      setPayments([]);
    }, []);
    const onCreateDealClick = React2.useCallback(
      (loanParams) => {
        setLoading(true);
        setError(false);
        runServerless({
          name: "createDeal",
          parameters: loanParams,
          propertiesToSend: ["hs_object_id", "firstname", "lastname"]
        }).then(async (result) => {
          if (result.status === "SUCCESS") {
            console.log(result);
            sendAlert({
              message: `Deal created succesfully! ${result.response.body}`
            });
            return;
          }
          throw new Error(result.message);
        }).catch((error2) => {
          console.error(error2.message);
          setError(true);
        }).finally(() => {
          setLoading(false);
        });
      },
      [runServerless]
    );
    return /* @__PURE__ */ React2.createElement(Stack, { distance: "large" }, /* @__PURE__ */ React2.createElement(Text, null, "Paying Back a Fixed Amount Periodically. Use this calculator for basic calculations of common loan types such as mortgages, auto loans, student loans, or personal loans."), showForm ? /* @__PURE__ */ React2.createElement(
      CalculatorForm,
      {
        onResetClick,
        onCalculateClick,
        onCreateDealClick,
        enableButton: !showResults
      }
    ) : null, loading ? /* @__PURE__ */ React2.createElement(LoadingSpinner, { label: "Loading...", layout: "centered" }) : null, showResults ? /* @__PURE__ */ React2.createElement(ResultsTable, { paymentsArray: payments }) : null);
  };
})(React, RemoteUI);
