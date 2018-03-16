import React from 'react'
import { render } from '../utils'

import { Field } from '../../client/Components'

test('displays controlled childern', () => {
  const { component, tree } = render(<Field>test</Field>)
  expect(component.text()).toEqual('test')
  expect(component.find('div.control').length).toEqual(1)
  expect(tree).toMatchSnapshot()
})

test('displays label', () => {
  const { component, tree } = render(<Field label="label">test</Field>)
  expect(component.find('label').text()).toEqual('label')
  expect(tree).toMatchSnapshot()
})

test('displays error', () => {
  const { component, tree } = render(<Field error="error">test</Field>)
  expect(component.find('.is-danger').text()).toEqual('error')
  expect(tree).toMatchSnapshot()
})

test('removes control', () => {
  const { component, tree } = render(<Field uncontrolled>test</Field>)
  expect(component.find('.div.control').length).toEqual(0)
  expect(tree).toMatchSnapshot()
})

test('adds grouped', () => {
  const { component, tree } = render(<Field grouped>test</Field>)
  expect(component.find('.field.is-grouped').length).toEqual(1)
  expect(tree).toMatchSnapshot()
})
