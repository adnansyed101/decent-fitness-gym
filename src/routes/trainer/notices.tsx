import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Bell,
  Plus,
  Trash2,
  Calendar,
  AlertTriangle,
  Info,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { currentUser, notices } from '@/lib/fakedata'

export const Route = createFileRoute('/trainer/notices')({
  component: NoticesPage,
})

function NoticesPage() {
  const isTrainer = currentUser.role === 'trainer'
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  })

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault()

    setNewNotice({ title: '', content: '', priority: 'medium' })
    setIsAddOpen(false)
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-destructive" />
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-warning" />
      default:
        return <Info className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Notice Board
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with gym announcements
          </p>
        </div>

        {isTrainer && (
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Post Notice
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display">
                  Post New Notice
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddNotice} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newNotice.title}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, title: e.target.value })
                    }
                    placeholder="Notice title"
                    className="bg-secondary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={newNotice.content}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, content: e.target.value })
                    }
                    placeholder="Write your announcement..."
                    className="bg-secondary min-h-30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newNotice.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high') =>
                      setNewNotice({ ...newNotice, priority: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Post Notice
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice, index) => (
          <div
            key={notice.id}
            className={cn(
              'stat-card animate-fade-in',
              notice.priority === 'high' && 'border-l-4 border-l-destructive',
              notice.priority === 'medium' && 'border-l-4 border-l-warning',
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    notice.priority === 'high' && 'bg-destructive/10',
                    notice.priority === 'medium' && 'bg-warning/10',
                    notice.priority === 'low' && 'bg-muted',
                  )}
                >
                  {getPriorityIcon(notice.priority)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {notice.title}
                    </h3>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
                        notice.priority === 'high' &&
                          'bg-destructive/20 text-destructive',
                        notice.priority === 'medium' &&
                          'bg-warning/20 text-warning',
                        notice.priority === 'low' &&
                          'bg-muted text-muted-foreground',
                      )}
                    >
                      {notice.priority}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{notice.content}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Posted on{' '}
                      {new Date(notice.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              {isTrainer && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {notices.length === 0 && (
        <div className="text-center py-12 stat-card">
          <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-display font-semibold text-foreground mb-2">
            No Notices Yet
          </h3>
          <p className="text-muted-foreground">
            {isTrainer
              ? 'Post your first announcement to keep members informed.'
              : 'Check back later for gym announcements.'}
          </p>
        </div>
      )}
    </div>
  )
}
