'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/app/src/components/ui/sidebar'
import { ChevronDown, ChevronRight, ChevronsUpDown, Eye, LogOutIcon, Pencil, SquareTerminal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/src/components/ui/dropdown-menu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/src/components/ui/collapsible'
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/src/components/ui/avatar'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { logout } from '@/helpers/firebase'
import { useRouter } from 'next/navigation'
 
export function AppSidebar() {
    const router = useRouter();
    const { toggleSidebar } = useSidebar()
    const { user, loading } = useAuth();
    const [acronym, setAcronym] = useState('');
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!loading && user && user.displayName) {
            setAcronym(user.displayName.split(/\s/).reduce((response, word) => response += word.slice(0,1), ''));
        }
    }, [user, loading]);

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
                        <SidebarMenuButton className='h-auto'>
                            <Avatar>
                                <AvatarImage src='/favicon/favicon-512x512.png' />
                                <AvatarFallback>KZ</AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='font-medium'>Portfolio</span>
                                <span className='text-xs'>Edit or preview components of each project</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Admin dashboard
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    router.push('/admin');
                                    toggleSidebar();
                                }}
                            >
                                <SquareTerminal />
                                <span>Admin</span>
                                <ChevronRight className='ml-auto' />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
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
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
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
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant='destructive'
                                    onClick={adminLogout}
                                >
                                    <LogOutIcon />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            {/**
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuGroup>
                             */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}