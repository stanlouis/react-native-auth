import React, { Component } from "react";
import firebase from "firebase";
import { Text, StyleSheet, ActivityIndicator } from "react-native";

import { Button, Card, CardSection, Input, Spinner } from "./common";

class LoginForm extends Component {
  state = { email: "", password: "", error: "", loading: false };

  onButtonPress = () => {
    const { password, email } = this.state;
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail);
      });
  };

  onLoginFail = () => {
    this.setState({ error: "Authentication Failed.", loading: false });
  };

  onLoginSuccess = () => {
    this.setState({ email: "", password: "", error: "", loading: false });
  };

  renderButton = () => {
    return this.state.loading ? (
      <Spinner size="small" />
    ) : (
      <Button onPress={this.onButtonPress}>Log in</Button>
    );
  };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: { fontSize: 20, alignSelf: "center", color: "red" }
});

export default LoginForm;
