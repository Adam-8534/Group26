

import 'package:fitness_app_development/friends_util/search_friend_response.dart';
import 'package:fitness_app_development/utilities/global_data.dart';
import 'package:flutter/material.dart';

import '../main.dart';
import 'constants.dart';
import 'network_service.dart';
class MainViewModel with ChangeNotifier {



  NetworkService networkService = NetworkService();
  SearchFriendResponse? searchFriendResponse;
  Future<List<Result>>? list;
  Future<List<Result>>? userslist;
  bool? isAdded;
  //SearchFriendResponse? searchFriendResponse;



  searchFriendApi(String query) async {
    var queryParameters = {
      'userId': GlobalData.userId,
      'search': '$query',
    };

    searchFriendResponse  = await networkService.postApiRequest(searchFriendCall, queryParameters);

    if(searchFriendResponse?.results!=null){
      list = Future.value(searchFriendResponse?.results);
    }else{
      list = Future.value([]);
    }
    notifyListeners();
  }


  searchUsers(String query) async {
    var jwt = await storage.read(key: "jwt");

    var queryParameters = {
      'userId': GlobalData.userId,
      'search': '$query',
      'jwtToken': jwt,
    };

    searchFriendResponse  = await networkService.postApiRequest(searchUserApiCall, queryParameters);

    if(searchFriendResponse?.results!=null){
      userslist = Future.value(searchFriendResponse?.results);
    }else{
      userslist = Future.value([]);
    }
    notifyListeners();
  }

  Future<bool> addFriend(num addFriendUserId) async {
    var jwt = await storage.read(key: "jwt");
    var queryParameters = {
      'userId': GlobalData.userId,
      'userId_toadd': addFriendUserId,
      'jwtToken':jwt,
    };

    isAdded  = await networkService.addApiRequest(addFriendsApiCall, queryParameters);

    return Future.value(isAdded);

  }


  Future<bool> removeFriend(num removeFriendsUserId) async {
    var jwt = await storage.read(key: "jwt");

    var queryParameters = {
      'userId': GlobalData.userId,
      'userId_toremove': removeFriendsUserId,
      'jwtToken': jwt
    };

    isAdded  = await networkService.addApiRequest(removeFriendsApiCall, queryParameters);

    return Future.value(isAdded);

  }
}