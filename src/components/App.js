import React from  "react";

class App extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
  			userName:''
	  }
  }
  handelChange(e){
		this.setState({
      		username:e.target.value,
    	})
	}
  handleSubmit() {

    let url = "http://localhost:8080/user/get";
    //let formData = new FormData();
    //formData.append('userName', this.state.userName);
    //formData.append('userPassWord', this.state.userPassWord);
    fetch(url,{
        method: 'GET',
        mode: 'cors'
        //body: formData,
    }).then(res => {
        return res.json();
    }).then(json => {
        console.log('获取的结果', json.data);
        return json;
    }).catch(err => {
        console.log('请求错误', err);
    })
  }
  render() {
    return  <div className= 'loginDiv'>
    		<h1>Login</h1>
        		<input type="text" onChange={this.handelChange.bind(this)} placeholder='请输入用户名'/><br/>
	          <input type='password' placeholder='请输入密码'/><br/>
			      <input type="button" onClick={this.handleSubmit.bind(this)} value="提交"/>
           </div>;
  }
}

export default App;