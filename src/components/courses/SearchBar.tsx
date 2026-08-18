import Icon from '../Icon';

export default function SearchBar() {
  return (
    <div className="relative dashboard-glass-panel rounded-full overflow-hidden flex items-center px-4 py-2 w-full sm:w-64 focus-within:ring-1 focus-within:ring-primary-fixed focus-within:shadow-[0_0_15px_rgba(125,244,255,0.3)] transition-all">
      <Icon name="search" className="text-outline mr-2" />
      <input
        type="text"
        placeholder="Search knowledge base..."
        className="bg-transparent border-none outline-none text-on-surface text-sm w-full placeholder:text-outline focus:ring-0"
      />
    </div>
  );
}
