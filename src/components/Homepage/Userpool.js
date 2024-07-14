import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {       //object to hold the pool data
            UserPoolId: "us-west-2_T5yv9WFqZ",         
            ClientId: "39vum7adsq7sfcs1fc8hpmfp4r"
}

export default new CognitoUserPool(poolData);