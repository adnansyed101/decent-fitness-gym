import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CalendarCheck, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { attendance, members } from '@/lib/fakedata'

export const Route = createFileRoute('/trainer/attendance')({
  component: AttendancePage,
})

function AttendancePage() {
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('today')

  const today = new Date().toISOString().split('T')[0]
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const filteredAttendance = attendance
    .filter((a) => {
      if (filter === 'today') return a.date === today
      if (filter === 'week') return a.date >= weekAgo
      return true
    })
    .sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date)
      if (dateCompare !== 0) return dateCompare
      return b.checkIn.localeCompare(a.checkIn)
    })

  const getMemberName = (memberId: string) => {
    return members.find((m) => m.id === memberId)?.name || 'Unknown'
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '-'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const currentlyInGym = attendance.filter(
    (a) => a.date === today && !a.checkOut,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Attendance
          </h1>
          <p className="text-muted-foreground mt-1">
            Track member check-ins and workout times
          </p>
        </div>
      </div>

      {/* Currently In Gym */}
      <div className="stat-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <h2 className="font-display font-semibold text-foreground">
            Currently in Gym
          </h2>
          <span className="text-sm text-muted-foreground">
            ({currentlyInGym.length})
          </span>
        </div>
        {currentlyInGym.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {currentlyInGym.map((record) => (
              <div
                key={record.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20"
              >
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-success" />
                </div>
                <span className="font-medium text-foreground">
                  {getMemberName(record.memberId)}
                </span>
                <span className="text-sm text-muted-foreground">
                  since {record.checkIn}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No one is currently in the gym
          </p>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-secondary rounded-lg w-fit">
        {(['today', 'week', 'all'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f === 'all' ? 'All Time' : f === 'week' ? 'This Week' : 'Today'}
          </Button>
        ))}
      </div>

      {/* Attendance Table */}
      <div className="stat-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Member
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Check In
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Check Out
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Duration
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record, index) => (
                <tr
                  key={record.id}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">
                        {getMemberName(record.memberId)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-success">
                      <CalendarCheck className="w-4 h-4" />
                      {record.checkIn}
                    </div>
                  </td>
                  <td className="p-4">
                    {record.checkOut ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {record.checkOut}
                      </div>
                    ) : (
                      <span className="text-warning">In progress</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="font-display font-semibold text-foreground">
                      {formatDuration(record.duration)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        record.checkOut
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-success/20 text-success',
                      )}
                    >
                      {record.checkOut ? 'Completed' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAttendance.length === 0 && (
          <div className="text-center py-12">
            <CalendarCheck className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No attendance records found</p>
          </div>
        )}
      </div>
    </div>
  )
}
