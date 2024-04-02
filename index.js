import jwt from "jsonwebtoken";

export const handler = async (event) => {
  const resource = event["methodArn"];
  const accessToken = event.headers.authorization.split(" ")[1];
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return {
      principalId: "authLambda-to-microservice",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Resource: [resource],
            Effect: "Allow",
          },
        ],
      },
    };
  } catch (e) {
    console.log("Auth Failed");
    return e;
  }
};
