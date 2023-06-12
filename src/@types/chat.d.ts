declare namespace chat {
    interface Message {
        created_at: string;
        message: string;
        id: number;
        sender: 'USER' | 'TOURGUIDE';
        userId: number;
        tourGuideId: number;
        tourGuide: tourGuide.TourGuideProfile;
        user: Profile;
    }

    interface RegisterDeviceParams {
        type?: string;
        tokenDevice: string;
    }
}
