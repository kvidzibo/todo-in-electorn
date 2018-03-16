import React from 'react'
import { render } from '../utils'
import List from '../../client/Todo/List'
import Module from '../../client/Todo/Module'

jest.mock('electron', () => ({
  remote: {require: jest.fn(() => ({Task: {}}))}
}))
jest.mock('../../client/Todo/Module')
jest.mock('../../client/HOC', () => ({
  withRefetch: (c) => c
}))

beforeEach(() => {
  Module.save = jest.fn().mockResolvedValue('')
})

test('renders correctly', () => {
  const { component, tree } = render(<List />)
  expect(component.find('Field').length).toEqual(2)
  expect(tree).toMatchSnapshot()
})

test('calls save on add', () => {
  const component = render(<List />, 1)
  component.find('Button').simulate('click')
  expect(Module.save.mock.calls.length).toBe(1)
})

test('sets error on save error', (done) => {
  Module.save = jest.fn().mockRejectedValue({message: 'error'})
  const { component, tree } = render(<List />)
  component.find('Button').simulate('click')
  expect(Module.save.mock.calls.length).toBe(1)
  setTimeout(() => {
    expect(component.state().error).toBe('error')
    expect(tree).toMatchSnapshot()
    done()
  }, 0)
})
