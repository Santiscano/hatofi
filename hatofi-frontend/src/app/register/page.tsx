import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <RegisterRedirect searchParams={searchParams} />
    </Suspense>
  );
}

async function RegisterRedirect({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}): Promise<never> {
  const params = await searchParams;
  if (params?.role === "ganadero") {
    return redirect("/register/ganadero");
  }
  return redirect("/register/inversionista");
}
