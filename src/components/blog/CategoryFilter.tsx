interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-2 scrollbar-hide overflow-x-auto max-w-full">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              isActive
                ? "bg-navy-deep text-white shadow-md shadow-navy-deep/10 border border-navy-deep cursor-pointer"
                : "bg-white text-navy-deep border border-gold/15 hover:border-gold hover:text-gold shadow-sm cursor-pointer"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
