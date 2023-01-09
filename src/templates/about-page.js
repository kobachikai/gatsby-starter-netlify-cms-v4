import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { getImage } from "gatsby-plugin-image";
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import FullWidthImage from '../components/FullWidthImage';

export const AboutPageTemplate = ({ image, title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  const heroImage = getImage(image) || image;

  return (
  <div>
      <FullWidthImage img={heroImage} title={title} />
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

AboutPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
