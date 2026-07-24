import { redirect } from "next/navigation";
import { ROUTES } from "@shared/config/links";

export default function MalumotlarBazasiPage() {
  redirect(ROUTES.CITIES);
}
