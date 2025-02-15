//Refund Order structure 
export type Order = {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number;
    active: boolean;
    decision: 'not yet' | 'reject' | 'accept' | 'escalate' | null;
    Items: {
      name: string;
      id: string;
      price: number;
      quantity: number;
    }[];
  };
  