import React from 'react'
import { render } from '../utils'
import Item from '../../client/Todo/Item'
import Module from '../../client/Todo/Module'

jest.mock('electron', () => ({
  remote: {require: jest.fn(() => ({Task: {}}))}
}))
jest.mock('../../client/Todo/Module')

let item = {
  _id: 'testID',
  task: 'test task'
}

beforeEach(() => {
  Module.save = jest.fn().mockResolvedValue('')
  Module.remove = jest.fn().mockResolvedValue('')
})

test('renders correctly', () => {
  const { component, tree } = render(<Item item={item}/>, 5)
  expect(component.find('Field').length).toBe(2)
  expect(component.find('Field').first().text()).toBe('test task')
  expect(tree).toMatchSnapshot()
})

test('calls save correctly on done click', () => {
  const { component, tree } = render(<Item item={item}/>, 5)
  expect(component.find('Field').length).toBe(2)
  component.find('button').at(0).simulate('click')
  expect(Module.save.mock.calls.length).toBe(1)
  expect(Module.save.mock.calls[0][0]).toEqual({...item, status: 'done'})
  expect(tree).toMatchSnapshot()
})

test('calls remove correctly', () => {
  const { component, tree } = render(<Item item={item}/>, 5)
  expect(component.find('Field').length).toBe(2)
  component.find('button').at(1).simulate('click')
  expect(Module.remove.mock.calls.length).toBe(1)
  expect(Module.remove.mock.calls[0][0]._id).toBe(item._id)
  expect(tree).toMatchSnapshot()
})
