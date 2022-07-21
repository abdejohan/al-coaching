import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import Information from "../components/Information";

interface ModalProps {
	route: any;
}

const ModalScreen: React.FC<ModalProps> = ({ route }) => {
	const { content } = route.params;
	return (
		<View style={styles.container}>
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
			{/* Use a light status bar on iOS to account for the black space above the modal */}

			{content === "information" && <Information />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});

export default ModalScreen;
