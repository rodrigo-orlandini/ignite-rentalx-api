interface ICreateRentalDTO {
    carId: string;
    userId: string;
    expectedReturnDate: Date;
    id?: string;
    endDate?: Date;
    total?: number;
}

export { ICreateRentalDTO };