class GetResults2 {

  late String id;
  late String runName;
  late int userId;
  late int runId;
  late String dateCreated;
  late int time;
  late dynamic distance;
  late dynamic pace;
  late List<dynamic> coordinates;

  GetResults2(this.id, this.runName, this.userId, this.runId, this.dateCreated, this.time, this.distance, this.pace, this.coordinates);


  factory GetResults2.fromJson(dynamic json) {
    return GetResults2(
      json['_id'] as String,
      json['Run'] as String,
      json['UserId'] as int,
      json['RunId'] as int,
      json['DateCreated'] as String,
      json['Time'] as int,
      json['Distance'],
      json['Pace'],
      json['Coordinates'] as List<dynamic>,

    );

  }


  @override
  String toString() {
    return '{ ${this.id},'
        ' ${this.id},'
        ' ${this.userId},'
        ' ${this.userId},'
        ' ${this.runId},'
        ' ${this.dateCreated},'
        ' ${this.time},'
        ' ${this.distance},'
        ' ${this.pace},'
        ' ${this.coordinates} }';
  }


}
