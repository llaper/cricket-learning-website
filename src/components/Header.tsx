import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onMenuToggle, 
  isMobileMenuOpen = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="h-16 bg-neutral-850 border-b border-neutral-700 shadow-md">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo区域 */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">板</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-neutral-50">板球学习指南</h1>
              <p className="text-xs text-neutral-400">从规则到技术的系统教程</p>
            </div>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="搜索板球知识点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 w-full"
            />
          </form>
        </div>

        {/* 用户菜单区域 */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 text-sm text-neutral-300">
            <span>学习进度</span>
            <div className="w-16 h-2 bg-neutral-700 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-primary-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
