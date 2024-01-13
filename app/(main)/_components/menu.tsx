"use client"

import { Id } from "@/convex/_generated/dataModel"
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";

interface MenuProps {
    documentId: Id<"documents">;
}

export const Menu = ( {
    documentId
}: MenuProps) => {
   const router = useRouter();
   const { user } = useUser();

   const archieve = useMutation(api.documents.archieve);

   const onArchieve = () => {
    const promise = archieve({id: documentId})

    toast.promise(promise, {
        loading: "Moving to trash...",
        success:"Note moved to trash!",
        error:"Failed to archieve."
    });

    router.push("/documents");
   }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
         <DropdownMenuItem onClick={onArchieve}>
            <Trash className="h-4 w-4 mr-2"/>
            Delete
            </DropdownMenuItem>   
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground p-2">
                Last edited by : {user?.fullName}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
