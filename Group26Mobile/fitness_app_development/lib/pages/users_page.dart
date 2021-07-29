import 'dart:async';

import 'package:fitness_app_development/friends_util/friends_provider.dart';
import 'package:fitness_app_development/friends_util/screen_progress_loader.dart';
import 'package:fitness_app_development/friends_util/searchBar.dart';
import 'package:fitness_app_development/friends_util/search_friend_response.dart';
import 'package:fitness_app_development/pages/home_page/home_screen.dart';
import 'package:fitness_app_development/pages/profile_page.dart';
import 'package:fitness_app_development/utilities/get_lb_data.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'home_page2.dart';

class UsersScreen extends StatefulWidget {
  const UsersScreen({Key? key}) : super(key: key);

  @override
  _UsersScreenState createState() => _UsersScreenState();
}

class _UsersScreenState extends State<UsersScreen> {
  Timer? timeHandle;
  Future<List<Result>>? list;
  var viewModel = MainViewModel();
  bool _isLoading = false;

  void textChanged(String val) {
    if (timeHandle != null) {
      timeHandle?.cancel();
    }
    timeHandle = Timer(Duration(milliseconds: 10000), () {
      print("Calling now the API: $val");
      viewModel.searchUsers(val);
    });
  }

  @override
  void initState() {
    //final mainViewModel = Provider.of<MainViewModel>(co, listen: false);
    viewModel.searchUsers('');
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Scaffold(
          appBar: AppBar(
            title: Text('Search'),
            backgroundColor: Color(0xFF4294A2),
            leading: new IconButton(
              onPressed: () async {
                await Leaderboard.getTotalData();
                await Leaderboard.getRunData();
                await Leaderboard.getLeaderboardData();
                Navigator.of(context).popUntil((route) => route.isFirst);
                Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => HomeScreen()));
              },
              icon: new Icon(Icons.arrow_back, color: Colors.black),
            ),
          ),
          body: ChangeNotifierProvider(
            create: (_) => viewModel,
            child: Container(
                height: double.infinity,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white,
                  /*gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    stops: [0.5, 1],
                    colors: [Colors.cyan, Colors.blueAccent.shade700],
                  ),*/
                ),
                child: Column(
                  children: [
                    SizedBox(
                      height: 20,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 18.0, right: 18),
                      child: SearchBar(
                        hintText: "Search users",
                        onChangeTextForSearch: (String val) {
                          print("value : $val");
                          if (val.isEmpty) {
                            viewModel.searchUsers('');
                          }
//                        if(val.length>0){
//                          textChanged(val);
//                        }else{
//                          print("is empty");
//                          viewModel.searchFriendApi('');
//
//                        }
                        },
                        onTextReadyForSearch: (String value) {
                          viewModel.searchUsers(value);
                        },
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Consumer<MainViewModel>(
                      builder: (_, viewModel, __) => FutureBuilder<
                              List<Result>>(
                          future: viewModel.userslist,
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.done) {
                              if (snapshot.hasError) {
                                return Text("${snapshot.error}",
                                    style: TextStyle(color: Colors.red));
                              } else if (snapshot.hasData) {
                                print(
                                    "data length L ${snapshot.data!.length}");
                                return Expanded(
                                  child: ListView.builder(
                                      shrinkWrap: true,
                                      physics: AlwaysScrollableScrollPhysics(),
                                      itemCount: snapshot.data!.length,
                                      itemBuilder:
                                          (BuildContext bc, int index) {
                                        num userID =
                                            snapshot.data![index].userId;
                                        var userName =
                                            snapshot.data![index].login;
                                        var userEmail =
                                            snapshot.data![index].email;
                                        var fullName =
                                            snapshot.data![index].fullName;
                                        var totalRun =
                                            snapshot.data![index].totalRuns;
                                        var totalTime =
                                            snapshot.data![index].totalTime;
                                        var totalDistance =
                                            snapshot.data![index].totalDistance;

                                        return Container(
                                          width: double.infinity,
                                          height: 50,
                                          child: Padding(
                                            padding: const EdgeInsets.only(
                                                left: 18.0,
                                                right: 18.0,
                                                bottom: 10),
                                            child: Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.center,
                                              children: [
                                                Expanded(
                                                  child: Container(
                                                    height: 50,
                                                    margin: EdgeInsets.only(
                                                        right: 20),
                                                    decoration: BoxDecoration(
                                                      color: Color(0xFF4395A1),
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              50),
                                                    ),
                                                    child: Center(
                                                      child: Text(
                                                        '$fullName',
                                                        style: TextStyle(
                                                            color: Colors.white,
                                                            fontSize: 14),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                InkWell(
                                                  onTap: () {
                                                    setState(() {
                                                      _isLoading = true;
                                                    });
                                                    viewModel
                                                        .addFriend(userID)
                                                        .then((value) {
                                                      if (value) {
                                                        // snapshot.data!.removeAt(index);
                                                        print(
                                                            "SuccessFully added");
                                                      } else {
                                                        print(
                                                            "something went wrong");
                                                      }
                                                      setState(() {
                                                        _isLoading = false;
                                                      });
                                                    });

                                                    Navigator.pushReplacement(
                                                        context,
                                                        MaterialPageRoute(
                                                            builder: (context) =>
                                                                UsersScreen()));
                                                  },
                                                  child: Container(
                                                    padding:
                                                        EdgeInsets.symmetric(
                                                            horizontal: 15,
                                                            vertical: 10),
                                                    decoration: BoxDecoration(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              50),
                                                      border: Border.all(
                                                        width: 2,
                                                        color:
                                                            Color(0xFF4395A1),
                                                      ),
                                                    ),
                                                    child: Text("Add",style: TextStyle(color: Color(0xFF4395A1),fontWeight: FontWeight.bold)),
                                                  ),
                                                ),
                                                SizedBox(
                                                  width: 10,
                                                ),
                                                InkWell(
                                                  onTap: () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(
                                                            builder: (context) =>
                                                                ProfilePage(
                                                                    userName:
                                                                        userName,
                                                                    userEmail:
                                                                        userEmail,
                                                                    fullName:
                                                                        fullName,
                                                                    totalRun:
                                                                        totalRun,
                                                                    totalDistance:
                                                                        totalDistance,
                                                                    totalTime:
                                                                        totalTime,
                                                                )));
                                                  },
                                                  child: Container(
                                                    padding: EdgeInsets.symmetric(horizontal: 15,vertical: 10),
                                                    decoration: BoxDecoration(
                                                      borderRadius: BorderRadius.circular(50),
                                                      border: Border.all(
                                                        width: 2,
                                                        color: Color(0xFF4395A1),
                                                      ),
                                                    ),
                                                    child: Text("Profile",style: TextStyle(color: Color(0xFF4395A1),fontWeight: FontWeight.bold),),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        );
                                      }),
                                );
                              } else {
                                return Text(
                                  "No results",
                                  style: TextStyle(color: Colors.red),
                                );
                              }
                            } else if (snapshot.connectionState ==
                                ConnectionState.none) {
                              return Container();
                            } else {
                              return Center(
                                  child: CircularProgressIndicator(
                                backgroundColor: Colors.red,
                              ));
                            }
                          }),
                    ),
                  ],
                )),
          ),
        ),
        _isLoading ? ScreenProgressLoader() : SizedBox(),
      ],
    );
  }
}
