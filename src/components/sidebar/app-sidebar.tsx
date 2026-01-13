import * as React from 'react'
import { NavMain } from '@/components/sidebar/nav-main'
import { NavUser } from '@/components/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Links } from '@/lib/types/general.types'
import { Dumbbell } from 'lucide-react'

// This is sample data.
const user = {
  name: 'Md Adnan',
  email: 'adnan.arbree.solutions@gmail.com',
  avatar: '/demo.jpg',
  role: 'hr',
}

type AppSidebarProps = {
  links: Links
  props?: React.ComponentProps<typeof Sidebar>
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ links, ...props }) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#111318] border-b">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex items-center gap-3 py-2">
            <div className="p-1 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">
                Decent Fitness Gym
              </h1>
              <p className="text-xs text-muted-foreground">Gym Management</p>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-[#111318]">
        {links.map((link) => (
          <NavMain key={link.label} links={link} />
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-[#111318]">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
