import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, Button } from '../Components'
import Task from './Module'

class Item extends PureComponent {
  done = () => {
    const { item } = this.props
    Task.save({...item, status: 'done'})
  }

  remove = () => {
    const { item: { _id } } = this.props
    Task.remove({ _id })
  }

  render () {
    const { item } = this.props
    return (
      <div key={item._id} className="box">
        <Field>
          {item.task}
        </Field>
        <Field grouped uncontrolled>
          <Button control icon="check" onClick={this.done} />
          <Button control icon="times" onClick={this.remove} />
        </Field>
      </div>
    )
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    task: PropTypes.string
  })
}

export default Item
