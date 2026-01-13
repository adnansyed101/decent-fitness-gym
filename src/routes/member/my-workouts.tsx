import { StatCard } from '@/components/shared/StatCard'
import { attendance, currentUser } from '@/lib/fakedata'
import { createFileRoute } from '@tanstack/react-router'
import { Clock, CalendarCheck, TrendingUp, Dumbbell } from 'lucide-react'

export const Route = createFileRoute('/member/my-workouts')({
  component: MyWorkoutsPage,
})

function MyWorkoutsPage() {
  const memberAttendance = attendance
    .filter((a) => a.memberId === currentUser.id)
    .sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date)
      if (dateCompare !== 0) return dateCompare
      return b.checkIn.localeCompare(a.checkIn)
    })

  const weeklyWorkout = 10
  const weeklyHours = Math.floor(weeklyWorkout / 60)
  const weeklyMinutes = weeklyWorkout % 60

  const completedSessions = memberAttendance.filter((a) => a.checkOut).length
  const totalDuration = memberAttendance.reduce(
    (acc, a) => acc + (a.duration || 0),
    0,
  )
  const avgDuration =
    completedSessions > 0 ? Math.round(totalDuration / completedSessions) : 0
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          My Workouts
        </h1>
        <p className="text-muted-foreground mt-1">Track your fitness journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="This Week"
          value={`${weeklyHours}h ${weeklyMinutes}m`}
          subtitle="Total workout time"
          icon={Clock}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Total Sessions"
          value={completedSessions}
          subtitle="Completed workouts"
          icon={CalendarCheck}
        />
        <StatCard
          title="Average Duration"
          value={`${Math.floor(avgDuration / 60)}h ${avgDuration % 60}m`}
          subtitle="Per session"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Time"
          value={`${Math.floor(totalDuration / 60)}h`}
          subtitle="All time"
          icon={Dumbbell}
        />
      </div>

      {/* Workout History */}
      <div className="stat-card">
        <h2 className="text-lg font-display font-semibold text-foreground mb-6">
          Workout History
        </h2>

        {memberAttendance.length > 0 ? (
          <div className="space-y-3">
            {memberAttendance.map((workout, index) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {new Date(workout.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {workout.checkIn} - {workout.checkOut || 'In progress'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {workout.duration ? (
                    <>
                      <p className="font-display font-bold text-lg text-primary">
                        {Math.floor(workout.duration / 60)}h{' '}
                        {workout.duration % 60}m
                      </p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                      Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Dumbbell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">
              No Workouts Yet
            </h3>
            <p className="text-muted-foreground">
              Check in at the gym to start tracking your workouts!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
