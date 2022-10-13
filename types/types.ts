type User = {
	active: number;
	activity_today: string;
	allergies: null;
	authToken: null;
	avatar: null;
	checkinday: number;
	comment: null;
	created_at: string;
	current_weight: number;
	device_token: string;
	diet_pickles: null;
	email: string;
	email_verified_at: null;
	experiences: string;
	form_saved: number;
	gender: string;
	progress_weight: {
		amount: number;
		status: number;
	};
	goal: string;
	goal_weight: number;
	height: number;
	id: number;
	latest_week_update_date: null;
	lifestyle: null;
	meal_per_day: number;
	name: string;
	personal_number: number;
	phone: number;
	pm_last_four: any;
	pm_type: any;
	read_week_update: number;
	requested_end_subscription: any;
	requested_end_subscription_date: any;
	role: string;
	sickness: string;
	start_date: string;
	start_weight: number;
	status_message: any;
	stripe_id: any;
	tags: string;
	training_days_per_week: number;
	training_place: string;
	trial_ends_at: any;
	updated_at: string;
	weekly_update_sent: number;
};

type ValidInput = {
	valid: boolean;
	text: string;
};

type ImageObject = {
	uri: string;
	base64: string | undefined;
};

type WorkoutDay = {
	id: number;
	name: string;
	meals: Array<Meal>;
};

type Meal = {
	comment: string;
	id: number;
	name: string;
	products: Array<Product>;
};

type Product = {
	allergies: string | Array<string>;
	carbs: number;
	category: number;
	comment: string;
	created_at: Date;
	fat: number;
	gram: string;
	grams: string | Array<string | number>;
	id: number;
	kcal: number;
	name: string;
	protein: number;
	unit: number;
	unitgram: number;
	updated_at: Date;
	video: string;
};

// START WORKOUT RELATED

type SaveSet = {
	saved_reps: string;
	saved_weight: string;
	set_id: number;
	comment: string;
};

type Set = {
	reps: string;
	seconds: string;
	weight: string;
	set_id: number;
	comment: string;
};
// END WORKOUT RELATED

type ToggleType = "checked" | "unchecked" | undefined;

type ValidationRules =
	| "name"
	| "email"
	| "emailOrNull"
	| "phone"
	| "phoneOrNull"
	| "min5"
	| "min40"
	| "min1"
	| "text"
	| "onlyDigits"
	| "weightOrHeight"
	| "null";

type autoCompleteTypes =
	| "off"
	| "username"
	| "password"
	| "email"
	| "name"
	| "tel"
	| "street-address"
	| "postal-code"
	| "cc-number"
	| "cc-csc"
	| "cc-exp"
	| "cc-exp-month"
	| "cc-exp-year";

type autoCapitalizeTypes = "none" | "sentences" | "words" | "characters";
type BlobProps = "Blob | Uint8Array | ArrayBuffer";

export {
	ValidInput,
	autoCapitalizeTypes,
	autoCompleteTypes,
	ToggleType,
	ImageObject,
	Meal,
	WorkoutDay,
	Product,
	User,
	BlobProps,
	ValidationRules,
	SaveSet,
	Set,
};
