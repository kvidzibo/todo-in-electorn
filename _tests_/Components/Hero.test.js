import React from 'react'
import { render } from '../utils'

import { Hero } from '../../client/Components'

test('displays title', () => {
  const { component, tree } = render(<Hero title="title"/>)
  expect(component.find('.title').text()).toEqual('title')
  expect(tree).toMatchSnapshot()
})

test('hides title', () => {
  const { component, tree } = render(<Hero/>)
  expect(component.find('.title').length).toEqual(0)
  expect(tree).toMatchSnapshot()
})

test('dispays subtitle', () => {
  const { component, tree } = render(<Hero subtitle="subtitle"/>)
  expect(component.find('.subtitle').text()).toEqual('subtitle')
  expect(tree).toMatchSnapshot()
})

test('hides subtitle', () => {
  const { component, tree } = render(<Hero/>)
  expect(component.find('.subtitle').length).toEqual(0)
  expect(tree).toMatchSnapshot()
})

test('adds primary', () => {
  const { component, tree } = render(<Hero primary/>)
  expect(component.find('.is-primary').length).toEqual(1)
  expect(tree).toMatchSnapshot()
})
