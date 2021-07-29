class GetResults {

  late dynamic id;
  late String email;
  late int userId;
  late String firstName;
  late String lastName;
  late String fullName;
  late String login;
  late int TotalRuns;
  late double TotalDistance;
  late int TotalTime;

  GetResults(this.id, this.email, this.userId, this.firstName, this.lastName, this.fullName, this.login, this.TotalRuns, this.TotalDistance, this.TotalTime);


  factory GetResults.fromJson(dynamic json) {
    return GetResults(
      json['_id'] as String,
      json['Email'] as String,
      json['UserId'] as int,
      json['FirstName'] as String,
      json['LastName'] as String,
      json['FullName'] as String,
      json['Login'] as String,
      json['TotalRuns'] as int,
      json['TotalDistance'] as double,
      json['TotalTime'] as int,

    );

  }


  @override
  String toString() {
    return '{ ${this.id},'
        ' ${this.email},'
        ' ${this.userId},'
        ' ${this.firstName},'
        ' ${this.lastName},'
        ' ${this.fullName},'
        ' ${this.login},'
        ' ${this.TotalRuns},'
        ' ${this.TotalDistance},'
        ' ${this.TotalTime} }';
  }


}
