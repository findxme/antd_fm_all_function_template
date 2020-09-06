// import TweenOne from 'rc-tween-one';
// import Button from 'antd/lib/button';
// import SvgDrawPlugin from 'rc-tween-one/lib/plugin/SvgDrawPlugin';
// import PropTypes from 'prop-types';
// TweenOne.plugins.push(SvgDrawPlugin);

// const dataStartArr = ['30 150', '50% 50%', '30% 200', '20 30%', 0, '100%'];
// let i = 0;
// class Demo extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       tweenData: '100%',
//     };
//   }
  
//   onClick() {
//     const tweenData = dataStartArr[i];
//     this.setState({
//       tweenData,
//     });
//     i++;
//     i = i >= dataStartArr.length ? 0 : i;
//   }

//   render() {
//     return (
//       <div style={{ textAlign: 'center', marginTop: 40 }}>
//         <Button type="primary" onClick={this.onClick.bind(this)}>
//           Switch
//         </Button>
//         <svg width="200" height="84" version="1.2"
//           style={{ display: 'block', margin: 'auto' }}
//         >
//           <TweenOne
//             animation={{ SVGDraw: this.state.tweenData, duration: 1000 }}
//             style={{ fill: 'none', strokeWidth: 10, stroke: '#019BF0' }}
//             component="path"
//             d="M10,10c65,50,115,50,180,0"
//           />
//         </svg>
//         <p>Current Param: {this.state.tweenData}</p>
//       </div>
//     );
//   }
// }
// // Demo.propTypes = {
// //   children: PropTypes.any,
// //   className: PropTypes.string,
// //   paused: PropTypes.bool,
// // };
// // ReactDOM.render(<Demo/>, mountNode);


// export default Demo;

import PropTypes from 'prop-types';
import { InputNumber, Button, Checkbox } from 'antd';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 9999,
      animation: null,
      formatMoney: false,
    };
  }

  onChangeMoney = (e) => {
    this.setState({
      formatMoney: e.target.checked
    })
  }

  onClick = () => {
    const { value, formatMoney } = this.state;
    this.setState({
      animation: {
        Children: { 
          value: typeof value === 'number' ? value : 10000,floatLength: 2,
          formatMoney, 
        }, 
        duration: 99,
      }
    })
  }

  onChange = (value) => {
    console.log(value)
    this.setState({
      value,
    });
  }

  render() {
    return (
      <div 
        style={{ 
          display: 'flex', 
          height: '100%',
          minHeight: '220px', 
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <TweenOne
            animation={this.state.animation}
            style={{ fontSize: 56, marginBottom: 12 }}
          >
            1
          </TweenOne>
          <InputNumber 
            defaultValue={this.state.value}
            onChange={this.onChange}
          />
          <Checkbox style={{ margin: '0 16px' }} onChange={this.onChangeMoney}> to money</Checkbox>
          <Button
            type="primary"
            style={{ marginBottom: 32 }}
            onClick={this.onClick}
          >
            Start
          </Button>
        </div>
      </div>
    );
  }
}
 export default Demo;