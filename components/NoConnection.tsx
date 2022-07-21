import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline, Subheading } from "../typography";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const NoConnection: React.FC = () => {
	const { colors } = useTheme();

	return (
		<>
			<StatusBar style='light' />
			<View
				style={[
					StyleSheet.absoluteFillObject,
					{
						zIndex: 1,
						backgroundColor: colors.black,
						justifyContent: "center",
						alignItems: "center",
						flex: 1,
						padding: 20,
					},
				]}>
				<View style={{ margin: 20 }}>
					<Headline
						style={{ color: colors.white, textAlign: "center", marginBottom: 40 }}>
						NO CONNECTION!
					</Headline>
					<Subheading style={{ color: colors.white, textAlign: "center" }}>
						Du saknar tyvärr
					</Subheading>
					<Subheading style={{ color: colors.white, textAlign: "center" }}>
						internetanslutning just nu.
					</Subheading>
					<Subheading style={{ color: colors.white, textAlign: "center" }}>
						Kontrollera dina nätverksinställningar
					</Subheading>
					<Subheading style={{ color: colors.white, textAlign: "center" }}>
						och försök igen.
					</Subheading>
				</View>
			</View>
		</>
	);
};

export default NoConnection;
