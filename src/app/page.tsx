import { redirect } from "next/navigation";

export default function Home() {
  // Sementara langsung redirect ke halaman login
  redirect("/login");
}
