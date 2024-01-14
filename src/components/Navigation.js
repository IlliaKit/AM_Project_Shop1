import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthContext } from "../context/AuthContext";
import SalesScreen from "../screens/SalesScreen";
import CartScreen from "../screens/CartScreen";
import PlaceOrder from "../screens/PlaceOrder";
import PlaceOrderSuc from "../screens/PlaceOrderSuc";
import MyAccount from "../screens/MyAccount";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  // Get information about the user from the authentication context
  const { userInfo } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userInfo.token ? (
          // If the user is authenticated, display screens for registered users
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sales"
              component={SalesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyAccount"
              component={MyAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlaceOrder"
              component={PlaceOrder}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlaceOrderSuc"
              component={PlaceOrderSuc}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // If the user is not authenticated, display screens for unauthenticated users
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
