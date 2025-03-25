import { toSlug } from "@/app/utils"
import Link from "next/link"

export type IUtilityGroup = {head: string, lists: string[]}
export default function UtilityGroup({head, lists}:IUtilityGroup) {
    
  return (
    <div className="text-sm flex flex-col gap-3">
        <p className="text-base font-bold">{head}</p>
        {
            lists.map((value) => (
                <Link key={value} href={toSlug(value)}>{value}</Link>
            ))
        }
    </div>
  )
}
