"use client"

import Link from "next/link"
import { MapPin, Calendar, ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
    id: number
    title: string
    category: string
    status: "completed" | "ongoing"
    year: string
    description: string
    image: string
    location?: string
    progress?: number
}

export function ProjectCard({
    id,
    title,
    category,
    status,
    year,
    description,
    image,
    location,
    progress,
}: ProjectCardProps) {
    return (
        <Link href={`/projeler/${id}`}>
            <div className="group relative overflow-hidden rounded-3xl bg-card border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <span
                            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${status === "completed"
                                    ? "bg-emerald-500/90 text-white"
                                    : "bg-amber-500/90 text-white"
                                }`}
                        >
                            {status === "completed" ? "✓ Tamamlandı" : "⏳ Devam Ediyor"}
                        </span>
                    </div>

                    {/* Progress Bar (for ongoing projects) */}
                    {status === "ongoing" && progress !== undefined && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                            <div
                                className="h-full bg-amber-400 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}

                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight className="text-white" size={20} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                    {/* Category & Year */}
                    <div className="flex items-center gap-3 mb-3 text-sm">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {category}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar size={14} />
                            {year}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                        {description}
                    </p>

                    {/* Location */}
                    {location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin size={14} />
                            {location}
                        </div>
                    )}

                    {/* Progress Info (for ongoing) */}
                    {status === "ongoing" && progress !== undefined && (
                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">İlerleme</span>
                            <span className="text-sm font-bold text-amber-500">{progress}%</span>
                        </div>
                    )}
                </div>

                {/* Decorative gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none" />
            </div>
        </Link>
    )
}
