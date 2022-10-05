import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Auth";
import * as TalkRn from "@talkjs/expo";
import { useIsFocused } from "@react-navigation/native";
import NotificationsContext from "../context/Notifications";
import Constants from "expo-constants";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const ChatScreen: React.FC = () => {
	const { user } = useContext(AuthContext);
	const { colors } = useTheme();
	const { setChatBadgeCount } = useContext(NotificationsContext);
	const isFocused = useIsFocused();

	const me: TalkRn.User = {
		id: "AL_" + user!.id.toString(),
		photoUrl: user?.avatar,
		name: user?.name,
		role: "default",
	};

	useEffect(() => {
		if (isFocused) {
			setChatBadgeCount(0);
		}
	}, [isFocused]);

	const other: TalkRn.User = { id: "AL_1" };
	const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other));
	conversationBuilder.setParticipant(me);
	conversationBuilder.setParticipant(other);

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<TalkRn.Session appId={Constants?.manifest?.extra?.chatAppID} me={me}>
				<TalkRn.Chatbox
					showChatHeader={false}
					highlightedWords={["Test"]} // only works with TalkJS growth plan
					conversationBuilder={conversationBuilder}
				/>
			</TalkRn.Session>
		</View>
	);
};

export default ChatScreen;
