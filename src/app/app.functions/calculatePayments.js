exports.main = async (context, sendResponse) => {
  const { loanAmount, loanTerm, interestRate, payBack } = context.parameters;

  try {
    const amount = parseFloat(loanAmount);
    const interest = parseFloat(interestRate / (100 * payBack));
    const periods = parseFloat((payBack * loanTerm) / 12);
    let rows = new Array();
    let balance = loanAmount;
    let monthlyPayment =
      (amount * interest) / (1 - Math.pow(1 + interest, -periods));

    for (let i = 0; i < periods; i++) {
      let interestAmount = balance * interest;
      let principal = monthlyPayment - interestAmount;
      balance = balance - principal;
      monthlyPayment = parseFloat(monthlyPayment).toFixed(1);
      principal = parseFloat(principal).toFixed(1);
      interestAmount = parseFloat(interestAmount).toFixed(1);
      balance = parseFloat(balance).toFixed(1);
      if (balance < 1) {
        balance = 0;
      }

      const row = {
        period: i + 1,
        monthlyPayment,
        principal,
        interestAmount,
        balance,
      };
      rows.push(row);
    }

    sendResponse({
      statusCode: 200,
      payback: payBack,
      body: { rows: rows },
    });
  } catch (error) {
    sendResponse(error);
  }
};
