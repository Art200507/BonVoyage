import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './ui/logo';
import { Button } from './ui/button';

export function Header() {
    return (
        <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <Logo />
                </Link>

                <nav className="flex items-center gap-4">
                    <Link
                        to="/my-trips"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        My Trips
                    </Link>
                    <Button variant="outline" size="sm">
                        Create Trip
                    </Button>
                </nav>
            </div>
        </header>
    );
} 