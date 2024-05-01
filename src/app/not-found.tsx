import { buttonVariants } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Image src="/NotFound.png" width={600} height={600} alt='404 image' />
      <Link href='/' className={buttonVariants({
        variant: 'link',
        size: 'lg',
      })}>Come Back <ArrowTopRightIcon /> </Link>
    </div>
  );
}