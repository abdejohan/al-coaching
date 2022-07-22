import { StyleSheet, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { Meal, Product } from "../types/types";
import { Paragraph } from "../typography";

interface DietCategoriesProps {
	navigation: any;
	route: any;
}

const DietCategoriesScreen: React.FC<DietCategoriesProps> = ({ navigation, route }) => {
	const { colors } = useTheme();
	const { meals, totalDailyCalories } = route.params;

	const totalMealCalories = (products: Array<Product>) => {
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

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{meals ? (
				meals?.map((meal: Meal, index: string) => (
					<ListItem
						key={index}
						title={meal.name}
						description={`${totalMealCalories(meal.products)} kalorier`}
						icon='fire'
						percentage={`${totalMealCaloriePercentage(meal.products)}`}
						onPress={() => navigation.navigate("DietCategory", { meal: meal })}
					/>
				))
			) : (
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

export default DietCategoriesScreen;

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
