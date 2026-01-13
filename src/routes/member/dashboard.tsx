import { createFileRoute } from '@tanstack/react-router'
import {
  Clock,
  CalendarCheck,
  CreditCard,
  Dumbbell,
  Timer,
  Play,
  Square,
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { attendance, currentUser, members, notices } from '@/lib/fakedata'
import { toast } from 'sonner'

export const Route = createFileRoute('/member/dashboard')({
  component: MemberDashboardPage,
})

function MemberDashboardPage() {
  const member = members.find((m) => m.id === currentUser?.id)
  const today = new Date().toISOString().split('T')[0]
  const todayAttendance = attendance.find(
    (a) => a.memberId === currentUser?.id && a.date === today && !a.checkOut,
  )
  const isCheckedIn = !!todayAttendance

  const weeklyWorkout = 10
  const weeklyHours = Math.floor(weeklyWorkout / 60)
  const weeklyMinutes = weeklyWorkout % 60

  const handleCheckInOut = () => {
    if (!currentUser?.id) return

    if (isCheckedIn) {
      return toast.success('Successfully checked out!')
    } else {
      return toast.success('Successfully checked in!')
    }
  }

  // Get member's recent workouts
  const memberAttendance = attendance
    .filter((a) => a.memberId === currentUser?.id && a.duration)
    .slice(-5)
    .reverse()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Hello, {currentUser?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready for today's workout?
          </p>
        </div>
        <Button
          size="lg"
          variant={isCheckedIn ? 'destructive' : 'outline'}
          onClick={handleCheckInOut}
          className="gap-3"
        >
          {isCheckedIn ? (
            <>
              <Square className="w-5 h-5" />
              Check Out
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Check In
            </>
          )}
        </Button>
      </div>

      {/* Check-in Status Card */}
      {isCheckedIn && (
        <div className="p-6 rounded-xl bg-linear-to-r from-success/20 via-success/10 to-transparent border border-success/30 animate-pulse-glow">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center">
              <Timer className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                Workout in Progress
              </p>
              <p className="text-muted-foreground">
                Checked in at {todayAttendance?.checkIn} • Keep pushing!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Weekly Workout"
          value={`${weeklyHours}h ${weeklyMinutes}m`}
          subtitle="Total time this week"
          icon={Clock}
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Sessions This Week"
          value={memberAttendance.length}
          subtitle="Keep it up!"
          icon={CalendarCheck}
        />
        <StatCard
          title="Payment Status"
          value={member?.monthlyFeeStatus === 'paid' ? 'Paid' : 'Due'}
          subtitle={
            member?.lastPaymentDate
              ? `Last: ${member.lastPaymentDate}`
              : 'No payment record'
          }
          icon={CreditCard}
        />
        <StatCard
          title="Member Since"
          value={
            member?.joinDate
              ? new Date(member.joinDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })
              : '-'
          }
          subtitle="Active membership"
          icon={Dumbbell}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workouts */}
        <div className="stat-card">
          <h2 className="text-lg font-display font-semibold text-foreground mb-6">
            Recent Workouts
          </h2>
          {memberAttendance.length > 0 ? (
            <div className="space-y-3">
              {memberAttendance.map((workout, index) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {new Date(workout.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {workout.checkIn} - {workout.checkOut}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-primary">
                      {Math.floor((workout.duration || 0) / 60)}h{' '}
                      {(workout.duration || 0) % 60}m
                    </p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Dumbbell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No workout records yet</p>
              <p className="text-sm">Check in to start tracking!</p>
            </div>
          )}
        </div>

        {/* Latest Notices */}
        <div className="stat-card">
          <h2 className="text-lg font-display font-semibold text-foreground mb-6">
            Gym Updates
          </h2>
          <div className="space-y-4">
            {notices.slice(0, 4).map((notice, index) => (
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
                  <span className="text-xs text-muted-foreground ml-auto">
                    {notice.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
