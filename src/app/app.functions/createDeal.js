const hubspot = require("@hubspot/api-client");

exports.main = async (context = {}, sendResponse) => {
  //const { hs_object_id } = context.propertiesToSend;  //not working
  const { loanAmount, loanTerm, interestRate, payBack, contactProperties } =
    context.parameters;

  try {
    const hubspotClient = new hubspot.Client({
      accessToken: process.env.HS_API_PRIVATE_TOKEN,
    });

    const properties = {
      amount: loanAmount,
      closedate: "2019-12-07T16:50:06.678Z",
      dealname:
        "Amortized Loan - " +
        contactProperties.firstname +
        " " +
        contactProperties.lastname,
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
      path: `/crm/v4/objects/deals/${dealApiResponse.id}/associations/contacts/${contactProperties.hs_object_id}`,
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
