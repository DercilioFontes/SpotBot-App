import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableHighlight, 
  Button, 
  ActivityIndicator,
  AsyncStorage } from 'react-native';

  // let STORAGE_KEY = 'id_token'

export default class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Username',
      licensePlate: 'Licence Plate',
      email: 'email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      showProgress: false
    }
  }

  // async _onValueChange(item, selectedValue) {
  //   try {
  //     await AsyncStorage.setItem(item, selectedValue)
  //   } catch (err) {
  //     console.log('AsyncStorage error: ' + error.message)
  //   }
  // }

  onLoginSubmitted() {
    // const DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY)
    console.log(JSON.stringify({
      user: {
        name: this.state.username,
        license_plate: this.state.licensePlate,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword
      }
    }))
    this.setState({showProgress: true})
    fetch('https://spot-bot-server.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'aplication/json',
        // 'Authorization': 'Bearer' + DEMO_TOKEN
      },
      body: JSON.stringify({
        user: {
          name: this.state.username,
          license_plate: this.state.licensePlate,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.confirmPassword
        }
      }),
    })
    .then((response) => {
      if(response.status >= 200 && response.status < 300) {
        return response
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      console.log(responseData)
      // this._onValueChange(STORAGE_KEY, responseData.id_token)
    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      this.setState({showProgress: false})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
        <TextInput
        style={styles.input}
        onChangeText={(username) => this.setState({username})}
        placeholder={this.state.username}
        />
        <TextInput
        style={styles.input}
        onChangeText={(email) => this.setState({email})}
        placeholder={this.state.email}
        />
        <TextInput
        style={styles.input}
        onChangeText={(licensePlate) => this.setState({licensePlate})}
        placeholder={this.state.licensePlate}
        />
        <TextInput
        style={styles.input}
        onChangeText={(password) => this.setState({password})}
        placeholder={this.state.password}
        />
        <TextInput
        style={styles.input}
        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
        placeholder={this.state.confirmPassword}
        />
        <TouchableHighlight style={styles.button}>
        <Button style={styles.button} title='Submit' onPress={this.onLoginSubmitted.bind(this)}/></TouchableHighlight>

        <ActivityIndicator
        animating={this.state.showProgress}
        size='large'
        style={styles.loader}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    margin: 10
  },
  input: {
    height: 40, 
    width: 250,
    marginTop: 1,
    marginBottom: 1,
    borderColor: 'gray', 
    borderBottomWidth: 1,
    padding: 2
  },
  button: {
    height: 40, 
    width: 250,
    marginTop: 20,
    backgroundColor: '#bdbdbd', 
    padding: 4
  },
  loader: {
    marginTop: 20
  },
});
