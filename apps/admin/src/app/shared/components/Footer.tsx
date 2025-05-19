import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 mt-auto py-20 backdrop-blur">
            <div className="container flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="gradient-text text-xl font-semibold">Eureka Codes</span>
                </div>

                <p className="text-muted-foreground text-center text-sm">
                    Stress-free AI DevOps; From Infrastructure to Scalable Microservices.
                </p>

                <div className="mt-2 flex items-center gap-4">
                    <a
                        href="https://github.com/lemoncloud-io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-muted hover:bg-muted/80 rounded-full p-2 transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/lemoncloud/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-muted hover:bg-muted/80 rounded-full p-2 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </a>
                </div>

                <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row">
                    <span className="text-muted-foreground text-xs">
                        © {currentYear} LemonCloud, Inc. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};
