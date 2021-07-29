import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'ApiExceptionClass.dart';

enum HttpApiStatus { none, loading, loaded, error }

class ApiHelperClass {
  static var dynamicExceptions;
  static var errorMessage;
  static JsonCodec codec = new JsonCodec();

  static returnResponse(http.Response response) {
    switch (response.statusCode) {
      case 200:
        var responseJson = json.decode(response.body.toString());
        return responseJson;
      case 400:
        errorMessage = BadRequestException(response.body.toString());
        dynamicExceptions = {"error": "true", "message": "$errorMessage"};
        var responseJson = json.decode(json.encode(dynamicExceptions));
        return responseJson;
      case 401:
      case 403:
        errorMessage = UnauthorisedException(response.body.toString());
        dynamicExceptions = {"error": "true", "message": "$errorMessage"};
        var responseJson = json.decode(json.encode(dynamicExceptions));
        return responseJson;
      case 500:
      default:
        errorMessage = FetchDataException(
            'Error occured while Communication with Server with StatusCode : ${response.statusCode}');
        dynamicExceptions = {"error": "true", "message": "$errorMessage"};
        var responseJson = json.decode(json.encode(dynamicExceptions));
        return responseJson;
    }
  }

  static exception(e) {
    if (e.toString().contains("SocketException"))
      dynamicExceptions = {
        "error": "true",
        "message": "Internet Not Connected"
      };
    else
      dynamicExceptions = {"error": "true", "message": "$e"};
    var responseJson = json.decode(json.encode(dynamicExceptions));

    return responseJson;
  }

  static apiResponse(status, mainUI) {
    print(status);
    switch (status) {
      case HttpApiStatus.loading:
        return Container();
        break;
      case HttpApiStatus.loaded:
        return mainUI;
        break;
      case HttpApiStatus.error:
        return Container();
        break;
    }
  }
}
