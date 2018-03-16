import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Section extends PureComponent {
  render () {
    const { title, subtitle, children } = this.props
    return (
      <section className="section">
        <div className="container">
          {!!title && (
            <h1 className="title">{title}</h1>
          )}
          {!!subtitle && (
            <h2 className="subtitle">{subtitle}</h2>
          )}
          {children}
        </div>
      </section>
    )
  }
}

Section.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node
}

Section.defaultProps = {
  title: '',
  subtitle: '',
  children: null
}

export default Section
