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

    interface TourGuideProfile {
        available: boolean;
        availableBalance: number;
        avatar: string;
        balance: number;
        bio: string;
        cancelledOrders: number;
        createdAt: string;
        deletedAt: string;
        dob: string;
        email: string;
        gender: string;
        id: number;
        interviewDate: string;
        name: string;
        numOfFavorites: number | string;
        password: string;
        phone: string;
        updatedAt: string;
        username: string;
        verifyStatus: string;
        avgStar: string;
        warningTime: number | string;
        numberOfOrder: number;
        orders: order.OrderDetail[];
        posts: [];
        provinces: location.Province[];
        tokenDevice: string;
        tours: tour.Tour[];
        userFavorites: []
    }

    interface TourGuideProfileResponse {
        returnValue: TourGuideProfile;
        message: string;
        code: string;
        statusCode: string;
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


