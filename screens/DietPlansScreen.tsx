import { StyleSheet, ScrollView, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Paragraph, Subheading } from "../typography";

interface DietProps {
	navigation: any;
}

const DietPlansScreen: React.FC<DietProps> = ({ navigation }) => {
	const { useAxios } = useAxiosAuthenticated();
	const { colors } = useTheme();
	const [{ data: dietPlans, loading: dietLoading, error: dietError }] = useAxios({
		method: "GET",
		url: "/diet/list/get",
	});

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{dietLoading && (
				<ActivityIndicator
					animating={dietLoading}
					color={colors.primary}
					size='large'
					style={{ marginTop: 100 }}
				/>
			)}
			{dietPlans &&
				!dietLoading &&
				dietPlans?.map((dietPlan: any, index: number) => (
					<ListItem
						key={index}
						title={dietPlan?.name}
						onPress={() => navigation.navigate("DietPlan", { dietPlanId: dietPlan.id })}
					/>
				))}
			{!dietPlans && !dietLoading && (
				<View style={{ paddingTop: 50 }}>
					<Subheading style={{ textAlign: "center", fontSize: 16, marginBottom: 5 }}>
						Hittade inget!
					</Subheading>
					<Paragraph style={{ textAlign: "center", paddingHorizontal: 40 }}>
						Tråkigt nog ser det ut som att du inte har några kostscheman för tillfället.
					</Paragraph>
					<Paragraph style={{ textAlign: "center" }}>
						Kontakta din coach för mer information!
					</Paragraph>
					<MaterialCommunityIcons
						name='food-turkey'
						color={colors.text}
						size={40}
						style={{
							alignSelf: "center",
							margin: 5,
							marginTop: 50,
						}}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default DietPlansScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
