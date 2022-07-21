import React, { useContext } from "react";
import {
	configureFonts,
	Provider as PaperProvider,
	DefaultTheme as DefaultPaperTheme,
} from "react-native-paper";
import { Theme as PaperThemeType } from "react-native-paper/lib/typescript/types";
import { Theme as RNTheme } from "@react-navigation/native/lib/typescript/src/types";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import AuthContext from "./Auth";

declare global {
	namespace ReactNativePaper {
		interface ThemeColors {
			positive: string;
			negative: string;
			neutral: string;
			highlightText: string;
			darkfade: string;
			darkestfade: string;
			black: string;
			white: string;
			onSurface2: string;
		}
	}
}

const fontConfig = {
	web: {
		regular: {
			fontFamily: "ubuntu-regular",
			fontWeight: "normal",
		},
		medium: {
			fontFamily: "ubuntu-medium",
			fontWeight: "normal",
		},
		light: {
			fontFamily: "ubuntu-light",
			fontWeight: "normal",
		},
		thin: {
			fontFamily: "space-mono",
			fontWeight: "normal",
		},
	},
	ios: {
		regular: {
			fontFamily: "ubuntu-regular",
			fontWeight: "normal",
		},
		medium: {
			fontFamily: "ubuntu-medium",
			fontWeight: "normal",
		},
		light: {
			fontFamily: "ubuntu-light",
			fontWeight: "normal",
		},
		thin: {
			fontFamily: "space-mono",
			fontWeight: "normal",
		},
	},
	android: {
		regular: {
			fontFamily: "ubuntu-regular",
			fontWeight: "normal",
		},
		medium: {
			fontFamily: "ubuntu-medium",
			fontWeight: "normal",
		},
		light: {
			fontFamily: "ubuntu-light",
			fontWeight: "normal",
		},
		thin: {
			fontFamily: "space-mono",
			fontWeight: "normal",
		},
	},
};

/*
	Add global values inside defaultColors!
	If there are variables that need to be changed depending on user theme (dark or light),
	then place one in each object (defaultColor, darkColor). All other values that should apply to both themes,
	must be added to defaultColors.
*/

const defaultColors = {
	accent: "#C6CED5",
	primary: "#d0a058",
	background: "#F4F4F6",
	text: "#7E858B",
	highlightText: "#121212",
	surface: "#FFFFFF",
	disabled: "#63166f",
	error: "#C95D63",
	placeholder: "#212121",
	onSurface: "#F2F5F9",
	onSurface2: "#CCD0E0",
	notification: "#a498dc",
	// colors thats ment to be the same for both light and dark mode below here //
	positive: "#008000",
	negative: "#FF0000",
	neutral: "#4c4c4c",
	darkfade: "#00000066",
	darkestfade: "#00000099",
	black: "#121212",
	white: "#FFFFFF",
};

const darkColors = {
	...defaultColors,
	accent: "#1C1C1C",
	primary: "#d0a058",
	background: "#111111",
	text: "#989898",
	highlightText: "#E8E8E8",
	surface: "#1C1C1C",
	onSurface: "#282828",
	onSurface2: "#4F4F4E",
	disabled: "#63166f",
	error: "#C95D63",
	placeholder: "#FFFFFF",
	notification: "#a498dc",
};

export const PaperTheme: PaperThemeType = {
	...DefaultPaperTheme,
	roundness: 10,
	colors: {
		...DefaultPaperTheme.colors,
		...defaultColors,
	},
	fonts: configureFonts(fontConfig),
};
export const PaperThemeDark: PaperThemeType = {
	...DefaultPaperTheme,
	roundness: 10,
	colors: {
		...DefaultPaperTheme.colors,
		...darkColors,
	},
	dark: true,
};

export const NavigationLightTheme: RNTheme = {
	...DefaultTheme,
	colors: { ...DefaultTheme.colors },
};

export const NavigationDarkTheme: RNTheme = {
	...DarkTheme,
	colors: { ...DarkTheme.colors },
};

const InnerThemeProvider: React.FC = ({ children }) => {
	// const colorScheme = useColorScheme();
	const { user } = useContext(AuthContext);
	const paperTheme = user?.color_mode === "dark" ? PaperThemeDark : PaperTheme;

	return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
};

export const ThemeProvider: React.FC = ({ children }) => (
	<InnerThemeProvider>{children}</InnerThemeProvider>
);

export default { ThemeProvider };
