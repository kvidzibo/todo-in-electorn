import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

beforeAll(() => {
  configure({ adapter: new Adapter() })
})

export const render = (comp, mode = 3) => {
  switch (mode) {
    case 1:
      return shallow(comp)
    case 2:
      return renderer.create(comp).toJSON()
    case 3:
      return {
        component: shallow(comp),
        tree: renderer.create(comp).toJSON()
      }
    case 4:
      return mount(comp)
    case 5:
      return {
        component: mount(comp),
        tree: renderer.create(comp).toJSON()
      }
  }
}
