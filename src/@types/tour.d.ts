declare namespace tour {
    interface Tour {
        id: number;
        name: string;
        description: string;
        basePrice: string;
        maxPrice: string;
        maxMember: string;
        numOfFreeMember: string;
        feePerMember: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        status: '1';
        images: string[];
        rates: string[];
        tourGuide: tourGuide.TourGuide[];
        userFavorites: [];
        tourSchedule: [];
        province: location.Province;
    }
}
