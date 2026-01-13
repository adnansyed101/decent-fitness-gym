import MainLayout from '@/layout/main-layout'
import { Links } from '@/lib/types/general.types'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Bell, CalendarCheck, CreditCard, LayoutDashboard } from 'lucide-react'

export const Route = createFileRoute('/member')({
  component: MainLayoutRoute,
})

function MainLayoutRoute() {
  const links: Links = [
    {
      label: 'Essential Links',
      items: [
        { url: '/member/dashboard', icon: LayoutDashboard, title: 'Dashboard' },
        {
          url: '/member/my-workouts',
          icon: CalendarCheck,
          title: 'My Workouts',
        },
        { url: '/member/payments', icon: CreditCard, title: 'Payments' },
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
