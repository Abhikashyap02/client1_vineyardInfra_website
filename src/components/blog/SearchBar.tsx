import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="size-4 text-slate-soft" />
      </div>
      <Input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-6 bg-white border border-gold/25 focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold rounded-full text-navy-deep placeholder:text-slate-soft/75 shadow-sm text-sm"
      />
    </div>
  );
}
