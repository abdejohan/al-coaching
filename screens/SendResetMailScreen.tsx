import { StyleSheet, View } from "react-native";
import Button from "../components/common/Button";
import { Paragraph, Headline, Subheading } from "../typography";

interface SendResetMailProps {
	navigation: any;
}

const SendResetMailScreen: React.FC<SendResetMailProps> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Headline>Skickat!</Headline>
			<Paragraph>
				Ett mail har skickats till den angivna mailadressen med instruktioner om hur du
				återställer ditt lösenord.
			</Paragraph>
			<Paragraph>
				Obs! Det kan dröja upp mot 30 minuter. Se även till att inget har hamnat i din
				skräppost.
			</Paragraph>
			<Subheading>Email</Subheading>
			<Button onPress={() => navigation.navigate("Login")}>Logga in</Button>
		</View>
	);
};

export default SendResetMailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
