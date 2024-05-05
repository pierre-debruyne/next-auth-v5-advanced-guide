import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href='/materialite' className='text-sm font-medium transition-colors hover:text-primary'>
        Matérialité
      </Link>
      <Link href='/gap-analysis' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Gap Analysis
      </Link>
      <Link href='/reporting' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Reporting
      </Link>
      <Link href='/esg' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Données ESG
      </Link>
      <Link href='/durabilite' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Stratégie de durabilité
      </Link>
      <Link href='/change' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Conduite du changement
      </Link>
      <Link href='/entreprises' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Entreprises
      </Link>
      <Link href='/pilotage' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        Pilotage
      </Link>
    </nav>
  );
}
