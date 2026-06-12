import { notFound } from 'next/navigation'

import SiteShell from '@/components/site/site-shell'
import PostDetail from '@/components/social/post-detail'

import { POSTS, findPost, adjacentPosts } from '@/data/social-posts'

export const generateStaticParams = async () => POSTS.map((p) => ({ slug: p.slug }))

export const generateMetadata = async ({ params }) => {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: `${post.title} · ${post.formatLabel}`,
    description: post.summary,
  }
}

export default async function SocialPostPage({ params }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()
  const { prev, next } = adjacentPosts(slug)

  return (
    <SiteShell>
      <PostDetail post={post} prev={prev} next={next} />
    </SiteShell>
  )
}
