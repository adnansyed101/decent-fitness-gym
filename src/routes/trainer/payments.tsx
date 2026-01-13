import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CreditCard, Check, AlertCircle, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/shared/StatCard'
import { cn } from '@/lib/utils'
import { members } from '@/lib/fakedata'
import { toast } from 'sonner'

export const Route = createFileRoute('/trainer/payments')({
  component: PaymentsPage,
})

function PaymentsPage() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid' | 'pending'>(
    'all',
  )

  const filteredMembers = members.filter((m) => {
    if (filter === 'all') return true
    return m.monthlyFeeStatus === filter
  })

  const paidCount = members.filter((m) => m.monthlyFeeStatus === 'paid').length
  const unpaidCount = members.filter(
    (m) => m.monthlyFeeStatus === 'unpaid',
  ).length
  const pendingCount = members.filter(
    (m) => m.monthlyFeeStatus === 'pending',
  ).length

  const admissionFee = 50
  const monthlyFee = 30
  const estimatedRevenue = paidCount * monthlyFee
  const pendingRevenue = (unpaidCount + pendingCount) * monthlyFee

  const handleMarkPaid = (memberId: string) => {
    return toast.success('Marked as paid (mock action) ' + memberId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Payments
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and manage member payments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="This Month Revenue"
          value={`$${estimatedRevenue}`}
          subtitle={`${paidCount} members paid`}
          icon={DollarSign}
        />
        <StatCard
          title="Pending Revenue"
          value={`$${pendingRevenue}`}
          subtitle={`${unpaidCount + pendingCount} pending`}
          icon={Clock}
        />
        <StatCard
          title="Admission Fee"
          value={`$${admissionFee}`}
          subtitle="One-time payment"
          icon={CreditCard}
        />
        <StatCard
          title="Monthly Fee"
          value={`$${monthlyFee}`}
          subtitle="Per member"
          icon={CreditCard}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-secondary rounded-lg w-fit flex-wrap">
        {(['all', 'paid', 'pending', 'unpaid'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(f)}
            className="capitalize gap-2"
          >
            {f === 'paid' && <Check className="w-4 h-4" />}
            {f === 'unpaid' && <AlertCircle className="w-4 h-4" />}
            {f === 'pending' && <Clock className="w-4 h-4" />}
            {f}
            <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full">
              {f === 'all'
                ? members.length
                : f === 'paid'
                  ? paidCount
                  : f === 'unpaid'
                    ? unpaidCount
                    : pendingCount}
            </span>
          </Button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="stat-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Member
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Join Date
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Admission
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Monthly Status
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Last Payment
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member.id}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        member.admissionFeePaid
                          ? 'bg-success/20 text-success'
                          : 'bg-destructive/20 text-destructive',
                      )}
                    >
                      {member.admissionFeePaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium capitalize',
                        member.monthlyFeeStatus === 'paid'
                          ? 'bg-success/20 text-success'
                          : member.monthlyFeeStatus === 'pending'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-destructive/20 text-destructive',
                      )}
                    >
                      {member.monthlyFeeStatus}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {member.lastPaymentDate || '-'}
                  </td>
                  <td className="p-4">
                    {member.monthlyFeeStatus !== 'paid' && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkPaid(member.id)}
                        className="gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Mark Paid
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No payment records found</p>
          </div>
        )}
      </div>
    </div>
  )
}
