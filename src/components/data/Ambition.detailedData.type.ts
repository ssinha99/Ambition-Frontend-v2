export type detailedData = {
    "data": Data[]
}

type Data = {
        goalId: string,
        cardHeading: string,
        amount: number,
        totalAmount: number,
        daystoGo: number,
        maturityDate: string,
        goalType: string,
        Mutualfunds: mutualFundType[],
        Stocks: stockType[]
}

type mutualFundType = {
    unitPrice: string,
    quantity: string,
    fundName: string,
    fundId: string,
    fundType: string
}

type stockType = {
    stockName: string,
    stockId: string,
    type: string,
    price: string,
    quantity: string
}