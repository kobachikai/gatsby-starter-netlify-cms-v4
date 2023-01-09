import React from 'react'

import Layout from '../../components/Layout'
import BlogRollAll from '../../components/BlogRollAll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/fuji-202004.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 rgb(180, 195, 0), -0.5rem 0 0 rgb(180, 195, 0)',
              backgroundColor: 'rgb(180, 195, 0)',
              color: 'white',
              padding: '1rem',
            }}
          >
            記事一覧
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRollAll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
