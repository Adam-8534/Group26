import 'dart:convert';
import 'dart:io';

import 'package:fitness_app_development/pages/friends.dart';
import 'package:fitness_app_development/pages/get_run_name.dart';
import 'package:fitness_app_development/pages/old_run2.dart';
import 'package:fitness_app_development/pages/settings.dart';
import 'package:fitness_app_development/pages/user_profile.dart';
import 'package:fitness_app_development/pages/users_page.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:fitness_app_development/utilities/get_lb_data.dart';
import 'package:fitness_app_development/utilities/global_data.dart';
import 'package:fitness_app_development/utilities/personal_run_data.dart';
import 'package:fitness_app_development/utilities/pref_service.dart';
import 'package:fitness_app_development/utilities/results.dart';
import 'package:fitness_app_development/utilities/results_runs.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gravatar/flutter_gravatar.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String userName = '';
  String _displayTime = '0';
  String newUserName = '';
  int totalRuns = 0, newRun = 0;
  double totalDistance = 0, newDistance = 0;
  int totalTIme = 0, newTime = 0;
  List<GetResults2> resultObjs = [];
  XFile? fileImg;
  String? _email;
  Gravatar? _gravatar;
  String email = '';

  @override
  void initState() {
    changeText();
    changeTotalRuns();
    changeTotalDistance();
    changeTotalTime();
    changeTime();

    email = GlobalData.email!;
    if(isEmail(email) == false){
      _email = "example@gmail.com";
    }else if(email == null){
      _email = "example@gmail.com";
    }else{
      _email = email; }
    _gravatar = Gravatar(_email);



    super.initState();
  }
  bool isEmail(String em) {

    String p = r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = new RegExp(p);

    return regExp.hasMatch(em);


  }

  void changeTime(){

    var milli = totalTIme;
    var min = ((milli) / 60000).floor();
    var sec = ((milli % 60000) / 1000).toStringAsFixed(2);
    var st = '';
    if ((milli % 60000) / 1000 < 10) {
      st = '0';
    } else st = '';
    GlobalData.formattedTime = '${min}:${st}${sec}';
    setState(() {
      _displayTime = '${min}:${st}${sec}';
    });

  }





  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  stops: [0.5, 1],
                  colors: [Colors.cyan, Colors.blueAccent.shade700])
          ),
          child: Column(
            children: [
              Container(

                margin: EdgeInsets.only(
                  left: 5,
                  top: 20,
                  right: 5,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    topProfile(),
                    SizedBox(height: 20),
                    topActivity(),
                    SizedBox(height: 20),
                    Center(
                      child: Text(
                        "Leader Board",
                        style: TextStyle(fontSize: 20),
                      ),
                    ),
                    Divider(color: Colors.teal, thickness: 1.5),
                    leaderBoard(),
                    Divider(color: Colors.teal, thickness: 1.5),
                    SizedBox(height: 15),
                    userList(),

                  ],
                ),
              ),
              Expanded(
                child: Align(
                  alignment:  FractionalOffset.bottomCenter,
                  child: SizedBox(
                    height: (MediaQuery.of(context).size.height) * .077,
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.blue[200],
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          IconButton(
                            onPressed: () async {
                              await Leaderboard.getLeaderboardData();
                              await Leaderboard.getRunData();
                              await Leaderboard.getTotalData();
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => HomeScreen()));
                            },
                            icon: Icon(Icons.home),
                            iconSize: (MediaQuery.of(context).size.height) * .06,
                          ),
                          IconButton(
                            onPressed: () {
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => UsersScreen()));
                            },
                            icon: Icon(Icons.search),
                            iconSize: (MediaQuery.of(context).size.height) * .06,

                          ),
                          FloatingActionButton(
                            onPressed: () {
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => GetRunName()));
                            },
                            child: Icon(Icons.add),
                            backgroundColor: Colors.green,
                            elevation: 10,
                          ),
                          IconButton(
                            onPressed: () {
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => FriendsScreen()));
                            },
                            icon: Icon(Icons.contact_page_rounded),
                            iconSize: (MediaQuery.of(context).size.height) * .06,

                          ),
                          IconButton(
                            onPressed: () {
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => User()));
                            },
                            icon: Icon(Icons.portrait_rounded),
                            iconSize: (MediaQuery.of(context).size.height) * .06,

                          ),

                        ],
                      ),
                    ),


                  ),
                ),
              ),
            ],
          ),
        ),

      ),
    );
  }

  Widget topProfile() {
    return Row(
      children: [
        /*Icon(
          Icons.account_circle,
          size: 55,
        ),*/

        if (_gravatar != null)
          IconButton(
              icon: CircleAvatar( // can add link to users profile pictures for this
                backgroundImage: NetworkImage(_gravatar!.imageUrl()),
                radius: 40,
              ),
              iconSize: 55,
              onPressed: () {
                Get.off(() => User());

              }


          ),
        /*IconButton(
            icon: CircleAvatar( // can add link to users profile pictures for this
              backgroundImage: getImage(),
              radius: 40,
            ),
            iconSize: 55,
            onPressed: () {
              Get.off(() => User());

            }
        ),*/
        SizedBox(width: 5),
        Text(
          "${GlobalData.fullName}",
          style: TextStyle(
            color: Colors.black,
            fontSize: 25,
            fontWeight: FontWeight.w500,
          ),
        ),


      ],
    );
  }

  Widget topActivity() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Container(
          margin: EdgeInsets.only(right: 7, bottom: 5),
          padding: EdgeInsets.symmetric(vertical: 9, horizontal: 10),
          decoration: BoxDecoration(
              color: Colors.blue.shade700,
              boxShadow: [
                BoxShadow(
                  color: Colors.teal.withOpacity(0.2),
                  offset: Offset(2, 2),
                  blurRadius: 2,
                )
              ],
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Colors.teal)),
          child: Column(
            children: [
              Text(
                "Total Runs",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                "${totalRuns}",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
        Container(
          margin: EdgeInsets.only(right: 7, bottom: 5),
          padding: EdgeInsets.symmetric(vertical: 9, horizontal: 10),
          decoration: BoxDecoration(
              color: Colors.blue.shade700,
              boxShadow: [
                BoxShadow(
                  color: Colors.teal.withOpacity(0.2),
                  offset: Offset(2, 2),
                  blurRadius: 2,
                )
              ],
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Colors.teal)),
          child: Column(
            children: [
              Text(
                "Total Distance",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                '${totalDistance.toStringAsFixed(2)} Mi',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
        Container(
          margin: EdgeInsets.only(right: 7, bottom: 5),
          padding: EdgeInsets.symmetric(vertical: 9, horizontal: 10),
          decoration: BoxDecoration(
              color: Colors.blue.shade700,
              boxShadow: [
                BoxShadow(
                  color: Colors.teal.withOpacity(0.2),
                  offset: Offset(2, 2),
                  blurRadius: 2,
                )
              ],
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Colors.teal)),
          child: Column(
            children: [
              Text(
                "Total Time",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                "$_displayTime",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget leaderBoard() {
    return Container(
      height: 40,
      child: ListView.builder(
        itemCount: GlobalData.resultObjsBoo.length,
        shrinkWrap: true,
        scrollDirection: Axis.horizontal,
        itemBuilder: (BuildContext context, int index) {
          if(GlobalData.resultObjsBoo[GlobalData.orginalIndex[index]].TotalDistance > .01 || GlobalData.resultObjsBoo[GlobalData.orginalIndex[index]].userId == GlobalData.userId){
            return Container(
              margin: EdgeInsets.symmetric(horizontal: 10, vertical: 3),
              padding: EdgeInsets.symmetric(vertical: 3, horizontal: 5),
              decoration: BoxDecoration(
                color: Colors.teal,
                borderRadius: BorderRadius.circular(5),
              ),
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('${index+ 1}.',style: const TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),),
                    SizedBox(width: 10),
                    Text('${GlobalData.resultObjsBoo[GlobalData.orginalIndex[index]].fullName}',style: const TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),),
                    SizedBox(width: 10),
                    Text(GlobalData.resultObjsBoo[GlobalData.orginalIndex[index]].TotalDistance.toStringAsFixed(2) + ' Mi',style: const TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),),
                  ]
              ),
            );
          }else{
            return Text('');
          }
        },
      ),
    );
  }

  Widget userList() {
    return Container(
      height: Get.height * .51,
      child: ListView.builder(
        shrinkWrap: true,
        itemCount: GlobalData.resultObjs.length,
        itemBuilder: (BuildContext context, int index) {
          return InkWell(
            onTap: (){
              RunData.index = index;
              print(index);
              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => OldRun2()));
            },
            child: Container(
              margin: EdgeInsets.symmetric(vertical: 10,horizontal: 10),
              padding: EdgeInsets.symmetric(vertical: 3),
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.teal)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: EdgeInsets.only(left: 10),
                    width: Get.width * 0.39,
                    child: Text(
                      GlobalData.resultObjs[index].runName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: Colors.teal,
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  Container(
                    width: Get.width * 0.4,
                    child: Text(
                      GlobalData.resultObjs[index].dateCreated,
                      maxLines: 1,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                  Spacer(),
                  Icon(Icons.chevron_right_outlined, size: 30)
                ],
              ),
            ),
          );
        },
      ),
    );
  }
  void changeText() {
    setState(() {
      userName = GlobalData.userName!;
    });
  }

  void changeTotalRuns() {
    setState(() {
      totalRuns = GlobalData.totalRuns!;
    });
  }
  void changeTotalDistance() {
    setState(() {
      totalDistance = GlobalData.totalDistance!;
    });
  }
  void changeTotalTime() {
    setState(() {
      totalTIme = GlobalData.totalTime!;
    });
  }




}
