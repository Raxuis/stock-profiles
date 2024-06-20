import { Layout } from "@/components/layout";
import { Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <Layout>
      <div className="flex gap-2 self-center pt-10">
        <Loader2 className="h-6 animate-spin" />
        <p>Loading...</p>
      </div>
    </Layout>
  )
}