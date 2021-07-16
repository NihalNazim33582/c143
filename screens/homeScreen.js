import React from "react";
import { Header, Icon, AirbnbRating } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity, Image } from "react-native";
import *as axios from "axios";
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      MovieDetails: {},
    };
  }
  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var mintues = num % 60;
    return `${hours}hrs ${mintues}mins`;
  }

  getMovies = async () => {
    const url = "http://localhost:5000/get-movie";
    // console.log(url)
    await axios
      .get(url)
      .then((response) => {
        var details = response.data.data;
        console.log(details);
        details["duration"] = this.timeConvert(details.duration);
        this.setState({
          MovieDetails: details,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  likedMovies = async() => {
    const url = "http://localhost:5000/liked-movie";
     await axios
      .post(url)
      .then((response) => {
        this.getMovies();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  nonLikedMovies = async() => {
    const url = "http://localhost:5000/non-liked-movie";
     await axios
      .post(url)
      .then((response) => {
        this.getMovies();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  notMatched = async() => {
    const url = "http://localhost:5000/did-not-match";
     await axios
      .post(url)
      .then((response) => {
        this.getMovies();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const{MovieDetails}= this.state
    if (MovieDetails.poster_link) {
      const {
        poster_link,
        title,
        release_date,
        duration,
        rating,
        overview,
      } = MovieDetails;
      return (
        <SafeAreaProvider>
          <View style={styles.Container}>
            <View style={styles.headerContainer}>
              <Header
                centerComponent={{
                  text: "Recommended Movies",
                  style: styles.headerTitle,
                }}
                rightComponent={{
                  icon: "search",
                  color: "white",
                }}
                backgroundColor={"#d500f9"}
              ></Header>
            </View>
            <View style={styles.subContainer}>
              <View style={styles.subTopContainer}>
                <Image source={{uri:poster_link}} style={styles.posterImage}></Image>
              </View>
              <View style={styles.middleBottomContainer}>
                <View style={{ flex: 0.2 }}>
                  <AirbnbRating count={10}>
                    reviews={["", "", "", "", ""]}
                    isDisabled={true}
                    size={RFValue(25)}
                    starContainerStyle={{ marginTop: -30 }}
                  </AirbnbRating>
                </View>
                <View style={styles.lowerBottomContainer}>
                  <View style={styles.iconButtonContainer}>
                    <TouchableOpacity onPress={this.likedMovies}>
                      <Icon
                        reverse
                        name={"check-circle"}
                        type={"feather"}
                        size={RFValue(25)}
                        color={"green"}
                      ></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.nonLikedMovies}>
                      <Icon
                        reverse
                        name={"circle-with-cross"}
                        type={"entypo"}
                        size={RFValue(25)}
                        color={"red"}
                      ></Icon>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonCotainer}>
                    <TouchableOpacity style={styles.button} onPress={this.notMatched}>
                      <Text style={styles.buttonText}>Did Not Match</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaProvider>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.1,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18),
  },
  subContainer: {
    flex: 0.9,
  },
  subTopContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  posterImage: {
    width: "60%",
    height: "90%",
    resizeMode: "stretch",
    borderRadius: RFValue(30),
    marginHorizontal: RFValue(10),
  },
  subBottomContainer: {
    flex: 0.6,
  },
  upperBottomContainer: {
    flex: 0.2,
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: RFValue(14),
    fontWeight: "300",
  },
  middleBottomContainer: {
    flex: 0.35,
  },
  overview: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray",
  },
  lowerBottomContainer: {
    flex: 0.45,
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonCotainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: RFValue(15),
  },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },
});
