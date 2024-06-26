import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Features from '../components/Features'
import Content, {HTMLContent} from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import FullWidthImage from '../components/FullWidthImage'

// eslint-disable-next-line
export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  content,
  contentComponent
}) => {
  const heroImage = getImage(image) || image
  const PageContent = contentComponent || Content

  return (
  <div className="content">
    <FullWidthImage img={heroImage} title={title} />
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
              <p>{description}</p>
            </div>
          </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Features gridItems={intro.blurbs} />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { markdownRemark: post} = data

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    post: PropTypes.object,
  }),
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: CONSTRAINED)
          }
        }
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
        }
      }
    }
  }
`
