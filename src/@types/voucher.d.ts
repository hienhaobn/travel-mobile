declare namespace voucher {
    enum DiscountType {
        RATE = '0',
        FIX = '1',
    }
    interface Voucher {
        id: number;
        name: string;
        description: string;
        code: string;
        claimed: string;
        discountType: DiscountType;
        value: number;
        quantity: number;
        requirementPoint: number;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
    }
}
