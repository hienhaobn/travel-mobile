import { navigate } from 'navigation/utils';

export const goToConversation = (chatId: string) => navigate('Conversation', { chatId });
