"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, X, ExternalLink } from "lucide-react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Project {
    id: number
    title: string
    category: string
    status: "completed" | "ongoing"
    year: string
    lat: number
    lng: number
    image?: string
}

const projects: Project[] = [
    { id: 1, title: "ERSA ORMAN EVLERİ", category: "Konut", status: "completed", year: "2018", lat: 40.9627, lng: 29.2608 },
    { id: 2, title: "FERHAT PAŞA İŞ MERKEZİ", category: "Ticari", status: "completed", year: "2018", lat: 40.9927, lng: 29.1208 },
    { id: 3, title: "MUSTAFA KEMAL PROJESİ", category: "Konut", status: "completed", year: "2018", lat: 40.9827, lng: 29.1108 },
    { id: 4, title: "EYÜPCAN APARTMANI", category: "Konut", status: "completed", year: "2014", lat: 40.9957, lng: 29.1278 },
    { id: 5, title: "KUMBAŞI PROJESİ", category: "Konut", status: "ongoing", year: "2025", lat: 41.0127, lng: 29.0808 },
    { id: 6, title: "19 MAYIS PROJESİ", category: "Konut", status: "ongoing", year: "2025", lat: 41.0027, lng: 29.0908 },
    { id: 7, title: "Villa Bodrum", category: "Konut", status: "completed", year: "2023", lat: 37.0344, lng: 27.4305 },
    { id: 8, title: "Office Tower İzmir", category: "Ticari", status: "completed", year: "2024", lat: 38.4189, lng: 27.1287 },
]

interface ProjectMapProps {
    onProjectSelect?: (project: Project) => void
    selectedProjectId?: number
}

export function ProjectMap({ onProjectSelect, selectedProjectId }: ProjectMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<L.Map | null>(null)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient || !mapRef.current || mapInstanceRef.current) return

        // Initialize map
        const map = L.map(mapRef.current, {
            center: [39.9334, 32.8597], // Turkey center
            zoom: 6,
            scrollWheelZoom: false,
        })

        // Add tile layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map)

        // Custom marker icon
        const createIcon = (status: "completed" | "ongoing") => {
            return L.divIcon({
                className: "custom-marker",
                html: `
          <div class="relative">
            <div class="w-8 h-8 rounded-full ${status === "completed" ? "bg-emerald-500" : "bg-amber-500"
                    } border-4 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${status === "completed" ? "bg-emerald-500" : "bg-amber-500"
                    } rotate-45"></div>
          </div>
        `,
                iconSize: [32, 40],
                iconAnchor: [16, 40],
            })
        }

        // Add markers
        projects.forEach((project) => {
            const marker = L.marker([project.lat, project.lng], {
                icon: createIcon(project.status),
            }).addTo(map)

            marker.on("click", () => {
                setSelectedProject(project)
                onProjectSelect?.(project)
                map.flyTo([project.lat, project.lng], 12, { duration: 1 })
            })

            // Tooltip
            marker.bindTooltip(project.title, {
                permanent: false,
                direction: "top",
                offset: [0, -40],
                className: "custom-tooltip",
            })
        })

        mapInstanceRef.current = map

        return () => {
            map.remove()
            mapInstanceRef.current = null
        }
    }, [isClient, onProjectSelect])

    // Fly to selected project
    useEffect(() => {
        if (selectedProjectId && mapInstanceRef.current) {
            const project = projects.find((p) => p.id === selectedProjectId)
            if (project) {
                mapInstanceRef.current.flyTo([project.lat, project.lng], 12, { duration: 1 })
                setSelectedProject(project)
            }
        }
    }, [selectedProjectId])

    if (!isClient) {
        return (
            <div className="w-full h-[500px] rounded-3xl bg-muted flex items-center justify-center">
                <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Harita yükleniyor...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            {/* Map Container */}
            <div
                ref={mapRef}
                className="w-full h-[500px] rounded-3xl overflow-hidden shadow-xl border"
            />

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg z-[1000]">
                <h4 className="font-semibold mb-3 text-sm">Proje Durumu</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500" />
                        <span className="text-sm">Tamamlandı ({projects.filter((p) => p.status === "completed").length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-amber-500" />
                        <span className="text-sm">Devam Ediyor ({projects.filter((p) => p.status === "ongoing").length})</span>
                    </div>
                </div>
            </div>

            {/* Selected Project Info */}
            {selectedProject && (
                <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-80 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg z-[1000]">
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full"
                    >
                        <X size={16} />
                    </button>
                    <div className="pr-6">
                        <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${selectedProject.status === "completed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                        >
                            {selectedProject.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
                        </span>
                        <h4 className="font-bold text-lg">{selectedProject.title}</h4>
                        <p className="text-sm text-muted-foreground">
                            {selectedProject.category} • {selectedProject.year}
                        </p>
                        <a
                            href={`/projeler/${selectedProject.id}`}
                            className="inline-flex items-center gap-1 mt-3 text-sm text-primary font-medium hover:underline"
                        >
                            Detayları Gör <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .custom-tooltip {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 6px 12px;
          font-weight: 500;
        }
        .custom-tooltip::before {
          border-top-color: rgba(0, 0, 0, 0.8);
        }
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #333 !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f5f5f5 !important;
        }
      `}</style>
        </div>
    )
}
