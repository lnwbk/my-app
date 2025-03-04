import qs from "qs";
import Image from "next/image";
import Link from "next/link";

interface TeamMemberProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  photo?: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  };
}

function TeamMemberCard({
  name,
  description,
  photo,
  slug,
}: Readonly<TeamMemberProps>) {
  const imageUrl = photo?.url ? `http://localhost:1337${photo.url}` : null;

  return (
    <Link href={`/our-team/${slug}`} className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={photo?.alternativeText || name}
          width={500}
          height={500}
          className="w-full object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

async function getTeamMembers(slug?: string) {
  const baseUrl = "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  const query = {
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
      blocks: {
        on: {
          "blocks.testimonial": {
            populate: {
              photo: {
                fields: ["alternativeText", "name", "url"],
              },
            },
          },
          "blocks.spoiler": {
            populate: true,
          },
          "blocks.rich-text": {
            populate: true,
          },
        },
      },
    },
    filters: slug ? { slug: { $eq: slug } } : undefined,
  };

  url.search = qs.stringify(query);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  return data;
}

export default async function OurTeam() {
  const teamMembers = await getTeamMembers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.data.map((member: TeamMemberProps) => (
          <TeamMemberCard key={member.documentId} {...member} />
        ))}
      </div>
    </div>
  );
}
