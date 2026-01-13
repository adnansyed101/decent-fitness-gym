import MainLayout from '@/layout/main-layout'
import { Links } from '@/lib/types/general.types'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  Bell,
  CalendarCheck,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  Users,
} from 'lucide-react'

export const Route = createFileRoute('/trainer')({
  component: MainLayoutRoute,
})

function MainLayoutRoute() {
  const links: Links = [
    {
      label: 'Essential Links',
      items: [
        {
          url: '/trainer/dashboard',
          icon: LayoutDashboard,
          title: 'Dashboard',
        },
        { url: '/trainer/members', icon: Users, title: 'Members' },
        {
          url: '/trainer/attendance',
          icon: CalendarCheck,
          title: 'Attendance',
        },
        { url: '/trainer/payments', icon: CreditCard, title: 'Payments' },
        { url: '/trainer/notices', icon: Bell, title: 'Notices' },
      ],
    },
  ]
  return (
    <MainLayout links={links}>
      <Outlet />
    </MainLayout>
  )
}
