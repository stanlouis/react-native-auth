import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "./config/fbConfig";

import {
  Header,
  Button,
  Spinner,
  Card,
  CardSection
} from "./src/components/common";
import LoginForm from "./src/components/LoginForm";

export default class App extends React.Component {
  state = {
    loggedIn: null
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  };

  render() {
    return (
      <View>
        <Header headerText={"Authentication"} />
        {this.renderContent()}
      </View>
    );
  }
}
