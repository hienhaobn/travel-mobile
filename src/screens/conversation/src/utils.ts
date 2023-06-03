import { navigate } from 'navigation/utils';

export const goToConversation = (chatId: string, user?: Profile, tourGuide?: tourGuide.TourGuideProfile) => navigate('Conversation', { chatId, user, tourGuide });
