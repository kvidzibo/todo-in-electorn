import React from 'react'
import { render } from '../utils'

import { Button } from '../../client/Components'

test('displays childern', () => {
  const { component, tree } = render(<Button>test</Button>)
  expect(component.text()).toEqual('test')
  expect(tree).toMatchSnapshot()
})

test('displays icon', () => {
  const { component, tree } = render(<Button icon="test"/>)
  expect(component.find('i').length).toEqual(1)
  expect(tree).toMatchSnapshot()
})

test('adds control', () => {
  const { component, tree } = render(<Button control icon="test"/>)
  expect(component.find('div.control').length).toEqual(1)
  expect(tree).toMatchSnapshot()
})
