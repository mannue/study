import React, {Component} from 'react';


export class Selector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selection: React.Children.toArray(props.children)[0].props.name
        }
    }

    setSelection = (ev) => {
        ev.persist();
        this.setState({
            selection: ev.target.name
        })
    }

    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    {
                        // 각 자식에 대해 함수를 호출하고, 그결과들을 배열로 리턴한다
                        React.Children.map(this.props.children, c => {
                            return <button name={c.props.name} onClick={this.setSelection} className={`btn btn-block m-2 ${this.state.selection === c.props.name ? "btn-primary active": "btn-secondary"}`}>
                                {
                                    c.props.name
                                }
                            </button>
                        })
                    }
                </div>
                <div className="col">
                    {
                        // 이 메서드는 자식의 배열을 리턴하는데, 엘리먼트를 재정렬하거나 부분 제거할때 유용하다.
                        React.Children.toArray(this.props.children).filter(c=> c.props.name === this.state.selection)
                    }
                </div>
            </div>
        </div>
    }
}