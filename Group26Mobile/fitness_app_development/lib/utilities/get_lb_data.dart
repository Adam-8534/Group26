import 'dart:convert';

import 'package:fitness_app_development/utilities/results.dart';
import 'package:fitness_app_development/utilities/results_runs.dart';

import 'get_api.dart';
import 'global_data.dart';

class Leaderboard{

  static Future<void> getLeaderboardData() async {
    var ret = await GetAPI.searchFriends();
    GlobalData.distance = [];
    Map<int,double> userDistance = new Map();


    var resultObjsJson = jsonDecode(ret.body)['results'] as List;
    List<GetResults> resultObjs = resultObjsJson.map((resultJson) => GetResults.fromJson(resultJson)).toList();
    GlobalData.resultObjsBoo = List.from(resultObjs);
    try{
      for(int i =0; i<resultObjs.length;i++){
        GlobalData.distance.add(resultObjs[i].TotalDistance);
      }
      int i = 0;
      Map<int, double> map = Map.fromIterable(
          GlobalData.distance,
          key: (k) => resultObjs[i++].userId,
          value: (v) => v
      );

      var sortedEntries = map.entries.toList()..sort((e1, e2) {
        var diff = e2.value.compareTo(e1.value);
        if (diff == 0) diff = e2.key.compareTo(e1.key);
        return diff;
      });
      //print(map);


      GlobalData.userIdInOrder = [];
      GlobalData.orginalIndex = [];
      print(sortedEntries);
      for(int j=0; j<sortedEntries.length;j++){
        GlobalData.userIdInOrder.add(sortedEntries[j].key);
      }
      for(int j=0; j<GlobalData.userIdInOrder.length;j++){
        for(int i=0;i<resultObjs.length;i++){
          if(GlobalData.userIdInOrder[j] == resultObjs[i].userId){
            GlobalData.orginalIndex.add(i);
          }
        }
      }

      //print(map);
      // print('this${GlobalData.distance}');

    }catch(e){
      print(e);
    }
  }

  static Future<void> getRunData() async {
    var ret = await GetAPI.searchRun();

    var resultObjsJson = jsonDecode(ret.body)['results'] as List;
    GlobalData.resultObjs  = resultObjsJson.map((resultJson) => GetResults2.fromJson(resultJson)).toList();

    print('${GlobalData.resultObjs} this');

  }

  static Future<void> getTotalData() async {
    var ret = await GetAPI.searchUsers(search: GlobalData.firstName!);


    var resultObjsJson = jsonDecode(ret.body)['results'] as List;
    List<GetResults> resultObjs = resultObjsJson.map((resultJson) => GetResults.fromJson(resultJson)).toList();


    GlobalData.totalDistance = resultObjs[0].TotalDistance;
    GlobalData.totalRuns = resultObjs[0].TotalRuns;
    GlobalData.totalTime = resultObjs[0].TotalTime;
    GlobalData.email = resultObjs[0].email;




  }
}