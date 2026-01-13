import { currentUser, members } from '@/lib/fakedata'
import { createFileRoute } from '@tanstack/react-router'
import { CreditCard, Check, AlertCircle, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/member/payments')({
  component: MembersPaymentsPage,
})

function MembersPaymentsPage() {
  const member = members.find((m) => m.id === currentUser.id)

  const admissionFee = 50
  const monthlyFee = 30

  // Generate payment schedule (demo data)
  const paymentSchedule = [
    {
      month: 'January 2025',
      amount: monthlyFee,
      status: member?.monthlyFeeStatus || 'unpaid',
      dueDate: '2025-01-15',
    },
    {
      month: 'February 2025',
      amount: monthlyFee,
      status: 'upcoming',
      dueDate: '2025-02-15',
    },
    {
      month: 'March 2025',
      amount: monthlyFee,
      status: 'upcoming',
      dueDate: '2025-03-15',
    },
  ]
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          My Payments
        </h1>
        <p className="text-muted-foreground mt-1">
          View your payment history and schedule
        </p>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'p-4 rounded-xl',
                member?.admissionFeePaid
                  ? 'bg-success/10'
                  : 'bg-destructive/10',
              )}
            >
              {member?.admissionFeePaid ? (
                <Check className="w-8 h-8 text-success" />
              ) : (
                <AlertCircle className="w-8 h-8 text-destructive" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Admission Fee</p>
              <p className="text-2xl font-display font-bold text-foreground">
                ${admissionFee}
              </p>
              <p
                className={cn(
                  'text-sm font-medium',
                  member?.admissionFeePaid
                    ? 'text-success'
                    : 'text-destructive',
                )}
              >
                {member?.admissionFeePaid ? 'Paid' : 'Due'}
              </p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'p-4 rounded-xl',
                member?.monthlyFeeStatus === 'paid'
                  ? 'bg-success/10'
                  : member?.monthlyFeeStatus === 'pending'
                    ? 'bg-warning/10'
                    : 'bg-destructive/10',
              )}
            >
              <CreditCard
                className={cn(
                  'w-8 h-8',
                  member?.monthlyFeeStatus === 'paid'
                    ? 'text-success'
                    : member?.monthlyFeeStatus === 'pending'
                      ? 'text-warning'
                      : 'text-destructive',
                )}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Fee</p>
              <p className="text-2xl font-display font-bold text-foreground">
                ${monthlyFee}
              </p>
              <p
                className={cn(
                  'text-sm font-medium capitalize',
                  member?.monthlyFeeStatus === 'paid'
                    ? 'text-success'
                    : member?.monthlyFeeStatus === 'pending'
                      ? 'text-warning'
                      : 'text-destructive',
                )}
              >
                {member?.monthlyFeeStatus || 'Unknown'}
              </p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-primary/10">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Payment</p>
              <p className="text-2xl font-display font-bold text-foreground">
                {member?.lastPaymentDate
                  ? new Date(member.lastPaymentDate).toLocaleDateString(
                      'en-US',
                      { month: 'short', day: 'numeric' },
                    )
                  : 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">
                {member?.lastPaymentDate
                  ? new Date(member.lastPaymentDate).getFullYear()
                  : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="stat-card">
        <h2 className="text-lg font-display font-semibold text-foreground mb-6">
          Payment Schedule
        </h2>

        <div className="space-y-3">
          {paymentSchedule.map((payment, index) => (
            <div
              key={payment.month}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    payment.status === 'paid'
                      ? 'bg-success/20'
                      : payment.status === 'pending'
                        ? 'bg-warning/20'
                        : payment.status === 'unpaid'
                          ? 'bg-destructive/20'
                          : 'bg-muted',
                  )}
                >
                  {payment.status === 'paid' ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : payment.status === 'upcoming' ? (
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <AlertCircle
                      className={cn(
                        'w-5 h-5',
                        payment.status === 'pending'
                          ? 'text-warning'
                          : 'text-destructive',
                      )}
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{payment.month}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(payment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-foreground">
                  ${payment.amount}
                </p>
                <span
                  className={cn(
                    'text-xs font-medium capitalize',
                    payment.status === 'paid'
                      ? 'text-success'
                      : payment.status === 'pending'
                        ? 'text-warning'
                        : payment.status === 'unpaid'
                          ? 'text-destructive'
                          : 'text-muted-foreground',
                  )}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Info */}
      <div className="p-6 rounded-xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <h3 className="font-display font-semibold text-foreground mb-2">
          Payment Information
        </h3>
        <p className="text-muted-foreground text-sm">
          Monthly payments are due on the 15th of each month. Please contact the
          trainer for payment options or if you have any questions about your
          account.
        </p>
      </div>
    </div>
  )
}
