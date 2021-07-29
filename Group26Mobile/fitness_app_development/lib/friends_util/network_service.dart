import 'dart:convert';

import 'package:fitness_app_development/friends_util/search_friend_response.dart';

import 'package:http/http.dart';

class NetworkService{


  postApiRequest(url, queryParameters) async {
    var urld = Uri.parse(url);

    print("url : $url");

    final response = await post(urld,body: jsonEncode(queryParameters),
        headers: {"Content-Type": "application/json", "accept" : "application/json",}
    );
    try {
      print("response : ${response.body}");
      if(response.statusCode ==200){

        return SearchFriendResponse.fromJson(json.decode(response.body));
      }else{
        throw Exception('Failed to search Repos with status code ' +
            response.statusCode.toString());
      }

    } on Exception catch (e) {
      throw Exception('Failed to search $e ' +
          response.statusCode.toString());
//      decodedResponse = ApiHelperClass.exception(e);
//      return decodedResponse;
    }
  }

  addApiRequest(url, queryParameters) async {
    var urld = Uri.parse(url);

    final response = await post(urld,body: jsonEncode(queryParameters),
        headers: {"Content-Type": "application/json", "accept" : "application/json",}
    );
    try {
      print("response : ${response.body}");
      if(response.statusCode ==200){

        return true;
      }else{
        return false;
      }

    } on Exception catch (e) {
      return false;
    }
  }

}