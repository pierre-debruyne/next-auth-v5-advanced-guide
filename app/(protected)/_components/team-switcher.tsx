"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const groups = [
  {
    label: "Votre compte",
    teams: [
      {
        label: "Pierre Debruyne",
        value: "personal",
      },
    ],
  },
  {
    label: "Equipes",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
];

type Team = (typeof groups)[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(groups[0].teams[0]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} aria-label='Select a team' className={cn("w-[200px] justify-between", className)}>
            <Avatar className='mr-2 h-5 w-5'>
              <AvatarImage src={`https://avatar.vercel.sh/${selectedTeam.value}.png`} alt={selectedTeam.label} className='grayscale' />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              <CommandInput placeholder='Search team...' />
              <CommandEmpty>Aucune équipe trouvée.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                      }}
                      className='text-sm'
                    >
                      <Avatar className='mr-2 h-5 w-5'>
                        <AvatarImage src={`https://avatar.vercel.sh/${team.value}.png`} alt={team.label} className='grayscale' />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon className={cn("ml-auto h-4 w-4", selectedTeam.value === team.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <div
                    className='flex items-center rounded-sm px-2 py-1.5 text-sm outline-none cursor-pointer'
                    onClick={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className='mr-2 h-5 w-5' />
                    Créer une équipe
                  </div>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une équipe</DialogTitle>
          <DialogDescription className='italic'>Exemple : équipe RSE, équipe RH, équipe communication...</DialogDescription>
        </DialogHeader>
        <div>
          <div className='space-y-4 py-2 pb-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Nom de l&apos;équipe</Label>
              <Input id='name' placeholder='Equipe RSE.' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='plan'>Entité</Label>
              <br />
              <Label htmlFor='plan' className='italic text-muted-foreground text-sm'>
                Rattacher votre équipe à une de vos entreprises ou filliale
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Choisir dans la liste...' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='free'>
                    <span className='font-medium'>Accès à toutes les entreprises et filliales</span>
                  </SelectItem>
                  <SelectItem value='pro'>
                    <span className='font-medium'>Accès à l&apos;entreprise mére uniquement</span>
                  </SelectItem>
                  <SelectItem value='pro2'>
                    <span className='font-medium'>Accès à la filliale XXX</span>
                  </SelectItem>
                  <SelectItem value='pro3'>
                    <span className='font-medium'>Accès à la filliale YYY</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='plan'>Droits ESRS</Label>
              <br />
              <Label htmlFor='plan' className='italic text-muted-foreground text-sm'>
                Donner a votre équipe accès à certain ESRS
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Choisir dans la liste...' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='free'>
                    <span className='font-medium'>ESRS 1</span>
                  </SelectItem>
                  <SelectItem value='pro'>
                    <span className='font-medium'>ESRS 2</span>
                  </SelectItem>
                  <SelectItem value='pro2'>
                    <span className='font-medium'>ESRS 3</span>
                  </SelectItem>
                  <SelectItem value='pro3'>
                    <span className='font-medium'>ESRS 4</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setShowNewTeamDialog(false)}>
            Annuler
          </Button>
          <Button type='submit'>Enregister</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
