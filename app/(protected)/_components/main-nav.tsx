import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href='/examples/dashboard' className='text-sm font-medium transition-colors hover:text-primary'>
        Matérialité
      </Link>
      <Link href='/examples/dashboard' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Gap Analysis
      </Link>
      <Link href='/examples/dashboard' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Reporting
      </Link>
      <Link href='/examples/dashboard' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Données ESG
      </Link>
      <Link href='/examples/dashboard' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Stratégie de durabilité
      </Link>
      <Link href='/examples/dashboard' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Conduite du changement
      </Link>
      <Link href='/examples/dashboard' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Entreprises
      </Link>
      <Link href='/examples/dashboard' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Pilotage
      </Link>
    </nav>
  );
}
