import React, {PureComponent} from 'react'

export default function withRefetch (WrappedComponent, Module, fetch) {
  return class extends PureComponent {
    state = {
      data: ''
    }
    componentDidMount () {
      Module.on('updated', this.fetch)
      Module.on('inserted', this.fetch)
      Module.on('removed', this.fetch)
      this.fetch()
    }

    componentWillUnmout () {
      console.log('lol')
      Module.removeEventListener('updated', this.fetch)
      Module.removeEventListener('inserted', this.fetch)
      Module.removeEventListener('removed', this.fetch)
    }

    fetch = () => {
      fetch().then(data => {
        this.setState({data})
      })
    }

    render () {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}
