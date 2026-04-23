import Link from "next/link"
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

const pillars = [
  {
    title: "Thoughtful itineraries",
    description:
      "Every route is shaped around pace, comfort, and the kind of moments people remember long after the flight home.",
    icon: Compass,
  },
  {
    title: "Trusted planning",
    description:
      "We handle the details with care so travelers can focus on anticipation, not logistics.",
    icon: ShieldCheck,
  },
  {
    title: "Human connection",
    description:
      "Behind every booking is a team that listens closely and designs trips around real interests.",
    icon: HeartHandshake,
  },
]

const highlights = [
  { value: "Tailored", label: "journeys built around each traveler" },
  { value: "Seamless", label: "planning from first idea to final check-in" },
  { value: "Meaningful", label: "experiences that feel personal, not generic" },
]

const promises = [
  "Clear communication at every step of the journey",
  "Destination ideas grounded in comfort and curiosity",
  "Experiences designed to feel elevated without feeling rigid",
]

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(139,0,0,0.16),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.14),_transparent_38%)]" />

      <section className="px-6 pb-16 pt-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#8B0000]" />
              Crafted for travelers who want more than a checklist
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              We design journeys that feel personal from the first conversation.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Voya Trail exists to make travel feel richer, calmer, and more memorable.
              We blend thoughtful planning with destination insight so every trip carries
              a sense of ease and discovery.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B0000] px-6 py-3 font-semibold text-white hover:bg-[#6f0000]"
              >
                Explore packages
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-semibold hover:bg-secondary"
              >
                Read travel stories
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/40 bg-gradient-to-br from-stone-950 via-[#491414] to-[#8B0000] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-3 text-sm font-medium text-white/80">
              <MapPinned className="h-4 w-4" />
              Travel planning with intention
            </div>

            <div className="mt-8 space-y-6">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8B0000]">
              What guides us
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Travel should feel carefully considered, never mass-produced.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon

              return (
                <article
                  key={pillar.title}
                  className="rounded-[1.75rem] border border-border bg-card p-7 shadow-sm"
                >
                  <div className="inline-flex rounded-2xl bg-[#8B0000]/10 p-3 text-[#8B0000]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-border bg-secondary/40 p-8 md:p-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8B0000]">
              Our promise
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A travel team that plans with care and stays close to the experience.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              We believe exceptional travel comes from the right mix of detail,
              responsiveness, and imagination. That means understanding what matters to
              each traveler and shaping the journey around it.
            </p>
          </div>

          <div className="grid gap-4">
            {promises.map((promise) => (
              <div
                key={promise}
                className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5"
              >
                <div className="mt-1 rounded-full bg-[#8B0000]/10 p-2 text-[#8B0000]">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-sm leading-7 text-foreground">{promise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-stone-950 px-8 py-12 text-center text-white md:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to plan something unforgettable?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
            Discover destinations, find the right itinerary, and start shaping a trip
            that feels entirely your own.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-stone-950 hover:bg-white/90"
            >
              Browse packages
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Explore the blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
