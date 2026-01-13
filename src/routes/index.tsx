import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Dumbbell,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [role, setRole] = useState<'member' | 'trainer'>('member')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (role === 'member') {
      return navigate({ to: '/member/dashboard' })
    } else {
      return navigate({ to: '/trainer/dashboard' })
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-75 h-75 rounded-full bg-primary/10 blur-2xl animate-pulse" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-8">
            <Dumbbell className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="font-display text-5xl font-bold text-foreground mb-4">
            Decent Fiteness Gym
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-md">
            Your complete gym management solution. Track workouts, manage
            members, and grow your fitness business.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-display font-bold text-primary">
                40+
              </p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">Equipment</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-primary">
                24/7
              </p>
              <p className="text-sm text-muted-foreground">Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Dumbbell className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold">FitPro</h1>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              Welcome back
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-4 p-1 bg-secondary rounded-xl">
            <button
              type="button"
              onClick={() => setRole('member')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200',
                role === 'member'
                  ? 'bg-card text-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <User className="w-4 h-4" />
              Member
            </button>
            <button
              type="button"
              onClick={() => setRole('trainer')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200',
                role === 'trainer'
                  ? 'bg-card text-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              Trainer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  role === 'trainer' ? 'trainer@gym.com' : 'john@gym.com'
                }
                className="h-12 bg-primary border-border focus:border-primary"
                required
                value={'trainer@gmail.com'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-12 bg-secondary border-border focus:border-primary pr-12"
                  required
                  value={'1234568'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign In
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
            <p className="text-sm font-medium text-foreground">
              Demo Credentials:
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <span className="font-medium">Trainer:</span> trainer@gym.com /
                trainer123
              </p>
              <p>
                <span className="font-medium">Member:</span> john@gym.com /
                member123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
