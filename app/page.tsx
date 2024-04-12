import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <Link href={post.url}>
        <div className='className="scroll-m-20 text-lg font-semibold tracking-tight text-[#09090B]"'>{post.title}</div>
        <time dateTime={post.date} className="mb-2 block text-sm text-[#71717A]">
          {format(parseISO(post.date), 'yyyy/MM/dd')}
        </time>
      </Link>
    </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
