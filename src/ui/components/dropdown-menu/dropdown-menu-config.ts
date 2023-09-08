export interface DropdownMenuItem {
  action: () => void;
  name: string;
  icon: string;
  subItems: DropdownMenuItem[];
}

export interface DropdownMenuConfig {
  items: DropdownMenuItem[];
}