import Image from "next/image";
import Link from "next/link";
import { MapPin, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/SocialIcons";
import { profile } from "@/lib/data/profile";

export function ProfileSidebar() {
  return (
    <aside className="w-full">
      {/* Avatar */}
      <div className="mb-4">
        <div
          className="w-full max-w-[260px] aspect-square rounded-full overflow-hidden mx-auto md:mx-0"
          style={{ border: "1px solid var(--color-gh-border)" }}
        >
          <Image
            src={profile.avatar}
            alt={`${profile.name}'s profile picture`}
            width={260}
            height={260}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Name & Username */}
      <div className="mb-4">
        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--color-gh-text)" }}
        >
          {profile.name}
        </h1>
        <p
          className="text-base font-mono mt-0.5"
          style={{ color: "var(--color-gh-text-muted)", fontWeight: 300 }}
        >
          @{profile.username}
        </p>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--color-gh-text)" }}
        >
          {profile.bio}
        </p>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-2 mb-4">
        <SocialButton
          href={profile.socials.github}
          icon={<GithubIcon size={16} />}
          label="GitHub"
          external
        />
        <SocialButton
          href={profile.socials.linkedin}
          icon={<LinkedinIcon size={16} />}
          label="LinkedIn"
          external
        />
        <SocialButton
          href={profile.socials.resume}
          icon={<FileText size={16} />}
          label="Resume"
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
        <MapPin size={15} />
        <span>{profile.location}</span>
      </div>
    </aside>
  );
}

function SocialButton({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-center gap-2 w-full px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:no-underline"
      style={{
        backgroundColor: "var(--color-gh-elevated)",
        border: "1px solid var(--color-gh-border)",
        color: "var(--color-gh-text)",
      }}
    >
      {icon}
      {label}
    </Link>
  );
}
