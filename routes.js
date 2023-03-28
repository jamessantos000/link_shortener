import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Home from "./home";
import ListLink from "./controller/listLink";
import LinkProvider from "./context/context";

export default function Routes() {
    return (
        <NavigationContainer>
            <LinkProvider>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="History" component={ListLink} />
                </Stack.Navigator>
            </LinkProvider>
        </NavigationContainer>
    )
}