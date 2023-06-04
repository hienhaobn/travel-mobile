declare namespace tour {
    interface State {
        popularTours: {
            data: Tour[];
            total: number;
            currentPage: number;
            totalPages: number;
            limit: number;
        };
        isLoading: boolean;
    }

    interface TourSchedule {
        id: number;
        content: string;
        image: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
    }

    interface Rate  {
        id: number;
        content: string;
        star: number;
        tour: Tour;
        order: order.OrderDetail;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
    }

    interface Image {
        createdAt: string;
        id: number;
        updatedAt: string;
        url: string;
    }

    interface Tour {
        id: number;
        name: string;
        description: string;
        basePrice: string;
        maxPrice: string;
        maxMember: string;
        numOfFreeMember: string;
        feePerMember: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        status: string;
        images: Image[];
        rates: Rate[];
        tourGuide: tourGuide.TourGuideProfile;
        userFavorites: [];
        tourSchedule: TourSchedule[];
        province: location.Province;
        overview: string;
        type: string;
    }

    interface TourResponse {
        returnValue: {
            data: Tour[],
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
