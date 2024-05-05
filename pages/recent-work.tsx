import { readToken } from 'lib/sanity.api'
import { getAllRecentWork, getClient } from 'lib/sanity.client'
import { RecentWork, recentWorkQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import Footer from 'components/Footer'

interface PageProps extends SharedPageProps {
  recentWork: RecentWork[]
  params: QueryParams
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<RecentWork[]>(props.recentWork, recentWorkQuery)

  const seo = {
    title: 'Outframe | Recent Work',
    description: '',
    image: '',
    keywords: [],
  }

  return (
    <Layout seo={seo}>
      <main className={clsx('px-gutter bg-background text-mainText')}>
        <div className={clsx('pt-[191px]', 'lg:grid lg:grid-cols-12 ')}>
          <h1
            className={clsx(
              ' uppercase text-[36px] leading-[43.2px] tracking-[-0.2px] font-monoMedium text-mainText',
              'lg:text-[76px] lg:leading-[91.2px] lg:col-span-4',
            )}
          >
            Recent
            <br /> Work
          </h1>
          <p
            className={clsx(
              'text-[16px] leading-[24px] text-secondaryText font-sansRegular mt-[32px]',
              'lg:mt-[0px] lg:text-[20px] lg:leading-[30px] lg:max-w-[560px] lg:col-start-8 lg:col-end-13',
            )}
          >
            <span className={clsx('text-mainText')}>Recent Work.</span> Here you
            will find some designs from our most recent projects, as well as
            visual experiments. Feel free to check our case studies for more
            in-depth work.
          </p>
        </div>
        <section className={clsx('mt-[72px] flex flex-col gap-y-[65px]')}>
          {data.length > 0 &&
            data.map((work, index) => (
              <article key={work.title + index}>
                <Image
                  src={urlForImage(work.image).url()}
                  alt={String(work.image.alt)}
                  width={1200}
                  height={1200}
                />
                <div
                  className={clsx('flex mt-[8px] items-center justify-between')}
                >
                  <h6
                    className={clsx(
                      'text-[16px] leading-[24px] text-secondaryText font-sansRegular',
                    )}
                  >
                    {work.title}
                  </h6>
                  <span
                    className={clsx(
                      'text-accent font-monoRegular text-[14px] leading-[25.2px] tracking-[-0.2px]',
                    )}
                  >
                    {work.year}
                  </span>
                </div>
              </article>
            ))}
        </section>
      </main>
      <Footer />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const recentWork = await getAllRecentWork(client)

  return {
    props: {
      recentWork,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export function BlogCard({
  post,
  isIndividualBlog = false,
}: {
  post: Post
  isIndividualBlog?: boolean
}) {
  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      key={post._id}
      className={clsx(
        'md:w-[calc(50%-20px)]',

        'lg:w-[calc(33%-24px)]',
        'xl:w-[calc(33%-50px)]',
        isIndividualBlog && 'md:w-full lg:w-[33%] xl:w-[33%]',
      )}
    >
      <article
        key={post._id}
        className={clsx(
          'pb-[12px] border-b-[1px] border-b-dividers',
          'lg:pb-[16px]',
        )}
      >
        <Image
          src={urlForImage(post.coverImage).url()}
          alt={String(post.coverImage.alt)}
          width={1200}
          height={1200}
        />
        <div
          className={clsx(
            'flex gap-x-[30px] leading-[27px] text-[18px] mt-[12px] font-sansMedium justify-between',
            'lg:mt-[16px] lg:text-[20px] lg:leading-[26px]',
          )}
        >
          <h6 className={clsx('lg:max-w-[404px]')}>{post.title}</h6>
          <span
            className={clsx(
              'whitespace-nowrap font-monoRegular text-accent text-[14px] leading-[25px] tracking-[-0.2px]',
              'lg:text-[16px] leading-[24px]',
            )}
          >
            {formattedDate(post.date)}
          </span>
        </div>
        <p
          className={clsx(
            'text-secondaryText font-sansRegular text-[16px] leading-[24px] mt-[12px]',
            'lg:mt-[16px] lg:text-[16px] leading-[26px]',
          )}
        >
          {post.cardSubtitle}
        </p>
      </article>
    </Link>
  )
}