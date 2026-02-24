import Image from 'next/image'
import Link from 'next/link'
import type { TeamMember } from '@/types/lo-profile'

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="team-card">
      <div className="team-card-photo">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name} — ${member.title}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, 280px"
          />
        ) : (
          <div className="team-card-photo-placeholder" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>

      <div className="team-card-body">
        <div className="team-card-name">{member.name}</div>
        <div className="team-card-title">{member.title}</div>
        {member.nmls && (
          <div className="team-card-nmls">NMLS# {member.nmls}</div>
        )}
        {member.specialty && (
          <div className="team-card-specialty">{member.specialty}</div>
        )}

        <Link href={`/team/${member.slug}`} className="team-card-link">
          View Profile →
        </Link>
      </div>
    </div>
  )
}
