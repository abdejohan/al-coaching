import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

interface NotFoundProps {
	navigation: any;
}

const NotFoundScreen: React.FC<NotFoundProps> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>This screen doesn't exist.</Text>
			<TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.link}>
				<Text style={styles.linkText}>Go to home screen!</Text>
			</TouchableOpacity>
		</View>
	);
};

export default NotFoundScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});
