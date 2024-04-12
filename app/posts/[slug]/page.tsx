import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function BackButton() {
  return (
    <Button variant="outline" size="icon">
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto max-w-xl py-8">
      <Link href="/">
        <BackButton />
      </Link>
      <div className="mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <time dateTime={post.date} className="mb-2 text-sm text-[#71717A]">
          {format(parseISO(post.date), 'yyyy/MM/dd')}
        </time>
      </div>
      <div className="prose prose-p:text-[#09090B] prose-pre:bg-white prose-code:text-[#09090B] prose-pre:border prose-pre:border-[#e5e7eb]" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  )
}

export default PostLayout
