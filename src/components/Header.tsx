import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import altanLogo from '@/assets/altan-logo.png';

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

const Header = ({ cartItemCount = 0, onCartClick }: HeaderProps) => {
  const [activeCategory, setActiveCategory] = useState('tees');

  const navItems = [
    { id: 'shop', label: 'Shop', href: '/', active: true },
    { id: 'tees', label: 'Tees', href: '/tees', active: true },
    { id: 'platform', label: 'Platform', href: 'https://altan.ai', external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="cursor-pointer">
            <img 
              src={altanLogo} 
              alt="AltanShop" 
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                item.active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Cart */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCartClick}
          className="relative"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;