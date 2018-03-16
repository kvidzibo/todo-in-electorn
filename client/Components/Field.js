import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Field extends PureComponent {
  render () {
    const { label, children, error, grouped, uncontrolled } = this.props
    const className = classNames({
      'field': true,
      'is-grouped': grouped
    })
    return (
      <div className={className}>
        {!!label && (<label className="label">{label}</label>)}
        {uncontrolled ? children : <div className="control">{children}</div>}
        {!!error && <p className="help is-danger">{error}</p>}
      </div>
    )
  }
}

Field.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  grouped: PropTypes.bool,
  uncontrolled: PropTypes.bool
}

Field.defaultProps = {
  label: '',
  error: '',
  grouped: false,
  uncontrolled: false
}

export default Field
