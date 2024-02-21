 import { ReactNode } from "react";
 
 export interface AppProps {
    children?: ReactNode;
  }

export interface FormData {
    address: string;
    value: number;
  }

  export type Transaction = {
    _id: string;
    sender_address: string;
    receiver_address: string;
    amount: number;
    transaction_hash: string;
    block_number: number;
    created_at: string;
};
