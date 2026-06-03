import { ProfileSidebar } from "@/components/home/ProfileSidebar";
import { ReadmeCard } from "@/components/home/ReadmeCard";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { OSSHighlight } from "@/components/home/OSSHighlight";
import { RecentBlogPosts } from "@/components/home/RecentBlogPosts";
import { GitHubActivity } from "@/components/home/GitHubActivity";
import { LeetCodeStats } from "@/components/home/LeetCodeStats";
import { features } from "@/lib/features";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Sidebar — sticky on md+ */}
        <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <div className="md:sticky md:top-20">
            <ProfileSidebar />
          </div>
        </div>

        {/* Right Content Column */}
        <div className="flex-1 min-w-0 space-y-10">
          <ReadmeCard />
          <FeaturedProjects />
          <OSSHighlight />
          <RecentBlogPosts />
          <GitHubActivity />
          {features.SHOW_LEETCODE && <LeetCodeStats />}
        </div>
      </div>
    </div>
  );
}
