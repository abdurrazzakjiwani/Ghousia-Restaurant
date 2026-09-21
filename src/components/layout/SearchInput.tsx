"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { searchItems } from "@/lib/menu-data";

interface SearchInputProps {
  onNavigate: (path: string) => void;
}

export default function SearchInput({ onNavigate }: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchItems>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchItems(query));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    },
    []
  );

  const handleSelect = useCallback(
    (itemId: string) => {
      onNavigate(`/menu?highlight=${itemId}`);
      setIsOpen(false);
      setQuery("");
    },
    [onNavigate]
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
        aria-label="Search menu"
      >
        <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center">
        <Search className="w-4 h-4 text-gray-400 absolute left-3" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search menu..."
          className="w-48 pl-9 pr-8 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 w-72 max-w-[calc(100vw-2rem)]"
        />
        <button
          onClick={() => {
            setIsOpen(false);
            setQuery("");
          }}
          className="absolute right-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          aria-label="Close search"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {query.trim() && (
        <div className="absolute top-full left-0 mt-1 w-72 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 scrollbar-hide">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No items found
            </div>
          ) : (
            results.slice(0, 8).map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Rs. {item.price}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
