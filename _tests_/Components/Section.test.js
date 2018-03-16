import React from 'react'
import { render } from '../utils'

import { Section } from '../../client/Components'

test('displays title', () => {
  const { component, tree } = render(<Section title="title"/>)
  expect(component.find('.title').text()).toEqual('title')
  expect(tree).toMatchSnapshot()
})

test('hides title', () => {
  const { component, tree } = render(<Section/>)
  expect(component.find('.title').length).toEqual(0)
  expect(tree).toMatchSnapshot()
})

test('dispays subtitle', () => {
  const { component, tree } = render(<Section subtitle="subtitle"/>)
  expect(component.find('.subtitle').text()).toEqual('subtitle')
  expect(tree).toMatchSnapshot()
})

test('hides subtitle', () => {
  const { component, tree } = render(<Section/>)
  expect(component.find('.subtitle').length).toEqual(0)
  expect(tree).toMatchSnapshot()
})

test('displays children', () => {
  const { component, tree } = render(<Section>text</Section>)
  expect(component.text()).toEqual('text')
  expect(tree).toMatchSnapshot()
})
