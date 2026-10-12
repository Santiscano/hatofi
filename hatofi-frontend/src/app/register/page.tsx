import { redirect } from "next/navigation";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  if (params?.role === "ganadero") {
    redirect("/register/ganadero");
  }
  redirect("/register/inversionista");
}
