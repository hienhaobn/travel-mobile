interface ProvinceBaseProps {
    id: number;
    name: string;
    slug: string;
    description: string;
    numOfFavorites: number;
    images: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: number;
}

interface Province extends ProvinceBaseProps {
    tours: tour.Tour[];
}

interface ProvincesState {
    data: Province[];
    loadingKeys: Record<string, boolean>;
}

interface UserState {
    token: string;
}
