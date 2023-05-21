declare namespace user {
    interface Voucher {
        id: number;
        name: string;
        description: string;
        code: string;
        discountType: string;
        value: number;
        quantity: number;
        requirementPoint: number;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        claimed: string;
    }

    interface VoucherResponse {
        data: Voucher[];
        total: number;
        currentPage: number;
        totalPages: number;
        limit: number;
    }
}
