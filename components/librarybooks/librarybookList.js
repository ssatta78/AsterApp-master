import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import config from "../../config/config.json";
import { Colors } from "../../components/styles";
// colors
const {
  primary,
  secondary,
  tertiary,
  darklight,
  brand,
  brandSecondary,
  green,
  red,
  background,
} = Colors;

export default function List() {
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNo, setTotalNo] = useState(0);

  useEffect(() => {
    // axios.get(`https://reqres.in/api/users?page=${page}`).then((res) => {
    axios
      .get(
        `${config.baseUrl}AppLogin/AsterBookSetup?Per_Page=10&Current_Page=${page}&Token=abe9fad8-7852-43ed-9ab9-fcea44da49b8`
      )
      .then((res) => {
        // console.log(res.data.lstBooksSetup);
        // setTotalNo(res.data.total_pages);
        setDate([...data, ...res.data.lstBooksSetup]);
      });
  }, [page]);

  function loadMore() {
    // if (page <= totalNo) {
    console.log("page", page);
    setPage(page + 1);
    // }
  }
  function renderUser({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text numberOfLines={1} style={styles.title}>
              {item.BooksSetupName}
            </Text>
            <Text style={styles.price}>{item.BooksSetupLanguage}</Text>
          </View>
        </View>

        <Image
          style={styles.cardImage}
          source={{
            uri:
              `${config.url}` +
              (item.BooksSetupImgUrl
                ? item.BooksSetupImgUrl.slice(5)
                : "/Files/BooksImages/noimage.jpeg"),
          }}
        />
      </View>
      // <View
      //   style={{
      //     flexDirection: "row",
      //     alignItems: "center",
      //     backgroundColor: "lightgrey",
      //     padding: 10,
      //     margin: 10,
      //     borderRadius: 7,
      //   }}
      // >
      //   <Image
      //     style={{ width: 100, height: 100, borderRadius: 100 / 10 }}
      //     source={{
      //       uri:
      //         `${config.url}` +
      //         (item.BooksSetupImgUrl
      //           ? item.BooksSetupImgUrl.slice(5)
      //           : "/Files/BooksImages/noimage.jpeg"),
      //     }}
      //   />
      //   <Text style={{ flex: 1, marginLeft: 10, fontSize: 14 }}>
      //     {item.BooksSetupName}
      //   </Text>
      // </View>
    );
  }
  function renderFooter() {
    // if (page <= totalNo) {
    return <ActivityIndicator color="black" size={30} />;
    // }
    // return null;
  }
  function renderList() {
    if (data.length > 0) {
      return (
        <FlatList
          data={data}
          renderItem={renderUser}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          keyExtractor={(item, i) => i.toString()}
          ListFooterComponent={renderFooter}
        />
      );
    } else if (totalNo == 0) {
      return <Text>Loading....</Text>;
    } else {
      return <Text>Not Found</Text>;
    }
  }
  return (
    <View style={{ backgroundColor: background, flex: 1 }}>{renderList()}</View>
  );
}

const styles = StyleSheet.create({
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: "47%",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  /******** card components **************/
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
});

// // import React from "react";
// // import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
// // import { Colors } from "../../components/styles";
// // // colors
// // const {
// //   primary,
// //   secondary,
// //   tertiary,
// //   darklight,
// //   brand,
// //   brandSecondary,
// //   green,
// //   red,
// //   background,
// // } = Colors;

// // const LibraryBooks = (props) => {
// //   // console.log("BOOOOKS", props.route.params.AsterBooks);
// //   const AsterBooks = props.route.params;
// //   const data = props.route.params.AsterBooks;

// //   const renderItem = ({ item }) => {
// //     console.log("Images", item.BooksSetupImgUrl);
// //     return (
// //       <TouchableOpacity style={styles.video} onPress={() => {}}>
// //         <Image
// //           style={styles.thumbnail}
// //           source={{
// //             uri:
// //               `http://194.233.80.159:75` +
// //               (item.BooksSetupImgUrl
// //                 ? item.BooksSetupImgUrl.slice(5)
// //                 : "/Files/BooksImages/noimage.jpeg"),
// //           }}
// //         />
// //         <View style={styles.details}>
// //           <Text style={styles.title}>{item.BooksSetupName}</Text>
// //           <Text style={styles.channel}>
// //             Language: {item.BooksSetupLanguage}
// //           </Text>
// //           <View style={styles.viewCount}>
// //             <Text style={styles.views}>In Stock: {item.Qty}</Text>
// //             <Text style={styles.duration}>
// //               Category: {item.BooksCategoryName}
// //             </Text>
// //           </View>
// //         </View>
// //       </TouchableOpacity>
// //     );
// //   };

// //   return (
// //     <FlatList
// //       style={styles.container}
// //       data={data}
// //       renderItem={renderItem}
// //       keyExtractor={(item) => item.id}
// //     />
// //   );
// // };

// // const styles = {
// //   container: {
// //     backgroundColor: background,
// //     padding: 10,
// //     flex: 1,
// //   },
// //   video: {
// //     flexDirection: "row",
// //     marginBottom: 20,
// //   },
// //   thumbnail: {
// //     width: "35%",
// //     aspectRatio: 8 / 9,
// //     borderRadius: 5,
// //   },
// //   details: {
// //     padding: 10,
// //     width: "65%",
// //   },
// //   title: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   channel: {
// //     color: "#999",
// //     fontSize: 14,
// //     marginTop: 5,
// //   },
// //   viewCount: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginTop: 5,
// //   },

// //   views: {
// //     color: "#999",
// //     fontSize: 14,
// //   },
// //   duration: {
// //     color: "#999",
// //     fontSize: 14,
// //     marginLeft: 10,
// //   },
// // };

// // export default LibraryBooks;

// import React from "react";
// import { View, Text, Image, StyleSheet, FlatList } from "react-native";
// import { Colors } from "../../components/styles";
// // colors
// const {
//   primary,
//   secondary,
//   tertiary,
//   darklight,
//   brand,
//   brandSecondary,
//   green,
//   red,
//   background,
// } = Colors;

// const PostList = (props) => {
//   const data = props.route.params.AsterBooks;

//   const renderItem = ({ item, index }) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Image
//           source={{
//             uri:
//               `http://194.233.80.159:75` +
//               (item.BooksSetupImgUrl
//                 ? item.BooksSetupImgUrl.slice(5)
//                 : "/Files/BooksImages/noimage.jpeg"),
//           }}
//           style={styles.image}
//         />
//         <View style={styles.textContainer}>
//           <Text numberOfLines={1} style={styles.title}>
//             {item.BooksSetupName}
//           </Text>
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={styles.subtitle}>{item.BooksSetupLanguage}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <FlatList
//       data={data}
//       contentContainerStyle={styles.container}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       numColumns={3}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: background,
//   },
//   itemContainer: {
//     flex: 1,
//     padding: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     resizeMode: "contain",
//     borderRadius: 8,
//   },
//   textContainer: {
//     padding: 0,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "grey",
//   },
// });

// export default PostList;
