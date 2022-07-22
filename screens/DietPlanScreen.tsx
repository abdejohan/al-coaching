import { StyleSheet, ScrollView, View } from "react-native";
import { ActivityIndicator, Card, useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import diet_rest_day from "../assets/images/diet_rest_day.jpg";
import diet_workout_day from "../assets/images/diet_workout_day.jpg";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Meal, Product, WorkoutDay } from "../types/types";
import { Paragraph, Subheading } from "../typography";
import AuthContext from "../context/Auth";

interface DietProps {
	navigation: any;
	route: any;
}

type DietPlan = {
	id: number;
	name: string;
	meals: Array<Meal>;
};

const DietPlanScreen: React.FC<DietProps> = ({ navigation, route }) => {
	const { useAxios } = useAxiosAuthenticated();
	const [dietPlan, setDietPlan] = useState<DietPlan>();
	const { colors } = useTheme();
	const { dietPlanId } = route.params;
	const { user } = useContext(AuthContext);
	const [{ data: dietPlanData, loading: dietLoading, error: dietError }] = useAxios({
		method: "POST",
		url: "/diet/get",
		data: { id: dietPlanId },
	});

	useEffect(() => {
		if (dietPlanData) {
			const withoutFirstAndLast = dietPlanData.diet.days.slice(1, -1);
			const parsedDietPlanData = JSON.parse(withoutFirstAndLast);
			setDietPlan(parsedDietPlanData);
		}
	}, [dietPlanData]);

	const totalDailyCalories = (meals: Array<Meal>) => {
		let calorieCount = 0;
		meals?.forEach((meal: Meal) => {
			meal?.products?.forEach((product: Product) => {
				calorieCount += product.kcal;
			});
		});
		return calorieCount;
	};

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{false && dietLoading && (
				<ActivityIndicator
					animating={dietLoading}
					color={colors.primary}
					size='large'
					style={{ marginTop: 100 }}
				/>
			)}
			{dietPlan && !dietLoading && (
				<Card
					style={{ marginBottom: 10, elevation: 0 }}
					onPress={() =>
						navigation.navigate("DietCategories", {
							meals: dietPlan.meals,
						})
					}>
					<Card.Cover source={diet_workout_day} />
					<Card.Actions style={{ padding: 0, paddingTop: 10, paddingRight: 10 }}>
						<ListItem
							title={dietPlan.name}
							description={`${totalDailyCalories(dietPlan.meals)} kalorier`}
							icon='fire'
						/>
					</Card.Actions>
				</Card>
			)}
			{!dietPlan && !dietLoading && (
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

export default DietPlanScreen;

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
