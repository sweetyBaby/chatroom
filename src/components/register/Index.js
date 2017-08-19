import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Form, Icon, Input, Button, message } from 'antd';
import styles from './register.css';

const FormItem = Form.Item;

class Index extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { actions, mes, existState, user } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) { return false; }
      actions.register(values).then(() => {
        if (true) { // 注册成功
          message.success('注册成功');
          // 发起登录请求
          actions.login(values).then(() => {
            if (user) {
              browserHistory.push('/');
            } else {
              message.error(mes);
            }
          });
        } else { // 注册失败
          message.error(mes);
        }
      }).catch(() => {
        message.error('未知错误');
      });
    });
  }
  checkUsername = (rule, value, callback) => {
    const form = this.props.form;
    const username = form.getFieldValue('username');
    const { actions, existState } = this.props;

    actions.checkUserExist(username).then(() => {
      if (existState) { // 用户名不存在
        callback();
      } else {
        callback('用户名已存在');
      }
    }).catch(() => {
      callback('发生未知错误~');
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {};

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className={styles.regForm}>
          <FormItem
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入用户名!', whitespace: true
              }, {
                min: 6, max: 10, message: '请输入6~10位用户名'
              }, {
                validator: this.checkUsername
              }],
              validateTrigger: 'onBlur',
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '邮箱格式无效',
              }, {
                required: true, message: '请输入邮箱',
              }],
              validateTrigger: 'onBlur',
            })(
              <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="邮箱" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码!',
              }, {
                validator: this.checkConfirm
              }, {
                pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,}$/, message: '必须包含字母，数字，特殊符号至少两种，密码不少于8位'
              }],
              validateTrigger: 'onBlur',
            })(
              <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请再次输入密码',
              }, {
                validator: this.checkPasswd, message: '密码输入不一致'
              }],
              validateTrigger: 'onBlur',
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请再次输入密码" />
              )}
          </FormItem>
          <Button type="primary" htmlType="submit" className={styles.regBtn}>
              注册
          </Button>
          <Link to="/"><div className={styles.linkLogin}>已有账号？去登录</div></Link>
        </Form>

      </div>
    );
  }
}
Index.propTypes = {};
export default Form.create()(Index);
