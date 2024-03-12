import jwt from "jsonwebtoken";

export const handler = async (event) => {
  console.log(event);
  const token = event["authorizationToken"];
  const myToken = process.env.SECRET_TOKEN;
  const resource = event["methodArn"];
  let permission = "Deny";

  if (token == myToken) {
    permission = "Allow";
  }

  const authResponse = {
    principalId: "authLambda-to-microservice",
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
