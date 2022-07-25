import { StyleSheet, ScrollView, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { useContext, useEffect, useState } from "react";
import { Meal } from "../types/types";
import { Paragraph } from "../typography";
import AuthContext from "../context/Auth";
import { Ionicons } from "@expo/vector-icons";

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
	const [dietPlanDays, setDietPlanDays] = useState<any>();
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
			const parseDietDays = JSON.parse(dietPlanData.diet.days);
			setDietPlanDays(parseDietDays);
		}
	}, [dietPlanData, dietError]);

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
			{dietPlanData &&
				!dietLoading &&
				dietPlanDays?.map((day: any, index: string) => (
					<ListItem
						key={index}
						title={day?.name}
						icon='fire'
						onPress={() => navigation.navigate("Ingredients", { meals: day.meals })}
					/>
				))}
			{!dietPlanData && !dietLoading && (
				<View>
					<Paragraph style={{ textAlign: "center" }}>
						Ojdå! Verkar som att du inte har något kostschema för tillfället. Kontakta din
						coach för mer information!{" "}
					</Paragraph>
					<Ionicons
						name='barbell-outline'
						style={{
							alignSelf: "center",
							margin: 5,
						}}
						color={colors.text}
						size={40}
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

/**
 * 	const totalDailyCalories = (meals: Array<Meal>) => {
		let calorieCount = 0;
		meals?.forEach((meal: Meal) => {
			meal?.products?.forEach((product: Product) => {
				calorieCount += product.kcal;
			});
		});
		return calorieCount;
	};
 * 
 * 
 * 
 * 	const totalMealCalories = (products: Array<Product>) => {
		let mealCalorieCount = 0;
		products?.forEach((product: Product) => {
			mealCalorieCount += product.kcal;
		});
		if (isFinite(mealCalorieCount)) {
			return mealCalorieCount;
		}
		return 0;
	};

	const totalMealCaloriePercentage = (products: Array<Product>) => {
		let productCalorieCount = 0;
		products?.forEach((product: Product) => {
			productCalorieCount += product.kcal;
		});
		const perc = (productCalorieCount / totalDailyCalories) * 100; // calculate percentage
		const roundedPercentage = Math.round(perc * 10) / 10; // rounds to one decimal
		if (isFinite(roundedPercentage)) {
			return roundedPercentage;
		}
		return 0;
	};
 */
