const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  const { loanAmount, loanTerm, interestRate, payBack } = context.parameters;
  const { hs_object_id, firstname, lastname } = context.propertiesToSend;

  try {
    const hubspotClient = new hubspot.Client({
      accessToken: context.secrets.PRIVATE_APP_ACCESS_TOKEN,
    });

    const properties = {
      amount: loanAmount,
      closedate: "2019-12-07T16:50:06.678Z",
      dealname: "Amortized Loan - " + firstname + " " + lastname,
      dealstage: "presentationscheduled",
      pipeline: "default",
      loan_amount: loanAmount,
      loan_interest: interestRate,
      loan_periods: loanTerm,
    };
    const SimplePublicObjectInputForCreate = {
      properties,
    };
    const associationsBody = [
      {
        associationCategory: "HUBSPOT_DEFINED",
        associationTypeId: 3,
      },
    ];

    const dealApiResponse = await hubspotClient.crm.deals.basicApi.create(
      SimplePublicObjectInputForCreate
    );

    const associationApiResponse = await hubspotClient.apiRequest({
      method: "PUT",
      path: `/crm/v4/objects/deals/${dealApiResponse.id}/associations/contacts/${hs_object_id}`,
      body: associationsBody,
    });

    sendResponse({
      statusCode: 200,
      body: associationApiResponse,
    });
  } catch (error) {
    sendResponse(error);
  }
};
