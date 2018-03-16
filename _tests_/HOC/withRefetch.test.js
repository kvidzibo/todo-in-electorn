import React from 'react'
import { render } from '../utils'
import { withRefetch } from '../../client/HOC'

let ModuleMock
let fetch
let WithRefetch

beforeEach(() => {
  ModuleMock = {on: jest.fn(), removeEventListener: jest.fn()}
  fetch = jest.fn().mockResolvedValue('')
  WithRefetch = withRefetch(
    'h1',
    ModuleMock,
    fetch
  )
})

test('adds listeners and calls fetch', () => {
  render(<WithRefetch />, 1)
  expect(ModuleMock.on.mock.calls.length).toBe(3)
  expect(fetch.mock.calls.length).toBe(1)
  const tree = render(<WithRefetch />, 2)
  expect(tree).toMatchSnapshot()
})

test('passes data', () => {
  const component = render(<WithRefetch />, 1)
  expect(component.find('h1').props().data).toBe('')
})
