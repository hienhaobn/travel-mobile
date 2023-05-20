declare namespace order {
    interface OrderTourRoleUser {
        basePrice: string;
        createdAt: string;
        deletedAt: null;
        description: string;
        feePerMember: string;
        id: number;
        maxMember: string;
        maxPrice: string;
        name: string;
        numOfFreeMember: number;
        status: string;
        updatedAt: string;
    }

    interface OrderTourGuideRoleUser {
        available: string;
        availableBalance: string;
        avatar: string;
        balance: string;
        bio: string;
        createdAt: string;
        deletedAt: string;
        dob: string;
        email: string;
        gender: string;
        id: number;
        interviewDate: string;
        name: string;
        numOfFavorites: number;
        password: string;
        phone: string;
        updatedAt: string;
        username: string;
        verifyStatus: string;
    }

    interface OrderDetail {
        createdAt: string;
        deletedAt: null;
        endDate: string;
        id: number;
        orderSchedule: [];
        paid: string;
        price: string;
        size: number;
        startDate: string;
        status: string;
        tour: unknown;
        tourGuide: unknown;
        updatedAt: string;
        star: number | null;
        userStart: boolean;
        tourGuideStart: boolean;
    }

    // TODO: miss order hdv
}
