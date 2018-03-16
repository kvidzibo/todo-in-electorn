import React, { PureComponent } from 'react'
import { Field, Button } from '../Components'
import { handleChange } from '../Utils'
import { withRefetch } from '../HOC'
import Task from './Module'
import Item from './Item'

class List extends PureComponent {
  handleChange = handleChange.bind(this)
  state = {
    task: '',
    error: ''
  }
  add = () => {
    const { task } = this.state
    this.setState({error: '', task: ''})
    Task.save({task}).catch(e => {
      this.setState({error: e.message})
    })
  }

  render () {
    const { task, error } = this.state
    const { data } = this.props
    return (
      <div>
        <Field label="task" error={error}>
          <input value={task} onChange={this.handleChange} className="input" name="task" type="text"/>
        </Field>
        <Field>
          <Button onClick={this.add}>Add</Button>
        </Field>
        {!!data && data.map(item => (
          <Item key={item._id} item={item}/>
        ))}
      </div>
    )
  }
}

export default withRefetch(List, Task, () => Task.find({status: 'todo'}))
