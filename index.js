export const handler = async (event) => {
  // TODO implement
  console.log(event, "event");

  const token = event["authorizationToken"];
  const resource = process.env.RESOURCE_GET_USERS;
  const myToken = process.env.SECRET_TOKEN;
  let permission = "Deny";

  if (token == myToken) {
    permission = "Allow";
  }

  const authResponse = {
    principalId: "authLambda-to-microservice-Users",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Resource: [resource],
          Effect: `${permission}`,
        },
      ],
    },
  };

  return authResponse;
};
