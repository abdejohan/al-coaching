import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Paragraph, Subheading } from "../typography";
import { useCallback, useState } from "react";

interface DietProps {
	navigation: any;
}

const DietPlansScreen: React.FC<DietProps> = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);
	const { useAxios } = useAxiosAuthenticated();
	const { colors } = useTheme();
	const [{ data: dietPlans, loading: dietLoading, error: dietError }, fetchDietPlans] =
		useAxios({
			method: "GET",
			url: "/diet/list/get",
		});

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchDietPlans()
			.then(() => setRefreshing(false))
			.catch(() => {});
	}, []);

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: colors.background }]}
			refreshControl={
				<RefreshControl
					titleColor={colors.primary}
					colors={[colors.primary]}
					tintColor={colors.primary}
					progressBackgroundColor={colors.surface}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}>
			{/** DISPLAYS THE LIST.ITEMS IF DATA EXISTS. */}
			{dietPlans &&
				!dietLoading &&
				dietPlans?.map((dietPlan: any, index: number) => (
					<ListItem
						key={index}
						title={dietPlan?.name}
						onPress={() =>
							navigation.navigate("DietPlan", {
								dietPlanId: dietPlan.id,
								name: dietPlan?.name,
							})
						}
					/>
				))}
			{/** DISPLAYS "NO DIET PLANS" MESSAGE. */}
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
