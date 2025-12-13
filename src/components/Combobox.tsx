import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export interface ComboboxOption {
  id: string;
  label: string;
  sublabel?: string;
  value: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (option: ComboboxOption) => void;
  placeholder?: string;
  className?: string;
  label?: ReactNode;
  required?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  label,
  required,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum query length to show results
  const MIN_QUERY_LENGTH = 3;
  const shouldShowDropdown = value.trim().length >= MIN_QUERY_LENGTH;

  // Filter options based on input value (only if query is long enough)
  const filteredOptions = shouldShowDropdown
    ? options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase()) ||
        option.sublabel?.toLowerCase().includes(value.toLowerCase()) ||
        option.value.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown if query becomes too short
  useEffect(() => {
    if (!shouldShowDropdown) {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }, [shouldShowDropdown]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!shouldShowDropdown) {
      return;
    }

    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      if (filteredOptions.length > 0) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0 && filteredOptions.length > 0) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Only open dropdown if query is long enough
    if (newValue.trim().length >= MIN_QUERY_LENGTH) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: ComboboxOption) => {
    onChange(option.value);
    onSelect(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    // Only open dropdown if query is long enough and has results
    if (shouldShowDropdown && filteredOptions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm",
            "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-gray-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Dropdown - Only show if query length >= 3 */}
      {isOpen && shouldShowDropdown && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto"
        >
          <ul className="py-1" role="listbox">
            {filteredOptions.map((option, index) => (
              <li
                key={option.id}
                role="option"
                aria-selected={index === highlightedIndex}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "px-4 py-2 cursor-pointer transition-colors",
                  index === highlightedIndex
                    ? "bg-blue-50 text-blue-900"
                    : "text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{option.label}</div>
                    {option.sublabel && (
                      <div className="text-sm text-gray-500 truncate">
                        {option.sublabel}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results message - Only show if query length >= 3 */}
      {isOpen && shouldShowDropdown && filteredOptions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-4 px-4">
          <p className="text-sm text-gray-500 text-center">
            No se encontraron resultados
          </p>
        </div>
      )}
    </div>
  );
}

