/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
	NavigationContainer,
	useNavigationContainerRef,
	useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { useColorScheme } from "react-native";
import { RootStackParamList } from "../types/index";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/LoginScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { NavigationDarkTheme, NavigationLightTheme } from "../context/Theme";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import { useTheme, IconButton } from "react-native-paper";
import SendResetMailScreen from "../screens/SendResetMailScreen";
import IntroScreen from "../screens/IntroScreen";
import LoggedInNavigator from "./LoggedInNavigator";
import NotificationsContext from "../context/Notifications";
import { navigationRef } from "./RootNavigation";
export default function Navigation(props: any) {
	const { initialRoute } = props;
	const colorScheme = useColorScheme();
	const { setCurrentRoute } = useContext(NotificationsContext);

	return (
		<NavigationContainer
			onStateChange={(e) => {
				const route = navigationRef.getCurrentRoute();
				route && setCurrentRoute(route.name);
			}}
			//linking={LinkingConfiguration}
			//theme={colorScheme === "dark" ? NavigationDarkTheme : NavigationLightTheme}
			theme={NavigationDarkTheme}
			ref={navigationRef}>
			<RootNavigator initialRoute={initialRoute} />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(props) {
	const { initialRoute } = props;

	return (
		<Stack.Navigator
			screenOptions={{
				headerShadowVisible: false,
			}}
			initialRouteName={initialRoute}>
			<Stack.Screen
				name='Intro'
				component={IntroScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='LoggedIn'
				component={LoggedInNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='NotFound'
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
			<Stack.Screen
				name='ForgotPassword'
				component={ForgotPasswordScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='SendResetMail'
				component={SendResetMailScreen}
				options={{
					headerTitleAlign: "center",
					title: "Återställ lösenord",
					headerBackVisible: false,
				}}
			/>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name='Modal'
					component={ModalScreen}
					options={{
						headerLeft: () => backIcon(),
						title: "",
						headerBackVisible: false,
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
}

// Icon for the back button in navigation header
function backIcon() {
	const navigation = useNavigation();
	const { colors } = useTheme();
	return (
		<IconButton
			icon='chevron-left'
			size={40}
			color={colors.text}
			rippleColor='rgba(0,0,0, 0)'
			style={{ marginLeft: 0, width: 45, height: 45 }}
			onPress={() => {
				navigation.goBack();
			}}
		/>
	);
}
