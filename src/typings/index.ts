
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

interface Profile {
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
    role: string;
}

interface UserState {
    profile: Profile;
    token: string;
    userVouchers: [];
    userFavorites: [];
    orders: [];
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

interface OrderStatus {
    data: order.OrderDetail[];
    isLoading: boolean;
}

interface VoucherListType {
    data: voucher.Voucher[];
    isLoading: boolean;
}

interface OrdersState {
    orderWaiting: OrderStatus;
    orderProcessing: OrderStatus;
    orderFinished: OrderStatus;
    loadingKeys: Record<string, boolean>;
}

interface VouchersState {
    listVoucher: VoucherListType;
    myListVoucher: VoucherListType;
    loadingKeys: Record<string, boolean>;
}
