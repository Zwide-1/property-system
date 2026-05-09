export type PaymentStatus = "Paid" | "Pending";

export interface Property {
  id: string;
  title: string;
  price: number;
  status: PaymentStatus;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Stand in Borrowdale",
    price: 15000,
    status: "Paid",
  },
  {
    id: "2",
    title: "Stand in Ruwa",
    price: 8000,
    status: "Pending",
  },
  {
    id: "3",
    title: "Stand in Mt Pleasant",
    price: 20000,
    status: "Paid",
  },
];