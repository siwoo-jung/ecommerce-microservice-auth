export const handler = async (event) => {
  // TODO implement
  console.log(event, "event");
  const token = event["authorizationToken"];

  let permission = "Deny";
  if (token == "my-secret-token") {
    permission = "Allow";
  }

  const authResponse = {
    principalId: "authLambda-to-microservice-Users",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Resource: [
            "arn:aws:execute-api:ap-southeast-2:654654470017:w103dzpock/*/GET/users",
          ],
          Effect: `${permission}`,
        },
      ],
    },
  };

  return authResponse;
};
