import React, {createContext, useContext, useState} from "react";
import Pool from "./Userpool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

const AccountContext = createContext();

const Account = (props) => {

//const navigate = useNavigate();

  const getSession = async() => {

    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if(user) {
         user.getSession((error, session) => {
          if(error) {
            reject();
          } else {
            resolve(session);
          }

         });
      } else {
        reject();
      }

    });

  };

    const authenticate = async(Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({Username, Pool});
      
            const authDetails = new AuthenticationDetails({Username, Password });
        
              user.authenticateUser(authDetails,{
                onSuccess: (data) => {
                  console.log("onSuccess:", data);
                  resolve(data);
                  console.log("Hello login is successful");
                  //navigate('/ButtonPanel');

                },
                onFailure: (err) => {
                  console.error("onFailure:", err);
                  reject(err);
                },
                newPasswordRequired: (data) => {
                  console.log("newPasswordRequired:", data);
                  resolve(data);
                },
        
              });

        })

    };


    const logouts = () => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.signOut();
        console.log("Logout was pressed");
        //navigate("/Login");   
      }
    };
    return(
        <AccountContext.Provider value = {{authenticate, getSession, logouts}}>
            {props.children}
        </AccountContext.Provider>
    )

};
const useAccount = () => {
  return useContext(AccountContext);
};

export { Account, AccountContext, useAccount};