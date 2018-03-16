import React, { PureComponent } from 'react'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import { Hero, Section } from './Components'
import { withRefetch } from './HOC'
import { List as TodoList, Module as TodoM } from './Todo'

class App extends PureComponent {
  render () {
    const { data } = this.props

    return (
      <div className="app">
        <Hero
          title="Todo in electron"
          subtitle="The best todo app ever!"
          primary
        />
        <Section title="List" subtitle={`todo: ${data[1]} done: ${data[0]}`}>
          <TodoList />
        </Section>
      </div>
    )
  }
}

export default withRefetch(App, TodoM, () => Promise.all([
  TodoM.count({status: 'done'}),
  TodoM.count({status: 'todo'})
]))
