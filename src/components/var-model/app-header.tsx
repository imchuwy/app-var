import { SiteLogo } from '@/components/icons';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <SiteLogo className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
          VarModel
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/imchuwy/VaRApp.git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </header>
  );
}
