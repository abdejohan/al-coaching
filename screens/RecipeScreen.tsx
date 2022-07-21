import { Dimensions, StyleSheet, View } from "react-native";
import recipeImg from "../assets/images/recipe-image.jpg";
import { useTheme, IconButton, Title } from "react-native-paper";
import HeroScrollView from "../components/common/HeroScrollView";
import Button from "../components/common/Button";
import ListItemBasic from "../components/common/ListItemBasic";
import { ProgressCircle } from "react-native-svg-charts";
import { Caption, Paragraph, Subheading, Text } from "../typography";
import Donut from "../animations/Donut";
import Count from "../animations/Count";

interface RecipeProps {
	navigation: any;
	route: any;
}

const RecipeScreen: React.FC<RecipeProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const screenWidth = Dimensions.get("window").width;
	const { dish } = route.params;
	const ingredients = JSON.parse(dish.product_ids);

	return (
		<HeroScrollView
			title={dish?.name}
			image={recipeImg}
			modal='information'
			faded
			button={<Button onPress={() => navigation.goBack()}>Tillbaka</Button>}>
			<View style={styles.subheader}>
				<IconButton
					style={{ padding: 0, margin: 0 }}
					icon='fire'
					color={colors.text}
					size={14}
				/>
				<Paragraph>{dish?.kcal} kcal</Paragraph>
				<IconButton
					style={{ padding: 0, margin: 0, marginLeft: 10 }}
					icon='watch'
					color={colors.text}
					size={14}
				/>
				<Paragraph>{dish?.preparation_time}</Paragraph>
			</View>
			<Paragraph>{dish?.description}</Paragraph>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginVertical: 20,
				}}>
				{/** -------- PROTEIN -------- */}
				<View
					style={{
						paddingVertical: 5,
						backgroundColor: colors.background,
						alignItems: "center",
						borderRadius: roundness,
						flexGrow: 2,
						marginRight: 10,
					}}>
					<Donut
						color={colors.primary}
						delay={200}
						percentage={dish?.protein}
						radius={screenWidth / 10}>
						<View
							style={[
								StyleSheet.absoluteFillObject,
								{ justifyContent: "center", alignItems: "center", flexDirection: "row" },
							]}>
							<Count
								delay={200}
								stop={dish.protein}
								style={{
									color: colors.highlightText,
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
								}}
							/>
							<Text
								style={{
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
									color: colors.highlightText,
								}}>
								%
							</Text>
						</View>
					</Donut>

					<Caption>Protein</Caption>
				</View>
				{/** -------- CARBS -------- */}
				<View
					style={{
						paddingVertical: 5,
						backgroundColor: colors.background,
						alignItems: "center",
						borderRadius: roundness,
						flexGrow: 2,
						marginRight: 10,
					}}>
					<Donut
						color={colors.primary}
						delay={200}
						percentage={dish?.carbs}
						radius={screenWidth / 10}>
						<View
							style={[
								StyleSheet.absoluteFillObject,
								{
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
								},
							]}>
							<Count
								delay={200}
								stop={dish?.carbs}
								style={{
									color: colors.highlightText,
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
								}}
							/>
							<Text
								style={{
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
									color: colors.highlightText,
								}}>
								%
							</Text>
						</View>
					</Donut>
					<Caption>Kolhydrater</Caption>
				</View>
				{/** -------- FAT -------- */}
				<View
					style={{
						paddingVertical: 5,
						backgroundColor: colors.background,
						alignItems: "center",
						borderRadius: roundness,
						flexGrow: 2,
					}}>
					<Donut
						color={colors.primary}
						delay={200}
						percentage={dish?.fat}
						radius={screenWidth / 10}>
						<View
							style={[
								StyleSheet.absoluteFillObject,
								{ justifyContent: "center", alignItems: "center", flexDirection: "row" },
							]}>
							<Count
								delay={200}
								stop={dish?.fat}
								style={{
									color: colors.highlightText,
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
								}}
							/>
							<Text
								style={{
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
									color: colors.highlightText,
								}}>
								%
							</Text>
						</View>
					</Donut>
					<Caption>Fett</Caption>
				</View>
			</View>
			{ingredients &&
				ingredients.map((ingredient: any, index: number) => (
					<ListItemBasic
						key={index}
						title={ingredient?.name}
						descriptionLeft={`${ingredient?.protein}g	 \u00B7 ${ingredient?.unit}`}
						descriptionRight={`${ingredient?.kcal} kcal`}
					/>
				))}

			<Subheading
				style={{
					color: colors.highlightText,
					fontFamily: "ubuntu-medium",
					marginTop: 10,
					marginLeft: 7,
				}}>
				Gör såhär:
			</Subheading>
			<Paragraph
				style={{
					marginLeft: 10,
				}}>
				{dish?.comment}
			</Paragraph>
		</HeroScrollView>
	);
};

export default RecipeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subheader: {
		left: -4,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
});
