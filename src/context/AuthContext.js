import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { Alert } from "react-native";

// Create an authentication context
export const AuthContext = createContext();

// Authentication context provider component
export const AuthProvider = ({ children }) => {
  // States to store user information, loading state, and splash screen state
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  // User registration functionя
  const register = (username, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
        Alert.alert("", "Registration completed successfully");
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        Alert.alert("Ups..", "Something went wrong, try again");
        setIsLoading(false);
      });
  };

  // User login function
  const login = (username, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/login`, {
        password,
        username,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        Alert.alert("Ups..", "Something went wrong, try again");
        setIsLoading(false);
      });
  };

  // User exit function
  const logout = () => {
    setIsLoading(true);
    setUserInfo({});
    setIsLoading(false);
  };

  // Function to check if the user is logged in
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  // Run an authorization check when loading the application
  useEffect(() => {
    isLoggedIn();
  }, []);

  // Provide context and values ​​of functions and states to descendants
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
