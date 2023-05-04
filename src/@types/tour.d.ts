declare namespace tour {
    interface TourSchedule {
        id: number;
        content: string;
        image: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
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
        images: string[];
        rates: string[];
        tourGuide: tourGuide.TourGuide[];
        userFavorites: [];
        tourSchedule: TourSchedule[];
        province: location.Province;
        overview: string;
        type: string;
    }
}
