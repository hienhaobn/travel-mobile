interface ResponseApiBase {
    code: string;
    message: string;
    statusCode: number;
    returnValue: [];
}

interface ProvincesState {
    data: location.Province[];
    loadingKeys: Record<string, boolean>;
}

interface UserState {
    token: string;
    id: number;
    email: string;
    username: string;
    phone: string;
    balance: string;
    availableBalance: string;
    voucherPoint: number;
    avatar: string;
    verifyStatus: string;
    isSetup: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    userVouchers: [];
    userFavorites: [];
    orders: [];
    role: string;
    isLoading: boolean;
}

interface UserResponse {
    id: number;
    email: string;
    username: string;
    phone: string;
    balance: string;
    availableBalance: string;
    voucherPoint: number;
    avatar: string;
    verifyStatus: string;
    isSetup: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    userVouchers: [];
    userFavorites: [];
    orders: [];
    role: string;
}

interface TourOrderStatus {
    data: order.OrderRoleUser[];
    isLoading: boolean;
}

interface ToursState {
    data: tour.Tour[];
    orderWaiting: TourOrderStatus;
    orderProcessing: TourOrderStatus;
    orderFinished: TourOrderStatus;
    loadingKeys: Record<string, boolean>;
}
