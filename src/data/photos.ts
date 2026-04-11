import photo1 from "../assets/images/photo-1.jpg";
import photo2 from "../assets/images/photo-2.jpg";
import photo3 from "../assets/images/photo-3.jpg";
import photo4 from "../assets/images/photo-4.jpg";
import photo5 from "../assets/images/the_next.jpeg";
import photo6 from "../assets/images/giamdoc.jpeg";
import photo7 from "../assets/images/photo-7.jpg";
import photo8 from "../assets/images/ho_guom.jpeg";

export interface Photo {
  id: number;
  src: string;
  alt: string;
}

export const photos: Photo[] = [
  { id: 1, src: photo7, alt: "Ánh Linh cute" },
  { id: 2, src: photo2, alt: "Giua thien nhien" },
  { id: 3, src: photo3, alt: "Nghe thuat" },
  { id: 4, src: photo4, alt: "Binh yen" },
  { id: 7, src: photo1, alt: "Tuoi tho" },
  { id: 8, src: photo8, alt: "Rang ro" },
  { id: 5, src: photo5, alt: "Be Doremi" },
  { id: 6, src: photo6, alt: "Em va hoa" },
];
