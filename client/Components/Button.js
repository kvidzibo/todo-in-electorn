import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Button extends PureComponent {
  render () {
    const { children, onClick, control, icon } = this.props
    const buttonComp = (
      <button onClick={onClick} className="button">
        {icon ? <span className="icon"><i className={`fa fa-${icon}`}></i></span> : children}
      </button>
    )
    return control ? (
      <div className="control">
        {buttonComp}
      </div>
    ) : (buttonComp)
  }
}

Button.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  control: PropTypes.bool
}

Button.defaultProps = {
  icon: '',
  control: false
}

export default Button
