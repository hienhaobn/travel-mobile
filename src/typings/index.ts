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
    userDataLoaded: false;
    loadingKeys: Record<string, boolean>;
}
