"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { CheckCircle2, Clock, CalendarClock, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  name: string
  initiative: string
  dueDate: Date
  owner: string
  priority: "High" | "Medium" | "Low"
  completed: boolean
}

export function UpcomingTasks() {
  const { initiatives } = useStore()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [priorityFilter, setPriorityFilter] = useState<string[]>([])
  const [showCompleted, setShowCompleted] = useState(false)
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    name: "",
    initiative: "",
    owner: "",
    priority: "Medium" as "High" | "Medium" | "Low",
    dueDate: new Date().toISOString().split("T")[0],
  })

  // Generate dummy tasks based on initiatives
  const generateTasks = () => {
    if (initiatives.length === 0) return []

    if (tasks.length > 0) return tasks

    const generatedTasks: Task[] = []

    initiatives.forEach((initiative) => {
      const roadmap = initiative.executionPlan.roadmap
      if (roadmap && roadmap.length > 0) {
        roadmap[0].tasks.forEach((task) => {
          generatedTasks.push({
            id: `task-${Math.random().toString(36).substr(2, 9)}`,
            name: task.name,
            initiative: initiative.name,
            dueDate: getRandomFutureDate(),
            owner: task.owner,
            priority: getRandomPriority(),
            completed: false,
          })
        })
      }
    })

    // Sort by due date
    return generatedTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()).slice(0, 5)
  }

  const getRandomFutureDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1) // 1-14 days in the future
    return date
  }

  const getRandomPriority = (): "High" | "Medium" | "Low" => {
    const priorities = ["High", "Medium", "Low"] as const
    return priorities[Math.floor(Math.random() * priorities.length)]
  }

  const generatedTasks = generateTasks()

  const filteredTasks = generatedTasks
    .filter((task) => showCompleted || !task.completed)
    .filter((task) => priorityFilter.length === 0 || priorityFilter.includes(task.priority))

  const handleToggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )

    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      toast({
        title: task.completed ? "Task Reopened" : "Task Completed",
        description: task.completed
          ? `"${task.name}" has been marked as incomplete.`
          : `"${task.name}" has been marked as complete.`,
      })
    }
  }

  const handleAddTask = () => {
    if (!newTask.name || !newTask.initiative || !newTask.owner) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const task: Task = {
      id: `task-${Math.random().toString(36).substr(2, 9)}`,
      name: newTask.name,
      initiative: newTask.initiative,
      owner: newTask.owner,
      priority: newTask.priority,
      dueDate: new Date(newTask.dueDate),
      completed: false,
    }

    setTasks((prevTasks) => [...prevTasks, task])
    setIsAddTaskDialogOpen(false)

    // Reset form
    setNewTask({
      name: "",
      initiative: "",
      owner: "",
      priority: "Medium",
      dueDate: new Date().toISOString().split("T")[0],
    })

    toast({
      title: "Task Added",
      description: `"${task.name}" has been added to your task list.`,
    })
  }

  const handleViewAllTasks = () => {
    toast({
      title: "View All Tasks",
      description: "Navigating to the complete task management view.",
    })
  }

  if (initiatives.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Tasks requiring attention in the next two weeks</CardDescription>
        </CardHeader>
        <CardContent className="py-10 text-center">
          <p className="text-slate-500">Generate initiatives to see upcoming tasks</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Tasks requiring attention in the next two weeks</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3 w-3" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={priorityFilter.includes("High")}
                onCheckedChange={(checked) => {
                  setPriorityFilter((prev) => (checked ? [...prev, "High"] : prev.filter((p) => p !== "High")))
                }}
              >
                High Priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={priorityFilter.includes("Medium")}
                onCheckedChange={(checked) => {
                  setPriorityFilter((prev) => (checked ? [...prev, "Medium"] : prev.filter((p) => p !== "Medium")))
                }}
              >
                Medium Priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={priorityFilter.includes("Low")}
                onCheckedChange={(checked) => {
                  setPriorityFilter((prev) => (checked ? [...prev, "Low"] : prev.filter((p) => p !== "Low")))
                }}
              >
                Low Priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={showCompleted} onCheckedChange={setShowCompleted}>
                Show Completed Tasks
              </DropdownMenuCheckboxItem>
              {(priorityFilter.length > 0 || showCompleted) && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-xs"
                    onClick={() => {
                      setPriorityFilter([])
                      setShowCompleted(false)
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddTaskDialogOpen(true)}>
            <Plus className="h-3 w-3" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                <button className="mt-0.5 focus:outline-none" onClick={() => handleToggleTaskCompletion(task.id)}>
                  <CheckCircle2
                    className={`h-5 w-5 ${task.completed ? "text-emerald-500 fill-emerald-500" : "text-slate-300"}`}
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <p className={`font-medium ${task.completed ? "line-through text-slate-400" : ""}`}>{task.name}</p>
                    <Badge
                      variant="outline"
                      className={
                        task.priority === "High"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : task.priority === "Medium"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className={`text-sm ${task.completed ? "text-slate-400" : "text-slate-500"} truncate`}>
                    {task.initiative}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Due {task.dueDate.toLocaleDateString()}</span>
                    </div>
                    <div>{task.owner}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center">
              <p className="text-slate-500">No tasks match your filters</p>
              {(priorityFilter.length > 0 || !showCompleted) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setPriorityFilter([])
                    setShowCompleted(true)
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleViewAllTasks}>
            <CalendarClock className="h-4 w-4" />
            View All Tasks
          </Button>
        </div>
      </CardContent>

      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create a new task for your CSR initiatives</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="task-name">Task Name</Label>
              <Input
                id="task-name"
                placeholder="Enter task name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initiative">Initiative</Label>
              <Select
                value={newTask.initiative}
                onValueChange={(value) => setNewTask({ ...newTask, initiative: value })}
              >
                <SelectTrigger id="initiative">
                  <SelectValue placeholder="Select initiative" />
                </SelectTrigger>
                <SelectContent>
                  {initiatives.map((initiative) => (
                    <SelectItem key={initiative.id} value={initiative.name}>
                      {initiative.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                placeholder="Task owner"
                value={newTask.owner}
                onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: "High" | "Medium" | "Low") => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
