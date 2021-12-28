import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData, products }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <div>
        <ul>
        {products.data.map( (props) => {
            return (
              <>
                <li>
                  {props.attributes.title}
                </li>
                <li>
                  {props.attributes.description}
                </li>
                <li>
                  {JSON.stringify(props.attributes)}
                </li>
              </>
            )
          })}
        </ul>
      </div>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}



export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  const resp = await fetch('http://localhost:1337/api/products?populate=*')
  const str = await resp.json()

  return {
    props: {
      allPostsData : allPostsData,
      products: str
    }
  }
}
