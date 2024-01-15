"use client"

import Image from "next/image";
import { cn } from "@/lib/utils";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({
    url,
    preview,
} : CoverImageProps) => {
  return (
    <div className={cn(
        "relative w-full h-[30vh] group",
        !url && "h-12",
        url && "bg-muted"
    )}>
        {!!url && (
            <Image 
             src={url}
             fill
             alt="Cover"
             className="object-cover"
            />
        )}
    </div>
  )
}
