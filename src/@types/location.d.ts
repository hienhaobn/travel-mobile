declare namespace location {
    interface ProvincesResponse {
        message: string;
        code: string;
        data: Province[];
    }

    interface Province {
        id: string;
        name: string;
        slug: string;
        description: string;
        numOfFavorites: number | string;
        images: string
        tours: tour.Tour[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }
}
