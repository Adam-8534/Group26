


//SearchFriendResponse searchFriendResponseFromJson(String str) => SearchFriendResponse.fromJson(json.decode(str));
//
//String searchFriendResponseToJson(SearchFriendResponse data) => json.encode(data.toJson());

class SearchFriendResponse {
  SearchFriendResponse({
    required this.results,
    required this.error,
  });

  List<Result> results;
  String error;

  factory SearchFriendResponse.fromJson(Map<String, dynamic> json) => SearchFriendResponse(
    results: List<Result>.from(json["results"].map((x) => Result.fromJson(x))),
    error: json["error"],
  );

  Map<String, dynamic> toJson() => {
    "results": List<dynamic>.from(results.map((x) => x.toJson())),
    "error": error,
  };
}

class Result {
  Result({
    required this.id,
    required this.email,
    required this.userId,
    required this.login,
    required this.firstName,
    required this.lastName,
    required this.fullName,
    required this.totalRuns,
    required this.totalTime,
    required this.totalDistance,
  });

  String id;
  String email;
  String login;
  num userId;
  String firstName;
  String lastName;
  String fullName;
  num totalRuns;
  num totalTime;
  num totalDistance;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
      id: json["_id"],
      email: json["Email"],
      userId: json["UserId"],
      login: json["Login"],
      firstName: json["FirstName"],
      lastName: json["LastName"],
      fullName: json["FullName"],
      totalRuns:json['TotalRuns'],
      totalDistance : json['TotalDistance'],
      totalTime : json['TotalTime'],
  );

  Map<String, dynamic> toJson() => {
    "_id": id,
    "Email": email,
    "UserId": userId,
    "Login" : login,
    "FirstName": firstName,
    "LastName": lastName,
    "FullName": fullName,
    'TotalRuns' : totalRuns,
    'TotalDistance' : totalDistance,
    'TotalTime' : totalTime,
  };
}
