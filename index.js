export const handler = async (event) => {
  const token = event["authorizationToken"];
  let permission = "Deny";

  if (token == process.env.SECRET_TOKEN) {
    permission = "Allow";
  }

  const authResponse = {
    principalId: "authLambda-to-microservice-Users",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Resource: [process.env.RESOURCE_GET_USERS],
          Effect: `${permission}`,
        },
      ],
    },
  };
  return authResponse;
};
