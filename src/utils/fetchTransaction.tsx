import { get } from "../service/api/index"

export const fetchTransaction = async (connectedWalletAddress:string, storedValue:string) => {
    try {
        const data = await get(`/transactions/${connectedWalletAddress}`, storedValue);
        if (data && data.transactions) {
            return data.transactions;
        } else {
            console.error('Error fetching transactions: Data or transactions property is undefined');
            return [];
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};

