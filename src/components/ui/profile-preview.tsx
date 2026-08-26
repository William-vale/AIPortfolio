import { MapPin } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ProfilePreviewProps {
  fullName: string
  professionalTitle: string
  location?: string
  technologies: string[]
}

export function ProfilePreview({
  fullName,
  professionalTitle,
  location,
  technologies,
}: ProfilePreviewProps) {
  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CM'

  const slug = fullName
    ? fullName.toLowerCase().replace(/\s+/g, '-')
    : 'camila-martins'

  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      {/* Header do preview */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-neutral-300" />
          <div className="w-2 h-2 rounded-full bg-neutral-300" />
          <div className="w-2 h-2 rounded-full bg-neutral-300" />
        </div>
        <span className="flex-1 text-center">aiportfolio.dev/p/{slug}</span>
      </div>

      {/* Conteúdo do perfil */}
      <div className="space-y-3">
        <Avatar 
          fallback={initials}
          className="size-16 border-2 border-border"
        />
        
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground font-heading">
            {fullName || 'Seu Nome'}
          </h3>
          <p className="text-sm font-medium text-primary">
            {professionalTitle || 'Seu Título Profissional'}
          </p>
          {location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {location}
            </div>
          )}
        </div>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* Placeholder para bio */}
        <div className="space-y-2 pt-2">
          <div className="h-2 bg-bg-subtle rounded" />
          <div className="h-2 bg-bg-subtle rounded w-4/5" />
        </div>
      </div>
    </div>
  )
}
