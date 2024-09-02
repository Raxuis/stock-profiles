import Spinner from "@/components/animata/progress/spinner";
import { Layout } from "@/components/layout";
import { Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <Layout>
      <div className="flex self-center pt-10">
        <Spinner className="flex items-center justify-center" />
      </div>
    </Layout>
  )
}
