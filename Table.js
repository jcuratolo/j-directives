var React = require('react')

module.exports = class Table extends React.Component {
  static mapState(state) {
    return {items: state.users}
  }
  static mapDispatch(dispatch) {
    return {
      selectUser: user => dispatch({
        type: 'selectUser',
        user
      }),
      addItem: () => dispatch({
        type: 'addItem',
        data: { id: 3, name: "Slarven", email: "Slarven@marven.com" }
      })
    }
  }
  render() {
    return <tbody>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>        
      </tr>
      {this.props.items.map((item, idx) => <tr key={idx}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td><button className="btn" onClick={() => this.props.addItem()}>Edit</button></td>          
      </tr>)}
    </tbody>
  }
}