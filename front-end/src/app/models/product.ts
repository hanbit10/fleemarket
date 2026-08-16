import { user } from "./userInterface";

export class Product{
  _id?: string;
  title?: string;
  price?: number;
  category?: string;
  description?: string;
  imageUrl?: string[];
  user?: {userId: string, email: string};
  district?: string;
  dealType?: string;
  // contact?: user["email"];
  createdAt?: string;
}
