import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View, Linking } from "react-native";
import StartScreen from "../screens/StartScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import WorkoutOverviewScreen from "../screens/WorkoutOverviewScreen";
import WorkoutSession from "../screens/WorkoutSession";
import CheckInScreen from "../screens/CheckInScreen";
import DietPlansScreen from "../screens/DietPlansScreen";
import IngredientsScreen from "../screens/IngredientsScreen";
import ChatScreen from "../screens/ChatScreen";
import { IconButton, TouchableRipple, useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
	BottomTabParamList,
	DietTabParmList,
	LoggedInStackParmList,
	StartTabParmList,
	WorkoutTabParmList,
} from "../types/navigation";
import IntroSlider from "../components/IntroSlider";
import SettingsScreen from "../screens/SettingsScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import { useContext } from "react";
import AuthContext from "../context/Auth";
import NotificationsContext from "../context/Notifications";
import Constants from "expo-constants";
import DietPlanScreen from "../screens/DietPlanScreen";

const LoggedInStack = createNativeStackNavigator<LoggedInStackParmList>();
export default function LoggedInNavigator() {
	const { colors } = useTheme();

	return (
		<LoggedInStack.Navigator
			initialRouteName='BottomNavigator'
			screenOptions={{
				headerShown: true,
				headerShadowVisible: false,
				headerBackTitleVisible: false,
				headerTitleStyle: { fontFamily: "ubuntu-light", color: colors.text },
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: colors.background },
			}}>
			<LoggedInStack.Screen
				options={{ headerShown: false }}
				name='BottomNavigator'
				component={BottomTabNavigator}
			/>
			<LoggedInStack.Screen
				name='IntroSlider'
				component={IntroSlider}
				options={{ headerShown: false }}
			/>
			<LoggedInStack.Screen
				name='Ingredients'
				component={IngredientsScreen}
				options={{
					headerLeft: () => backIcon(),
					title: "Ingredienser",
				}}
			/>
			<LoggedInStack.Screen
				name='DietPlan'
				component={DietPlanScreen}
				options={{
					headerLeft: () => backIcon(),
					title: "Måltider",
				}}
			/>
			<LoggedInStack.Screen
				name='WorkoutOverview'
				component={WorkoutOverviewScreen}
				options={{
					headerBackVisible: false,
					headerShown: false,
				}}
			/>
			<LoggedInStack.Screen
				name='WorkoutSession'
				options={{ headerShown: false }}
				component={WorkoutSession}
			/>
			<LoggedInStack.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					title: "Inställningar",
					headerTitleAlign: "center",
					headerLeft: () => backIcon(),
					headerTitleStyle: { fontFamily: "ubuntu-light", color: colors.text },
				}}
			/>
			<LoggedInStack.Screen
				name='Subscription'
				component={SubscriptionScreen}
				options={{
					headerLeft: () => backIcon(),
					title: "Prenumeration",
					headerTitleAlign: "center",
					headerTitleStyle: { fontFamily: "ubuntu-light", color: colors.text },
				}}
			/>
			<LoggedInStack.Screen
				name='CheckIn'
				component={CheckInScreen}
				options={{
					headerLeft: () => backIcon(),
					title: "Veckouppdatering",
				}}
			/>
			<LoggedInStack.Screen
				name='Chat'
				component={ChatScreen}
				options={{
					headerLeft: () => backIcon(),
					headerTitle: Constants!.manifest!.extra!.coachName,
				}}
			/>
		</LoggedInStack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
	const { colors, roundness } = useTheme();
	//const colorScheme = useColorScheme();
	const { user } = useContext(AuthContext);
	const { chatBadgeCount } = useContext(NotificationsContext);

	return (
		<BottomTab.Navigator
			initialRouteName='StartTab'
			screenOptions={{
				tabBarStyle: {
					height: 100,
					paddingBottom: 30,
					elevation: 0,
					backgroundColor: colors.background,
					width: "100%",
					paddingHorizontal: 20,
					borderTopWidth: 0,
				},
				tabBarBackground: () => (
					<View
						style={{
							height: 70,
							width: "93%",
							shadowOffset: { width: 0, height: 3 },
							shadowColor: colors.darkfade,
							shadowOpacity: 0.4,
							elevation: 2,
							position: "absolute",
							alignSelf: "center",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: roundness,
							borderTopColor:
								user?.color_mode === "dark" ? colors.darkfade : colors.onSurface,
							borderTopWidth: 0.5,
							backgroundColor: colors.surface,
						}}
					/>
				),
				tabBarItemStyle: {
					margin: 10,
					marginLeft: 5,
					marginRight: 5,
					borderRadius: roundness,
				},
				tabBarActiveTintColor:
					user?.color_mode === "dark" ? colors.highlightText : colors.primary,
				tabBarInactiveTintColor: colors.text,

				tabBarActiveBackgroundColor: colors.background,
				tabBarInactiveBackgroundColor: colors.surface,
				tabBarShowLabel: false,
				headerTitleAlign: "center",
				headerShown: false,
			}}>
			<BottomTab.Screen
				name='StartTab'
				component={StartTabNavigator}
				options={{
					title: "Start",
					tabBarIcon: ({ color }) => (
						<Ionicons size={25} name='home-outline' color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name='WorkoutTab'
				component={WorkoutTabNavigator}
				options={{
					title: "Workout",
					tabBarIcon: ({ color }) => (
						<Ionicons size={25} name='barbell-outline' color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name='DietTab'
				component={DietTabNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<SimpleLineIcons name='notebook' size={20} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name='ChatTab'
				listeners={{ tabPress: (e) => e.preventDefault() }} // disables bottom navigation chat tab
				component={ChatScreen}
				options={({ navigation }) => ({
					headerShown: true,
					headerShadowVisible: false,
					headerTitle: Constants!.manifest!.extra!.coachName,
					headerTitleStyle: {
						color: colors.text,
						fontFamily: "ubuntu-light",
					},
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerLeft: () => backIcon(),
					tabBarBadge: chatBadgeCount > 0 ? chatBadgeCount : undefined, // remove badge if count is zero
					tabBarStyle: { display: "none" },
					tabBarIcon: ({ color }) => (
						<TouchableRipple
							rippleColor='transparent'
							onPress={() => navigation.navigate("Chat")}>
							<Ionicons name='chatbox-ellipses-outline' size={25} color={color} disable />
						</TouchableRipple>
					),
				})}
			/>
		</BottomTab.Navigator>
	);
}

const StartTabStack = createNativeStackNavigator<StartTabParmList>();
function StartTabNavigator() {
	const { colors } = useTheme();
	return (
		<StartTabStack.Navigator
			initialRouteName='Start'
			screenOptions={{
				headerShown: true,
				headerShadowVisible: false,
				headerBackTitleVisible: false,
				headerTitleStyle: { fontFamily: "ubuntu-light", color: colors.text },
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: colors.background },
			}}>
			<StartTabStack.Screen
				name='Start'
				component={StartScreen}
				options={({ navigation }) => ({
					title: "Översikt",
					headerLeft: () => null,
					headerRight: () => (
						<IconButton
							icon='cog'
							color={colors.text}
							size={25}
							onPress={() => navigation.navigate("Settings")}
						/>
					),
				})}
			/>
		</StartTabStack.Navigator>
	);
}

const WorkoutTabStack = createNativeStackNavigator<WorkoutTabParmList>();
function WorkoutTabNavigator() {
	const { colors } = useTheme();

	return (
		<WorkoutTabStack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerShadowVisible: false,
				headerTitleStyle: { fontFamily: "ubuntu-light", color: colors.text },
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: colors.background },
			}}>
			<WorkoutTabStack.Screen
				name='Workout'
				options={{ title: "Träningschema" }}
				component={WorkoutScreen}
			/>
		</WorkoutTabStack.Navigator>
	);
}

const DietTabStack = createNativeStackNavigator<DietTabParmList>();
function DietTabNavigator() {
	const { colors } = useTheme();

	return (
		<DietTabStack.Navigator
			screenOptions={{
				headerShown: true,
				headerRight: () => (
					<IconButton
						icon='information-outline'
						size={20}
						onPress={() => Linking.openURL("https://trainmarbella.se/info-kostplan/")}
					/>
				),
				headerBackTitleVisible: false,
				headerShadowVisible: false,
				headerTitleStyle: { fontFamily: "ubuntu-light", color: colors.text },
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: colors.background },
			}}>
			<DietTabStack.Screen
				name='DietPlans'
				component={DietPlansScreen}
				options={{
					title: "Kostscheman",
				}}
			/>
		</DietTabStack.Navigator>
	);
}

// Icon for the back button in navigation header
function backIcon() {
	const navigation = useNavigation();
	const theme = useTheme();
	return (
		<IconButton
			//icon={Platform.OS === "ios" ? "chevron-left" : "arrow-left"}
			icon={"arrow-left"}
			size={20}
			color={theme.colors.text}
			rippleColor='rgba(0,0,0, 0)'
			style={{
				marginLeft: 0,
				width: 45,
				height: 45,
				// This 'top' will compensate for the smaller default header that iOS devices have
				top: Platform.OS === "ios" ? -5 : 0,
			}}
			onPress={() => navigation.goBack()}
		/>
	);
}
