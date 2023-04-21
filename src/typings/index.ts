interface ResponseApiBase {
    code: string;
    message: string;
    statusCode: number;
    returnValue: []
}
interface ProvincesState {
    data: location.Province[];
    loadingKeys: Record<string, boolean>;
}

interface UserState {
    token: string;
}

interface TourOrderStatus {
    data: tour.Tour[];
    isLoading: boolean;
}

interface ToursState {
    data: tour.Tour[];
    orderWaiting: TourOrderStatus;
    orderProcessing: TourOrderStatus;
    orderFinished: TourOrderStatus;
    loadingKeys: Record<string, boolean>;
}
