"use client"

import { CheckCircle2, Circle, Clock } from "lucide-react"

interface Milestone {
    id: string
    title: string
    description: string
    status: "completed" | "in-progress" | "pending"
    date?: string
}

interface ProgressTimelineProps {
    milestones: Milestone[]
    currentProgress: number
}

const defaultMilestones: Milestone[] = [
    {
        id: "1",
        title: "Proje Başlangıcı",
        description: "Sözleşme imzalama ve proje planlaması",
        status: "completed",
        date: "Ocak 2024"
    },
    {
        id: "2",
        title: "Temel Atma",
        description: "Zemin etüdü ve temel betonlama",
        status: "completed",
        date: "Mart 2024"
    },
    {
        id: "3",
        title: "Kaba İnşaat",
        description: "Taşıyıcı sistem ve betonarme işleri",
        status: "in-progress",
        date: "Ekim 2024"
    },
    {
        id: "4",
        title: "İnce İşler",
        description: "Sıva, boya, elektrik ve tesisat",
        status: "pending",
        date: "Mart 2025"
    },
    {
        id: "5",
        title: "Teslim",
        description: "Final kontroller ve anahtar teslim",
        status: "pending",
        date: "Haziran 2025"
    },
]

export function ProgressTimeline({
    milestones = defaultMilestones,
    currentProgress = 45,
}: ProgressTimelineProps) {
    const getStatusIcon = (status: Milestone["status"]) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            case "in-progress":
                return <Clock className="w-6 h-6 text-amber-500 animate-pulse" />
            case "pending":
                return <Circle className="w-6 h-6 text-muted-foreground" />
        }
    }

    const getStatusColor = (status: Milestone["status"]) => {
        switch (status) {
            case "completed":
                return "bg-emerald-500"
            case "in-progress":
                return "bg-amber-500"
            case "pending":
                return "bg-muted"
        }
    }

    return (
        <div className="bg-card rounded-3xl p-8 border shadow-lg">
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold mb-1">Proje İlerlemesi</h3>
                    <p className="text-muted-foreground">Güncel durum ve kilometre taşları</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-primary">{currentProgress}%</div>
                    <div className="text-sm text-muted-foreground">Tamamlandı</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-muted rounded-full mb-12 overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${currentProgress}%` }}
                />
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                    style={{
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s infinite linear',
                    }}
                />
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-muted" />

                {/* Milestones */}
                <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                        <div key={milestone.id} className="relative flex gap-6">
                            {/* Icon */}
                            <div className={`relative z-10 w-6 h-6 rounded-full ${getStatusColor(milestone.status)} flex items-center justify-center`}>
                                {milestone.status === "completed" && (
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                )}
                                {milestone.status === "in-progress" && (
                                    <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                                )}
                            </div>

                            {/* Content */}
                            <div className={`flex-1 pb-8 ${index === milestones.length - 1 ? 'pb-0' : ''}`}>
                                <div className={`p-4 rounded-2xl transition-all ${milestone.status === "in-progress"
                                        ? "bg-amber-500/10 border border-amber-500/30"
                                        : milestone.status === "completed"
                                            ? "bg-emerald-500/5"
                                            : "bg-muted/50"
                                    }`}>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h4 className={`font-bold text-lg ${milestone.status === "pending" ? "text-muted-foreground" : ""
                                                }`}>
                                                {milestone.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {milestone.description}
                                            </p>
                                        </div>
                                        {milestone.date && (
                                            <span className={`text-sm font-medium whitespace-nowrap ${milestone.status === "in-progress"
                                                    ? "text-amber-500"
                                                    : milestone.status === "completed"
                                                        ? "text-emerald-500"
                                                        : "text-muted-foreground"
                                                }`}>
                                                {milestone.date}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-muted-foreground">Tamamlandı</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-sm text-muted-foreground">Devam Ediyor</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <span className="text-sm text-muted-foreground">Bekliyor</span>
                </div>
            </div>
        </div>
    )
}
