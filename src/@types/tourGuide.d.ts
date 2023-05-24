declare namespace tourGuide {

    interface State {
        data: TourGuide[];
        total: number;
        currentPage: number;
        totalPages: number;
        limit: number;
        isLoading: boolean;
    }

    interface TourGuide {
        tourGuideId: number;
        tourGuideUsername: string;
        tourGuideBio: string;
        tourGuideAvatar: string;
        tourGuideEmail: string;
        tourGuidePhone: string;
        tourGuideName: string;
        provinceName: string;
        tourGuideGender: string;
        tourGuideDob: string;
        tourGuideStatus: string;
        numOfFavorites: number;
        totalTour: string;
        totalFavorite: string;
        star: string;
    }

    interface TourGuideResponse {
        returnValue: {
            data: TourGuide[];
            total: number;
            currentPage: number;
            totalPages: number;
            limit: number;
        };
        message: string;
        code: string;
        statusCode: string;
    }
}
