import { IMAGES } from "#/constants/images";

export interface SnackItem {
  id: string;
  title: string;
  category: string;
  price: number;
  image: any;
  backgroundColor: string;
}

export const SNACK_DATA: SnackItem[] = [
  {
    id: "1",
    title: "Good Source",
    category: "Chocolates",
    price: 8.0,
    image: IMAGES.chip1,
    backgroundColor: "#FFEBED",
  },
  {
    id: "2",
    title: "Unreal Muffins",
    category: "Chocolates",
    price: 5.5,
    image: IMAGES.chip2,
    backgroundColor: "#F5FFB1",
  },
  {
    id: "3",
    title: "Perfect Snacks",
    category: "Cookies",
    price: 12.0,
    image: IMAGES.chip3,
    backgroundColor: "#ECE1FF",
  },
  {
    id: "4",
    title: "Smith Chips",
    category: "Chips",
    price: 9.75,
    image: IMAGES.chip4,
    backgroundColor: "#FFEAC2",
  },
  {
    id: "5",
    title: "Dark Russet",
    category: "Organic",
    price: 15.25,
    image: IMAGES.chip5,
    backgroundColor: "#b0a6a0",
  },
];
