import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contact from 'react-native-contacts';

const Contacts = () => {
  const [data, setData] = useState();
  // const contactData = () => {};

  const getPermissions = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contact.getAll()
          .then(contactdata => {
            // contactdata.map
            // work with contacts
            console.log(contactdata);
            setData(contactdata);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const renderContacts = ({item}) => {
    // console.log('yuiuyuioiuiuiuio');
    // console.log(item.phoneNumbers);
    // console.log(item);
    const firstName = item.givenName;
    const fl = firstName.charAt(0).toUpperCase();
    // console.log(fl);
    const lastName = item.familyName;
    const ll = lastName.charAt(0).toUpperCase();

    // console.log(ll);

    let colors = ['#B9E9FC', '#AAE3E2', '#B3E5BE', '#ABCDEF'];
    let index = item.recordID;

    return (
      <View style={styles.mainView}>
        {/* <Text>{console.log('------------------------>', item)}</Text> */}
        <View style={styles.mainView2}>
          <View style={[styles.profile]}>
            {item.hasThumbnail ? (
              <Image
                style={[styles.contactimg, {flex: 1}]}
                source={{uri: item.thumbnailPath}}
              />
            ) : (
              <View
                style={[
                  styles.noimgtxt,
                  {backgroundColor: colors[index % colors.length]},
                ]}>
                <Text style={styles.profiletext}>{fl}</Text>
                <Text style={styles.profiletext}>{ll}</Text>
              </View>
            )}
          </View>
          <View style={styles.contactinfo}>
            <Text style={styles.contactinfotext}>{item.displayName}</Text>
            <Text style={styles.contactinfotext}>
              {item.phoneNumbers[0].number}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View>{/* <Text> App</Text> */}</View>
      <FlatList data={data} renderItem={renderContacts} />
    </>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    marginTop: 15,
    borderBottomColor: 'rgb(10,0,10)',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    elevation: 5,
    marginBottom: 2,
  },
  mainView2: {
    flexDirection: 'row',
    // borderRadius: 20,
  },
  outerpic: {
    height: 50,
    width: 50,
    borderRadius: 18,
    borderWidth: 1,
  },
  profile: {
    // flex: 1,
    width: 40,
    height: 40,
    margin: 10,
    // borderWidth: 5,
    // padding: 10,
    // borderRadius: 20,  //don't work??
  },
  contactinfo: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9DDCEC',
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,

    // borderWidth: 2,
  },
  contactinfotext: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactimg: {
    // width: 40,
    // height: 40,
    // margin: 10,
    // padding: 10,
    borderRadius: 10,
  },
  noimgtxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
  },
  profiletext: {
    fontSize: 20,
    fontWeight: '700',
  },
});
