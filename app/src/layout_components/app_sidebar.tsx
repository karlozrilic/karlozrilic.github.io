'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/app/src/components/ui/sidebar';
import { ChevronRight, ChevronsUpDown, ExternalLink, Eye, FolderGit2, LogOutIcon, MoreHorizontal, Pencil, Rocket, SquareTerminal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/app/src/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/src/components/ui/collapsible';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/src/components/ui/avatar';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use_mobile';
import { logout } from '@/helpers/firebase';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';
import { capitalizeFirstLetter } from '@/helpers/string';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

const PUBLISH_URL = 'https://portfolio-proxy-mocha.vercel.app/api/publish';
 
export function AppSidebar() {
    const router = useRouter();
    const { toggleSidebar } = useSidebar()
    const { user, loading } = useAuth();
    const [acronym, setAcronym] = useState('');
    const isMobile = useIsMobile()
    const [publishing, setPublishing] = useState(false);

    const vercelProjects = useSelector((state: RootState) => state.vercelProjects.data);

    useEffect(() => {
        if (!loading && user && user.displayName) {
            setAcronym(user.displayName.split(/\s/).reduce((response, word) => response += word.slice(0,1), ''));
        }
    }, [user, loading]);

    async function publish() {
        setPublishing(true);
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(PUBLISH_URL, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const body = await response.json().catch(() => null);
                throw new Error(body?.error ?? response.statusText);
            }
            toast.success('Publishing, the site updates in about 3 minutes');
        } catch (error) {
            toast.error(`Publish failed: ${error instanceof Error ? error.message : error}`);
        } finally {
            setPublishing(false);
        }
    }

    async function adminLogout() {
        await logout();
        toggleSidebar();
    }

    return (
        <Sidebar
            side='left'
            variant='sidebar'
            className='pt-16'
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className='h-auto'
                            onClick={() => {
                                router.push('/');
                                toggleSidebar();
                            }}
                        >
                            <Avatar>
                                <AvatarImage src='/favicon/favicon-512x512.png' />
                                <AvatarFallback>KZ</AvatarFallback>
                            </Avatar>
                            {user ? 
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='font-medium'>Portfolio Admin</span>
                                    <span className='text-xs'>Edit or preview components of each project</span>
                                </div>
                            :
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='font-medium'>Portfolio</span>
                                </div>
                            }
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                { user ?
                    <SidebarGroup>
                        <SidebarGroupLabel>Content</SidebarGroupLabel>

                        <SidebarMenu>
                            <Collapsible className='group/collapsible'>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <SquareTerminal />
                                            <span>Portfolio</span>
                                            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                                <CollapsibleContent
                                    className='
                                        overflow-hidden
                                        data-[state=closed]:animate-collapsible-up
                                        data-[state=open]:animate-collapsible-down
                                    '
                                >
                                    <SidebarMenuSub>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild className='cursor-pointer'>
                                                        <span>CV</span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side={isMobile ? 'bottom' : 'right'}>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            router.push('/admin/cv');
                                                            toggleSidebar();
                                                        }}
                                                    >
                                                        <Eye />
                                                        Preview
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            router.push('/admin/cv');
                                                            toggleSidebar();
                                                        }}
                                                    >
                                                        <Pencil />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild className='cursor-pointer'>
                                                        <span>About me</span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side={isMobile ? 'bottom' : 'right'}>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            router.push('/admin/portfolio/about-me');
                                                            toggleSidebar();
                                                        }}
                                                    >
                                                        <Eye />
                                                        Preview
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            router.push('/admin/portfolio/about-me/edit');
                                                            toggleSidebar();
                                                        }}
                                                    >
                                                        <Pencil />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild className='cursor-pointer'>
                                                        <span>Experience</span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side={isMobile ? 'bottom' : 'right'}>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            router.push('/admin/portfolio/experience');
                                                            toggleSidebar();
                                                        }}
                                                    >
                                                        <Eye />
                                                        Preview
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            router.push('/admin/portfolio/experience/edit');
                                                            toggleSidebar();
                                                        }}
                                                    >
                                                        <Pencil />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={publish} disabled={publishing}>
                                    <Rocket />
                                    <span>{publishing ? 'Publishing...' : 'Publish site'}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                : null }

                {vercelProjects.length ?
                    <SidebarGroup>
                        <SidebarGroupLabel>Additional links</SidebarGroupLabel>

                        <SidebarMenu>
                            {vercelProjects.map((project, index) => {
                                const projectProductionData = project.targets.production;
                                const projectLink = `https://${projectProductionData.alias[0]}`;
                                const gitLink = `https://${projectProductionData.meta.githubHost}/${projectProductionData.meta.githubOrg}/${projectProductionData.meta.githubRepo}`;
                                return (
                                    <SidebarMenuItem key={index} className='cursor-pointer'>
                                        <SidebarMenuButton asChild>
                                            <span>{capitalizeFirstLetter(project.name.replaceAll('-', ' '))}</span>
                                        </SidebarMenuButton>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuAction showOnHover={true}>
                                                    <MoreHorizontal />
                                                    <span className="sr-only">More</span>
                                                </SidebarMenuAction>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align='start' side='right'>
                                                <DropdownMenuItem
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        (window as any).open(projectLink, '_blank').focus();
                                                    }}
                                                >
                                                    <ExternalLink />Project page
                                                </DropdownMenuItem>
                                                {projectProductionData.private ?
                                                    <DropdownMenuItem
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            (window as any).open(gitLink, '_blank').focus();
                                                        }}
                                                    >
                                                        <FolderGit2 />Github page
                                                    </DropdownMenuItem>
                                                : null
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                : null}
                
            </SidebarContent>
            {user ?
                <SidebarFooter>
                    <SidebarMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuItem>
                                    <SidebarMenuButton size={'lg'}>
                                        <Avatar>
                                            <AvatarImage src={user?.photoURL ??  'https://github.com/shadcn.png'} />
                                            <AvatarFallback>{acronym}</AvatarFallback>
                                        </Avatar>
                                        <div className='grid flex-1 text-left text-sm leading-tight'>
                                            <span className='font-medium'>{user?.displayName}</span>
                                            <span className='text-xs'>{user?.email}</span>
                                        </div>
                                        <ChevronsUpDown />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side={isMobile ? 'top' : 'right'}>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className='cursor-pointer'
                                        variant='destructive'
                                        onClick={adminLogout}
                                    >
                                        <LogOutIcon />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenu>
                </SidebarFooter>
            : null }
        </Sidebar>
    )
}