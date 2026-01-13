import { createFileRoute } from '@tanstack/react-router'
import {
  Users,
  CalendarCheck,
  CreditCard,
  Clock,
  TrendingUp,
  UserPlus,
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { attendance, members, notices } from '@/lib/fakedata'

export const Route = createFileRoute('/trainer/dashboard')({
  component: TrainerDashboard,
})

function TrainerDashboard() {
 

  const today = new Date().toISOString().split('T')[0]
  const todayAttendance = attendance.filter((a) => a.date === today)
  const currentlyCheckedIn = todayAttendance.filter((a) => !a.checkOut).length
  const paidMembers = members.filter(
    (m) => m.monthlyFeeStatus === 'paid',
  ).length
  const unpaidMembers = members.filter(
    (m) => m.monthlyFeeStatus === 'unpaid',
  ).length

  // Recent activity
  const recentActivity = [
    { id: 1, type: 'check-in', member: 'John Smith', time: '10 mins ago' },
    { id: 2, type: 'payment', member: 'Sarah Johnson', time: '1 hour ago' },
    { id: 3, type: 'check-out', member: 'Mike Wilson', time: '2 hours ago' },
    { id: 4, type: 'new-member', member: 'Emily Davis', time: '1 day ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at your gym.
          </p>
        </div>
        <Link to="/trainer/members">
          <Button size="lg" className="gap-2">
            <UserPlus className="w-5 h-5" />
            Add Member
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={members.length}
          subtitle="Active memberships"
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Currently In Gym"
          value={currentlyCheckedIn}
          subtitle={`${todayAttendance.length} check-ins today`}
          icon={CalendarCheck}
        />
        <StatCard
          title="Payments Due"
          value={unpaidMembers}
          subtitle={`${paidMembers} members paid`}
          icon={CreditCard}
        />
        <StatCard
          title="Avg. Workout Time"
          value="75 min"
          subtitle="Per session this week"
          icon={Clock}
          trend={{ value: 8, positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-foreground">
              Recent Activity
            </h2>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'check-in'
                      ? 'bg-success/20 text-success'
                      : activity.type === 'check-out'
                        ? 'bg-warning/20 text-warning'
                        : activity.type === 'payment'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-accent/20 text-accent'
                  }`}
                >
                  {activity.type === 'check-in' && (
                    <CalendarCheck className="w-5 h-5" />
                  )}
                  {activity.type === 'check-out' && (
                    <Clock className="w-5 h-5" />
                  )}
                  {activity.type === 'payment' && (
                    <CreditCard className="w-5 h-5" />
                  )}
                  {activity.type === 'new-member' && (
                    <UserPlus className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {activity.member}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {activity.type.replace('-', ' ')}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Notices */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-foreground">
              Latest Notices
            </h2>
            <Link
              to="/trainer/notices"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {notices.slice(0, 3).map((notice, index) => (
              <div
                key={notice.id}
                className="p-4 rounded-lg bg-secondary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      notice.priority === 'high'
                        ? 'bg-destructive'
                        : notice.priority === 'medium'
                          ? 'bg-warning'
                          : 'bg-muted-foreground'
                    }`}
                  />
                  <h3 className="font-medium text-foreground text-sm">
                    {notice.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-primary">
            {members.length}
          </p>
          <p className="text-sm text-muted-foreground">Total Members</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-success">
            {paidMembers}
          </p>
          <p className="text-sm text-muted-foreground">Paid This Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-warning">
            {unpaidMembers}
          </p>
          <p className="text-sm text-muted-foreground">Pending Payments</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-foreground">8</p>
          <p className="text-sm text-muted-foreground">Active Equipment</p>
        </div>
      </div>
    </div>
  )
}
