declare global {
	namespace ReactNavigation {
		interface LoggedInBottomTabParamList extends RootStackParamList {}
	}
}

type RootStackParamList = {
	Intro: undefined;
	Login: undefined;
	LoggedIn: undefined;
	ForgotPassword: undefined;
	SendResetMail: undefined;
	Modal: undefined | {};
	NotFound: undefined;
};

type LoggedInStackParmList = {
	BottomNavigator: undefined;
	Settings: undefined;
	Subscription: undefined;
	IntroSlider: undefined;
	WorkoutOverview: undefined;
	WorkoutSession: undefined;
	DietPlan: undefined;
	Deals: undefined;
	Meals: undefined;
	Ingredients: undefined;
	Modal: undefined;
	NotFound: undefined;
	Chat: undefined;
	CheckIn: undefined;
};

type BottomTabParamList = {
	StartTab: undefined;
	WorkoutTab: undefined;
	DietTab: undefined;
	ChatTab: undefined;
	Modal: undefined;
	NotFound: undefined;
};

type StartTabParmList = {
	Start: undefined;
	Settings: undefined;
	Subscription: undefined;
	CheckIn: undefined;
	Modal: undefined;
	NotFound: undefined;
};

type WorkoutTabParmList = {
	Workout: undefined;
	WorkoutOverview: undefined;
	WorkoutSession: undefined;
	Modal: undefined;
	NotFound: undefined;
};

type DietTabParmList = {
	DietPlans: undefined;
	DietPlan: undefined;
	Ingredients: undefined;
	Modal: undefined;
	NotFound: undefined;
};

/* NOT USED */
type ChatTabParmList = {
	Chat: undefined;
	Modal: undefined;
	NotFound: undefined;
};

export {
	RootStackParamList,
	BottomTabParamList,
	LoggedInStackParmList,
	StartTabParmList,
	WorkoutTabParmList,
	DietTabParmList,
	ChatTabParmList,
};
